<!--suppress ALL -->
<template>
  <div class="container">
    <v-head><title>Nerflog</title></v-head>
    <h1 class="title"> Nerflog </h1>

    <div class="banner">
      <div class="wrap">
        <div class="message">
          <div class="icon-bg">
            <div class="icon" />
          </div>
          <div class="body">
            <p>This is unofficial Hades' Star Nebula game changelog. It's compiled from game static files, official data is published on the game's <a
              href="https://discord.gg/hadesstar"
              target="_blank"
            >discord server</a> and <a
              href="http://blog.hadesstar.com"
              target="_blank"
            >blog</a></p>
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
              v-show="patchCommits[index]?.status != 'ready'"
              class="text"
            >
              {{ loadingMessage }}<br>
            </p>

          </div>
          <div
            class="content"
          >
            <a
              target="_blank"
              :href="`${GHRepo}/commit/${patchCommits[index].hash}`"
            >Look at github</a>

            <transition-group
              v-if="patchCommits[index]?.status == 'ready'"
              tag="ol"
              class="list"
            >
              <li
                v-for="(content, filename) of patchCommits[index].files"
                :key="filename"
                class="category"
              >
                <div
                  class="head"
                  @click="content.opened = !content.opened"
                >
                  <div
                    v-if="content.status == 'modified' && content.canRender"
                    class="icon"
                    :class="{'rotate': content.opened}"
                  />
                  <div>
                    <div class="file">File: {{ filename }}</div>
                    <div class="Status">status: {{ content.status }} {{ content.canRender ? '' : '[Not rendered]' }}</div>
                  </div>
                </div>

                <div
                  v-for="(d, vkey) of content.file"
                  :key="vkey"
                >
                  <v-data
                    v-if="content.status == 'modified' && content.canRender && content.opened"
                    :data="d"
                    :sort="false"
                    :icon-dir="iconDirByFile[filename]"
                    :table-opts="getTableOpts(filename)"
                  />
                </div>

              </li>
            </transition-group>


          </div>
        </div>

      </li>
    </transition-group>

  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import { Head as VHead } from '@vueuse/head';
import patchCommits from '@Regulation/patchCommits.js';
import Data from '@/components/Data.vue';
import type { Commit } from '@/composables/gameDiffLogGHApi';
import gameDiffLogGHApi from '@/composables/gameDiffLogGHApi';
import type { ObjectKString } from '@/composables/gameDiffLogData';
import gameDiffLogData from '@/composables/gameDiffLogData';
import { tableOpts as modulesTableOpts } from '@/components/ModulePage.vue';

const ICON_DIR_BY_FILE = {
    capital_ships: 'game/Ships',
    modules: 'game/Modules',
    stars: 'game/Stars',
    spacebuildings: 'game/SpaceBuildings',
    distinctions: 'game/Distinctions',
};
const GH_REPO = 'https://github.com/userXinos/HadesSpace';
const CAN_RENDER = [
    'en',
    'achievements',
    'alliance_levels',
    'artifacts',
    // 'badge_colors',
    // 'badge_icons',
    'blue_star_sectors',
    'capital_ships',
    'cerberus_stations',
    // 'colonize_prices',
    'dark_red_star_sectors',
    'distinctions',
    'globals',
    // 'iap',
    // 'languages',
    'modules',
    // 'module_scenes',
    // 'news',
    'planets',
    'planet_levels',
    'player_default_names',
    'player_goals',
    'red_star_sectors',
    // 'regions',
    'spacebuildings',
    'stars',
    // 'static_object_names',
    // 'steam_prices',
    // 'tutorial',
    'white_star_sectors',
    // 'xp_levels',
    'yellow_star_sectors',
];

interface PatchCommit {
    hash: string,
    title: string,
    note: string
}

interface PatchCommitExpand extends PatchCommit{
    status: 'loading'|'ready'|'error',
    files: {
        [fileName: string]: {file: object, parent?: object, status: string, canRender: boolean, opened?: boolean}
    }
}

export default defineComponent({
    name: 'GameDiffLog',
    components: { VHead, VData: Data },
    provide() {
        return {
            StatsComponent: defineAsyncComponent(() => import('../components/DataHeadStatsDiff.vue')),
        };
    },
    setup() {
        const { fetchUrl, fetchParentByName, fetchCommit, fetchFile } = gameDiffLogGHApi();
        const { createDiff, addMetadata, isObject, limit } = gameDiffLogData();

        return {
            fetchUrl,
            fetchFile,
            fetchParentByName,
            fetchCommit,

            createDiff,
            addMetadata,
            isObject,
            limit,
        };
    },
    data() {
        return {
            GHRepo: GH_REPO,
            iconDirByFile: ICON_DIR_BY_FILE,
            patchCommits: patchCommits as (typeof patchCommits & PatchCommitExpand[]),
            indexOpened: -1,
            loadingMessage: '',
        };
    },
    computed: {
        modulesTableOpts,
    },
    methods: {
        setStatus(msg: string|null) {
            if (msg == null) {
                this.loadingMessage = '';
                return;
            }
            this.loadingMessage = msg;
        },
        getTableOpts(name: string) {
            const data = {
                modules: this.modulesTableOpts,
                stars: { colLvlStartAt: 0 },
            };

            return (name in data) ? data[name as keyof typeof data] : undefined;
        },
        onclickCategory(i: number) {
            if (this.indexOpened == i) {
                this.indexOpened = -1;
                return;
            }
            this.indexOpened = i;
            if (!this.patchCommits[i].status && this.patchCommits[i].status != 'loading') {
                this.patchCommits[i].status = 'loading';
                this.initPatch(this.patchCommits[i])
                    .then(() => {
                        this.patchCommits[i].status = 'ready';
                    })
                    .catch((e) => {
                        this.patchCommits[i].status = 'error';
                        this.setStatus(`Error: ${e.message}`);
                        console.error(e);
                    });
            }
        },
        async initPatch(patch: PatchCommitExpand) {
            const files: PatchCommitExpand['files'] = await this.loadFiles(patch.hash);
            patch.files = await this.diffFiles(files);
        },

        async loadFiles(hash: string): Promise<PatchCommitExpand['files']> {
            this.setStatus('getting commits...');
            const commit: Commit = await this.fetchCommit(hash);
            this.setStatus(null);
            const res: PatchCommitExpand['files'] = {};

            const loadFile = async ({ contents_url: url, filename: filepath, status }: Commit['files'][0]) => {
                const filename = filepath?.split('/')?.pop()?.split('.')?.shift() as string;
                const canRender = CAN_RENDER.includes(filename);

                if (filepath.startsWith('parser/dist/')) {
                    try {
                        this.setStatus(`download file: ${filename} (${commit.sha.slice(0, 7)})...`);
                        const file = (status == 'modified' && canRender) ? await this.fetchFile(url) : null;

                        res[filename] = { status, file: file || {}, canRender };

                        if (file) {
                            this.setStatus(`download parent file: ${filename} (${commit.sha.slice(0, 7)})...`);
                            res[filename].parent = await this.fetchParentByName(filepath, commit.sha);
                        }
                    } catch (e) {
                        res[filename] = {
                            status: `download error (${e})`,
                            file: {},
                            canRender: false,
                        };
                        console.error(e);
                    }

                    this.setStatus(null);
                }
            };

            await this.limit(commit.files.map((e) => () => loadFile(e)), 10);

            return res;
        },

        async diffFiles(files: PatchCommitExpand['files']): Promise<PatchCommitExpand['files']> {
            const res: PatchCommitExpand['files'] = {};

            const diffFile = async ([filename, { file, parent }]: [string, { file: object, parent?: object }]) => {
                res[filename] = { ...files[filename] };

                if (!parent) {
                    return;
                }

                const wrapRawFile = Object.values(file).some((e) => !this.isObject(e)) ? { [filename]: file } : file as ObjectKString;
                const wrapParent = Object.values(parent).some((e) => !this.isObject(e)) ? { [filename]: parent } : parent as ObjectKString;

                this.setStatus(`create diff: ${filename}...`);
                const diff = this.createDiff(wrapParent, wrapRawFile) || {};

                res[filename].file = this.addMetadata(diff as ObjectKString, [wrapParent, wrapRawFile], filename);
            };

            await this.limit(Object.entries(files).map((e) => () => diffFile(e)), 20);

            return res;
        },
    },
});
</script>

<style lang="scss" scoped>
@import "../style/vars";
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
            height: 41px;
            flex-shrink: 0;
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

            @media screen and (max-width: $mv) {
                font-size: 70%;
            }
        }
    }

    .content {
        .category {
            font-size: 100%;

            .head {
                margin-left: 4%;
                font-size: 120%;
            }
        }

        a {
            text-align: left;
            margin: 0 2%;
        }
        .file {
            margin-top: 20px;
        }
        .status {
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
