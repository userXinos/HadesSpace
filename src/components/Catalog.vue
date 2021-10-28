<template>
  <div class="main">
    <div>
      <!-- eslint-disable vue/require-v-for-key, vue/valid-v-for -->
      <template v-for="(contName, index) of data">
        <p class="container-name">
          {{ $t(contName.text.locKey) }}
        </p>
        <div class="container">

          <template v-for="page of data[index].childrens">

            <template v-if="page.link.router">
              <router-link class="item-link" :to="page.link.router">
                <item :text="page.text" :icon="page.icon"/>
              </router-link>
            </template>
            <template v-else>
              <a class="item-link blank" :href="page.link" target="_blank">
                <item :text="page.text" :icon="page.icon"/>
              </a>
            </template>

          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CatalogItem from '../components/CatalogItem';

export default {
  name: 'Catalog',
  components: {
    Item: CatalogItem,
  },
  props: {
    data: {
      type: Array,
      request: true,
    },
  },
};
</script>

<style scoped>
.main {
  padding: 5% 10% 10%;
}
.main > div {
  background-color: #161b1d;
  box-shadow: 0 0 10px 5px #20282b;
}
.container-name {
  color: white;
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
}
.item-link {
  display: contents;
}
.item-link.blank {
    font-size: 80%;
}


@media screen and (max-width: 960px) {
  .main {
    padding: 60px 0;
  }
}
</style>
