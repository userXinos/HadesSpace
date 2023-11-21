<template>
  <div class="container">
    <div class="bg">
      <footer class="footer">
        <p>
          {{ `${$t('DEPLOYED')}: ${dateFormat}` }}
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const date = new Date(__BUILD_TIMESTAMP__);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const dateFormat = new Intl.DateTimeFormat(undefined!, { dateStyle: 'long' } as Intl.DateTimeFormatOptions).format(date);
</script>

<style scoped lang="scss">
@import "../style/vars";

$mw: 960px;

.container {
    margin-top: 1%;

    .bg {
        padding: 1%;
        background-color: #161b1d;

        .footer p {
            text-align: center;
            font-size: 90%;
        }
    }

    @media screen and (max-width: $mw) {
        padding: 0;
    }
}
</style>
