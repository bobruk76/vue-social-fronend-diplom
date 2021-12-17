<template lang="pug">
  .not-found
    h2.not-found-title Что-то пошло не так...
</template>

<script>
export default {};
</script>

<style lang="stylus">
@import '../assets/stylus/base/vars.styl';

.not-found {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .not-found-title {
    font-size: 28px;
    font-weight: 200;
    font-family: font-exo;
  }
}
</style>
