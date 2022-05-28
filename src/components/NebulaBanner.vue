<template>
  <div class="wrap">
    <div class="message">
      <div class="icon-bg">
        <div class="icon" />
      </div>
      <div class="body">
        <p v-if="isNebula">
          This version serves data for <a
            :href="links[0]"
            target="_blank"
          >Hades' Star: DARK NEBULA</a>,
          data for Hades' Star is located at this address: <a :href="links[2]">HadesSpace/</a>
        </p>
        <p v-else>
          This version serves data for <a
            :href="links[0]"
            target="_blank"
          >Hades' Star</a>,
          data for Hades' Star: DARK NEBULA is located at this address: <a :href="links[3]">HadesSpace/Nebula/</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NebulaBanner',
    data() {
        return {
            isNebula: !!process.env.VUE_APP_NEBULA_BUILD,
            links: [
                'https://play.google.com/store/apps/details?id=com.ParallelSpace.Cerberus2',
                'https://play.google.com/store/apps/details?id=com.ParallelSpace.Cerberus',
                'https://userxinos.github.io/HadesSpace/',
                'https://userxinos.github.io/HadesSpace/Nebula/',
            ],
        };
    },
};
</script>

<style scoped lang="scss">

.wrap {
    padding: 0 12%;

    @media screen and (max-width: 960px) {
        padding: 0 2%;
    }
}

.message {
    display: flex;
    margin: 20px auto 0;
    background-color: #F39C12;
    color: #fff;
    width: 100%;

    .icon-bg {
        width: 8%;
        text-align: center;
        background-color: rgba(black, 0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;

       .icon {
           background: url("../img/icons/info.png") no-repeat;
           background-size: 100%;
           width: 40px;
           height: 40px;

       }
    }
    .body p {
        padding: 20px;
        color: #2a2a2a;
        font-weight: bold;
    }
}
</style>
