<template lang="pug">
  .expanded-main
    .answers-block__quantity
      p.answers-block__quantity-text Количество ответов ({{ answersLength }})
      a.answers-block__quantity-more(v-if="answersLength>1" href="#" @click.prevent="showComments")
        template(v-if="isShow") свернуть
        template(v-else) показать все
    comments(
      v-for="(sub_comment,index) in comments" :key="index"
      :info="sub_comment"
      :hasAnswering="false"
      :isShow="isShow || index===0"
    )
</template>

<script>
import Comments from '@/components/Comments/Main.vue'

export default {
  name: "Expanded",
  components: {Comments},
  props: {
    comments: Object,
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    showComments() {
      this.isShow = !this.isShow
    },
  },
  computed: {
    answersLength() {
      return this.comments.length;
    }
  }
}
</script>


<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';
.expanded-main {
  background: #FFFFFF;
  box-shadow: standart-boxshadow;
  padding: 30px 40px 10px 30px;
  position: relative;
}
.answers-block__quantity {
  display: flex;
  align-items: flex-end;
  font-family: font-exo;
  font-weight: bold;
  font-size: 14px;
  color: #000;
  padding-bottom: 20px;
  .answers-block__quantity-text {
    padding-right: 10px;
  }
  .answers-block__quantity-more {
    font-size: 13px;
    font-weight: normal;
    color: eucalypt;
  }
}
</style>
