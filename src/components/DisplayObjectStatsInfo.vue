<template>
  <div class="statsInfo" v-if="show" @click.stop.self="swith">
    <div>
      <button @click="swith"></button>
      <p>{{ header }}</p>
      <p v-html="description"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: {type: String},
    description: {type: String},
    show: {type: Boolean},
  },
  watch: {
    show: function(val) {
      document.body.style.overflow = (val) ? 'hidden' : 'auto';
    },
  },
  methods: {
    swith() {
      this.$emit('update:show', false);
    },
  },
};
</script>

<style scoped>
.statsInfo {
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  cursor: auto;
}
.statsInfo div {
  max-width: 400px;
  padding: 5px 10px 10px;
  background: #111a19;
  border: 2px solid #243532;
  color: #cfd6ad;
  font-size: 100%;
  margin: auto 30px;
}
.statsInfo p {
  padding-top: 2%;
}
.statsInfo p:nth-child(2) {
  color: #f0f5f5;
  font-size: 120%;
  padding-left: 35px;
  padding-top: 1%;
  padding-bottom: 2%;
  background-image: url(../img/icons/info.png);
  background-repeat: no-repeat;
  background-size: 25px;
  background-position-y: center;
}
.statsInfo div button {
  width: 20px;
  height: 20px;
  background-image: url(../img/icons/close.png);
  background-repeat: no-repeat;
  border: none;
  background-size: 100%;
  background-color: transparent;
  cursor: pointer;
  float: right;
}
</style>
