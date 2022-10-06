<template>
  <div class="main">
    <div class="bg">
      <div
        v-for="(section, i) of sections"
        :key="i"
        class="section"
      >
        <span class="name">
          {{ $t(section.text.locKey) }}
        </span>

        <div class="container">
          <div
            v-for="(item, itemIndex) of section.children"
            :key="itemIndex"
            class="item"
          >
            <template v-if="item.link.type == 'router'">
              <router-link
                class="link"
                :to="item.link.path"
              >
                <item
                  :text="item.text"
                  :icon="item.icon"
                />
              </router-link>
            </template>
            <template v-else-if="item.link.type == 'external'">
              <a
                class="link blank"
                :href="item.link.path"
                target="_blank"
              >
                <item
                  :text="item.text"
                  :icon="item.icon"
                />
              </a>
            </template>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Item from '../components/CatalogItem';

export default {
    name: 'Catalog',
    components: { Item },
    props: {
        sections: {
            type: Array,
            request: true,
            default: () => [],
        },
    },
};
</script>

<style scoped lang="scss">
@import "../style/vars";

$mw: 960px;

.main {
  padding: 0 12%;
    margin-top: 3%;

    .bg {
        padding: 2%;
        border: solid $border-color 1px;
        border-radius: 10px;
        background-color: #161b1d;
    }

    @media screen and (max-width: $mw) {
        padding: 0;
    }
}
.section {
    border-top: solid #2e3c42 1px;
    padding-top: 10px;

    .name {
        color: #4c7885;
        font-size: 180%;
        padding: 2%;
        text-align: left;
        font-weight: bold;
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        clear: both;
        padding-bottom: 2%;

        .item {
            display: inline-block;
            position: relative;
            width: 20%;

            @media screen and (max-width: $mw) {
                width: 100%;
            }
        }

        .link {
            display: contents;
        }
    }
}
</style>
