<template lang="pug">
  .news-block(:class="{deffered, 'news-block--admin': admin}")
    add-form(v-if="isEditNews" :info="info" edit :deffered="deffered" @submit-complete="toggleEditNews")
    template(v-else)
      template(v-if="!admin")
        .edit
          .edit__icon(v-if="deleted" @click="deleteNews")
            simple-svg(:filepath="'/static/img/delete-news.svg'")
          .edit__icon(v-if="edit" @click="toggleEditNews")
            simple-svg(:filepath="'/static/img/edit.svg'")
      template(v-else)
        .edit(v-tooltip.bottom="'Разблокировать'" v-if="blocked")
          simple-svg(:filepath="'/static/img/unblocked.svg'")
        .edit(v-tooltip.bottom="'Заблокировать'" v-else)
          simple-svg(:filepath="'/static/img/blocked.svg'")
      .news-block__deffered(v-if="deffered")
        span.news-block__deffered-text Дата и время публикации: {{info.time | moment('DD.MM.YYYY, HH:mm')}} ({{diffTime(info.time)}})
      .news-block__author(v-if="!deffered")
        router-link.news-block__author-pic(:to="{name: 'ProfileId', params: {id: info.author.id}}")
          img(:src="info.author.photo" :alt="info.author.first_name")
        .news-block__author-info
          router-link.news-block__author-name(:to="{name: 'ProfileId', params: {id: info.author.id}}") {{info.author.first_name + ' ' + info.author.last_name}}
          span.news-block__author-time {{info.time | moment("from")}}
      .news-block__content
        .news-block__content-main
          h3.news-block__content-title {{info.title}}
          p.news-block__content-text(ref="text" :class="{lotText: isLotText, open: openText}" v-html="info.post_text")
          a.news-block__content-more(href="#" v-if="isLotText" @click.prevent="toggleText")
            template(v-if="openText") Скрыть
            template(v-else) Читать весь пост
        ul.news-block__content-tags
          li(v-for="(tag,index) in info.tags" :key="index")
            a.news-block__content-tag(href="#" @click.prevent="goSearchPage(tag)") {{`#${tag}`}}

      .news-block__actions(v-if="!deffered && !admin")
        .news-block__actions-block
          like-comment(
            :quantity="info.likes"
            width="16px"
            height="16px"
            font-size="15px"
            @liked="likeAction"
            :active="info.my_like"
            :id="info.id"
          )
        .news-block__actions-block
          like-comment(
            :quantity="commentsLength.allQuanttity"
            width="16px"
            height="16px"
            font-size="15px"
            :id="info.id"
            comment
          )
      .news-block__comments(v-if="!deffered")
        .news-block__comments-quantity
          p.news-block__comments-quantity-text Комментарии ({{ commentsLength.countComments }})
          a.news-block__comments-quantity-more(v-if="commentsLength.countComments>1" href="#" @click.prevent="showComments")
            template(v-if="isShowAllComments") свернуть
            template(v-else) показать
        comments(
          v-for="(comment,index) in info.comments || []" :key="index"
          v-show="index===0 || isShowAllComments"
          :admin="admin"
          :info="comment"
          :edit="edit"
          :deleted="deleted"
          @new-comment="addComment"
        )
          .news-block__comments-answers(slot="sub")
            expanded(
              v-if="comment.sub_comments.length>0"
              :sub_comments="comment.sub_comments"
            )
        template
          add-comment(
            :id="info.id",
            @submited="addComment"
            v-model="commentText"
          )
</template>

<script>
import AddForm from '@/components/News/AddForm'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import moment from 'moment'
import Comments from '@/components/Comments/Main.vue'
import AddComment from '@/components/Comments/Add.vue'
import LikeComment from '@/components/LikeComment'
import Expanded from '@/components/Comments/Expanded.vue'
import AddTags from '@/components/News/AddTags'

export default {
  name: 'NewsBlock',
  components: {Comments, LikeComment, AddForm, AddComment, AddTags, Expanded},
  props: {
    info: {
      type: Object,
      default: () => ({
        title: 'Дизайн привычных вещей',
        post_text:
          'А вот и «Книга недели от Skillbox и МИФ». Сегодня делимся с вами книгой «Дизайн привычных вещей» автора Дональда Нормана. В ней Дональд рассказывает об основополагающих принципах, которым нужно следовать, чтобы избежать проблем и превратить привычные вещи в приятные товары, доставляющие нам удовольствие А вот и «Книга недели от Skillbox и МИФ». Сегодня делимся с вами книгой «Дизайн привычных вещей» автора Дональда Нормана. В ней Дональд рассказывает об основополагающих принципах, которым нужно следовать, чтобы избежать проблем и превратить привычные вещи в приятные товары, доставляющие нам удовольствие',
        time: 1559751301818,
        likes: 44,
        id: 1,
        tags: ['tag1'],
        comments: null,
      })
    },
    edit: Boolean,
    deffered: Boolean,
    admin: Boolean,
    blocked: Boolean,
    deleted: Boolean,
  },
  data: () => ({
    isLotText: false,
    openText: false,
    isEditNews: false,
    isShowAllComments: false,
    commentText: '',
  }),
  computed: {
    ...mapGetters('profile/info', ['getInfo']),
    commentsLength() {
      let countComments = 0
      let countAnswers = 0
      this.info.comments.map(el => {
        !el.is_deleted && countComments++
        el.sub_comments &&
        el.sub_comments.map(subEl => {
          !subEl.is_deleted && countAnswers++
        })
      })
      return {countComments: countComments, countAnswers: countAnswers, allQuanttity: countComments + countAnswers}
    }
  },
  methods: {
    ...mapActions('global/likes', ['putLike', 'deleteLike']),
    ...mapActions('profile/feeds', ['deleteFeeds']),
    ...mapActions('profile/comments', ['newComment']),
    ...mapActions('global/search', ['searchNews']),
    ...mapMutations('global/search', ['setSearchTags']),
    goSearchPage(tag) {
      if (this.$router.currentRoute.name === 'Search') {
        this.setSearchTags(tag)
        this.searchNews()
      } else {
        this.$router.push({name: 'Search', query: {tab: 'news'}, params: {tags: tag}})
      }
    },
    toggleText() {
      this.openText = !this.openText
    },
    diffTime(time) {
      let now = moment()
      let timePost = moment(time)
      return timePost.calendar(null, {
        sameElse: `[через ${timePost.diff(now, 'days')} дней, ${timePost.diff(now, 'hours') % 24} часа]`
      })
    },
    addComment(value) {
      value
        ? this.newComment({
          post_id: this.info.id,
          text: value.commentText,
          parent_id: value.parentId
        })
        : this.newComment({
          post_id: this.info.id,
          text: this.commentText,
        });
      this.commentText = '';
    },
    likeAction(active) {
      active
        ? this.deleteLike({item_id: this.info.id, type: 'Post'})
        : this.putLike({item_id: this.info.id, type: 'Post'})
    },
    toggleEditNews() {
      this.isEditNews = !this.isEditNews
    },
    showComments() {
      this.isShowAllComments = !this.isShowAllComments
    },
    deleteNews() {
      this.deleteFeeds({
        id: this.getInfo.id,
        post_id: this.info.id,
        route: this.$route.name
      })
    }
  },
  mounted() {
    this.$refs.text.offsetHeight > 100 ? (this.isLotText = true) : (this.isLotText = false)
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.news-block {
  background: #FFFFFF;
  box-shadow: standart-boxshadow;
  padding: 30px 40px 10px 30px;
  position: relative;

  &.deffered {
    padding-bottom: 20px;

    .edit {
      top: 30px;
    }
  }

  &--admin {
    .news-block__comments {
      margin-top: 20px;
    }
  }

  & + & {
    margin-top: 30px;
  }

  @media (max-width: breakpoint-xxl) {
    padding: 20px 30px 10px 20px;
  }
}

.news-block__deffered {
  position: relative;
  height: 45px;
  margin-bottom: 20px;
  display: flex;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: -40px;
    right: -40px;
    bottom: 0;
    width: calc(100% + 80px);
    height: 2px;
    background-color: #e7e7e7;
  }

  @media (max-width: breakpoint-xxl) {
    &:after {
      left: -30px;
      width: calc(100% + 60px);
    }
  }
}

.news-block__deffered-text {
  color: #5F5E7A;
  font-size: 16px;
}

.news-block__author {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.news-block__author-pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;

  img {
    width: 100%;
  }
}

.news-block__author-name {
  font-weight: 600;
  font-size: 15px;
  color: #000;
  display: block;
  margin-bottom: 5px;
}

.news-block__author-time {
  font-size: 13px;
  color: santas-gray;
}

.news-block__content {
  display: flex;
}

.news-block__content-main {
  padding-bottom: 20px;
  border-bottom: 1px solid #E7E7E7;
  width: 100%;
}

.news-block__content-title {
  font-family: font-exo;
  font-weight: bold;
  font-size: 24px;
  color: #000;
  margin-bottom: 10px;
}

.news-block__content-text {
  font-size: 15px;
  line-height: 25px;
  color: storm-gray;
  overflow: hidden;
  text-align: justify;
  padding-right: 1em;
  position: relative;

  &:before {
    content: '\02026';
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: white;
  }

  &.lotText {
    max-height: 100px;
  }

  &.open {
    max-height: 100%;
    padding-right: 0;
  }
}

.news-block__content-more {
  display: inline-block;
  margin-top: 10px;
  font-size: 13px;
  color: eucalypt;
}

.news-block__content-tags {
  background-color: #F5F7FB;
  padding: 20px;
  max-width: 230px;
  flex: none;
  align-self: flex-start;
  margin-left: 40px;

  @media (max-width: breakpoint-xxl) {
    margin-left: 20px;
  }
}

.news-block__content-tag {
  color: eucalypt;
  font-size: 13px;
  line-height: 22px;
  display: inline-block;
  margin: 0 7px;
}

.news-block__actions
  display flex
  align-items flex-end
  margin 25px 0
  padding-bottop 20

  &-block
    & + &
      margin-left 30px

.news-block__comments-quantity
  display flex
  align-items flex-end
  font-family font-exo
  font-weight bold
  font-size 20px
  color #000
  padding-bottom 20px

  &-text
    padding-right 10px

  &-more
    font-size 13px
    font-weight normal
    color eucalypt

.news-block__comments-answers
  display block
  width 100%

  > .comment-main
    padding-top 10px
</style>
