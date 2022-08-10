<template>
  <div class="container">
    <Head><title>Nerflog</title></Head>
    <h1 class="title"> Nerflog </h1>

    <div class="banner">
      <div class="wrap">
        <div class="message">
          <div class="icon-bg">
            <div class="icon" />
          </div>
          <div class="body">
            <p>Work in progress. Only Modules file partially supported</p>
          </div>
        </div>
      </div>
    </div>

    <transition-group
      tag="ol"
      class="list"
    >
      <li
        v-for="({title, note}, index) of patchCommits"
        :key="title"
        class="category"
      >
        <div
          class="head"
          @click="onclickCategory(index)"
        >
          <div
            class="icon"
            :class="{'rotate': indexOpened == index}"
          />
          <div>
            <div class="title">{{ title }}</div>
            <div class="note">{{ note }}</div>
          </div>
        </div>

        <div v-if="indexOpened == index">

          <div class="loader">
            <div
              v-if="patchCommits[index]?.status == 'loading'"
              class="icon"
            />
            <p
              v-if="patchCommits[index]?.status != 'ready'"
              class="text"
            >{{ loadingMessage }}</p>

          </div>
          <div
            v-if="patchCommits[index]?.status == 'ready'"
            class="content"
          >
            <div
              v-for="(file, filename) of patchCommits[index].files"
              :key="filename"
            >
              <h2 class="file">File: {{ filename }}</h2>
              <h3 class="status">status: {{ file.status }}</h3>

              <div v-for="d of file.data">
                <v-data
                  v-if="file.status == 'modified'"
                  :data="d"
                  :sort="false"
                  :icon-dir="iconDirByFile[filename]"
                />
              </div>
            </div>
          </div>
        </div>

      </li>
    </transition-group>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import i18n from '@Scripts/Vue/i18n';

import { Head } from '@vueuse/head';
import patchCommits from '@Regulation/patchCommits.js';
import Data from '../components/Data.vue';
import gameDiffLogGHApi from '@/composables/gameDiffLogGHApi';
import gameDiffLogData from '@/composables/gameDiffLogData';
import type { Commit } from '@/composables/gameDiffLogGHApi';
// import type { LocaleObject } from '@/composables/gameDiffLogData';

const ICON_DIR_BY_FILE = {
    capital_ships: 'game/Ships',
    modules: 'game/Modules',
    stars: 'game/Stars',
    spacebuildings: 'game/SpaceBuildings',
    distinctions: 'game/Distinctions',
};

export const diffTools = {
    formatValue: (obj: {[k: string]: unknown}, k: string, formatter: {value: (K:string, v: unknown) => unknown}) => (
        (`_${k}` in obj) ? ` >> ${formatter.value(k, obj[`_${k}`])}` : null
    ),
};

interface patchCommitsExpand {
    status: 'loading'|'ready'|'error',
    files: {
        [fileName: string]: {data: object, parent?: object, status: string}
    }
}

export default defineComponent({
    name: 'GameDiffLog',
    components: { Head, VData: Data },
    provide() {
        return {
            additionalStatsContent: diffTools,
        };
    },
    setup() {
        const { fetchUrl, fetchParentByName, fetchCommit, fetchFile } = gameDiffLogGHApi();
        const { createDiff, createLocaleFromDiff, addMetadata, mergeDeep } = gameDiffLogData();

        return {
            fetchUrl,
            fetchFile,
            fetchParentByName,
            fetchCommit,

            mergeDeepObject: mergeDeep,
            createDiff,
            createLocaleFromDiff,
            addMetadata,
        };
    },
    data() {
        return {
            iconDirByFile: ICON_DIR_BY_FILE,
            patchCommits: patchCommits as (typeof patchCommits & patchCommitsExpand[]),
            indexOpened: -1,
            loadingMessage: '',

            // backupCurrentLocale: null as unknown as LocaleObject,
        };
    },
    beforeUnmount() {
        // if (this.backupCurrentLocale) {
        //     i18n.global.setLocaleMessage(this.$i18n.locale, this.backupCurrentLocale);
        // }
    },
    methods: {
        onclickCategory(i: number) {
            if (this.indexOpened == i) {
                this.indexOpened = -1;
                return;
            }
            this.indexOpened = i;
            if (!this.patchCommits[i].status && this.patchCommits[i].status != 'loading') {
                this.patchCommits[i].status = 'loading';
                this.loadDiff(i)
                    .then(() => {
                        this.patchCommits[i].status = 'ready';
                    })
                    .catch((e) => {
                        this.patchCommits[i].status = 'error';
                        this.loadingMessage = `Error: ${e.message}`;
                        console.error(e);
                    });
            }
        },
        async loadDiff(index: number) {
            this.loadingMessage = 'getting commits...';
            const patch = this.patchCommits[index];
            const commits = await Promise.all(patch.hashes.map(this.fetchCommit)) as Commit[];
            this.loadingMessage = '';

            for (const commit of commits) {
                for (const { contents_url: url, filename: filepath, status } of commit.files) {
                    if (filepath.startsWith('parser/dist/') && (filepath.includes('modules') || filepath.includes('loc_strings'))) {
                        if (!patch.files) {
                            patch.files = {};
                        }
                        const filename = filepath.substring(filepath.lastIndexOf('/') + 1).replace(/\.\w+$/, '');
                        const prevFile = patch.files?.[filename] || { data: null };
                        this.loadingMessage = `download file: ${filename} (${commit.sha.slice(0, 7)})...`;
                        const data = (status == 'modified') ? await this.fetchFile(url) : null;
                        this.loadingMessage = '';

                        patch.files[filename] = {
                            ...prevFile,
                            status,
                            data: data ? this.mergeDeepObject(data, prevFile.data || {}) : {},
                        };

                        if (data && !('parent' in prevFile)) {
                            this.loadingMessage = `download parent file: ${filename} (${commit.sha.slice(0, 7)})...`;
                            patch.files[filename].parent = await this.fetchParentByName(filepath, commit.sha);
                            this.loadingMessage = '';
                        }
                    }
                }
            }

            for (const filename in patch.files) {
                if (filename in patch.files && 'parent' in patch.files[filename]) {
                    this.loadingMessage = `create diff: ${filename}...`;
                    const data = this.createDiff(patch.files[filename].parent as object, patch.files[filename].data);
                    console.log(data);

                    if (data != null) {
                        if (filename == 'en') {
                            patch.files[filename].status = 'yes';
                            patch.files[filename].data = data;
                        } else {
                            patch.files[filename] = {
                                ...patch.files[filename],
                                data: this.addMetadata(data as {[k: string]: unknown}, patch.files[filename].parent as object, filename),
                            };
                        }
                    }
                    this.loadingMessage = '';
                }
            }

            // if (Object.keys(i18n.global.messages).length && patch.files.en) {
            //     const currentLocale = (i18n.global.messages as { [k:string]: LocaleObject })[this.$i18n.locale as string];
            //     const locale = this.createLocaleFromDiff(patch.files.en.data as LocaleObject, patch.files.en.parent as LocaleObject, currentLocale);
            //     this.backupCurrentLocale = this.backupCurrentLocale ? this.backupCurrentLocale : currentLocale;
            //
            //     i18n.global.setLocaleMessage(this.$i18n.locale, locale);
            //     delete patch.files.en;
            // }
        },
    },
});
</script>

<style lang="scss" scoped>
@import "../style/page";

$mv: 1000px;

.container {
    font-size: 180%;
    text-align: center;
    margin: 2% 0;
}

.category {
    list-style-type: none;
    text-align: left;
    font-size: 60%;

    .head {
        margin: 2%;
        display: flex;
        text-align: left;

        .icon {
            margin-right: 20px;
            width: 28px;
            background: url(../img/icons/arrow.svg) no-repeat right/100%;
            transition: 500ms ease;
            transform: rotate(90deg);

            @media screen and (max-width: $mv) {
                margin-left: 3%;
                background-position: right;
            }

            &.rotate {
                transform: rotate(270deg);
            }
        }

        .title {
            font-size: 130%;
        }
        .note {
            font-size: 90%;
        }
    }

    .content {
        .file, .status {
            text-align: left;
            margin: 0 2%;
        }
        .file {
            margin-top: 20px;
            font-size: 100%;
        }
        .status {
            font-size: 90%;
        }
    }
}

.loader {
    .icon {
        margin: 0 auto;
        width: 90px;
        height: 90px;
        animation: load3 3s infinite linear;
        background: url(../img/icons/spinner.png) no-repeat right/100%;

        @-webkit-keyframes load3 {
            0% {transform: rotate(0deg);}
            100% {transform: rotate(360deg);}
        }
        @keyframes load3 {
            0% {transform: rotate(0deg);}
            100% {transform: rotate(360deg);}
        }
    }
    .text {
        text-align: center;
        font-size: 130%;
    }
}

.banner {
    margin: 2%;

    .message {
        display: flex;
        margin: 20px auto 30px;
        background-color: #F39C12;
        color: #fff;
        width: 100%;

        .icon-bg {
            width: 4%;
            background-color: rgba(0, 0, 0, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;

            .icon {
                background: url("../img/icons/info.png") no-repeat;
                background-size: 100%;
                width: 30px;
                height: 30px;

            }
        }
        .body p {
            padding: 15px;
            color: #2a2a2a;
            font-weight: bold;
            font-size: 60%;
        }
    }
}

</style>
