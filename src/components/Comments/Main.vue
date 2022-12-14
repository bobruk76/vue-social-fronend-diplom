<template lang="pug">
  .comment-main(v-show="isShow")
    template(v-if="info.is_deleted")
      p.comment-main__text Комментарий удален.
        a(href="#" @click="onRecoverComment") Восстановить
    template(v-else)
      .edit.edit--small(v-if="edit || deleted")
        .edit__icon(v-if="deleted" @click="onDeleteComment")
          simple-svg(:filepath="'/static/img/delete-news.svg'")
        .edit__icon(v-if="edit" @click="editComment")
          simple-svg(:filepath="'/static/img/edit.svg'")
      router-link.comment-main__pic(:to="{name: 'ProfileId', params: {id: info.author.id}}")
        img(:src="info.author.photo" :alt="info.author.first_name")
      .comment-main__main
        router-link.comment-main__author(:to="{name: 'ProfileId', params: {id: info.author.id}}") {{info.author.first_name + ' ' + info.author.last_name}}
        p.comment-main__text {{info.comment_text}}
        .comment-main__actions
          p.comment-main__time {{info.time | moment('from') }}
          template(v-if="!admin")
            a.comment-main__review(v-if="hasAnswering" href="#" @click.prevent="toggleNewComment")
              template(v-if="!isAddSubComment") Ответить
            like-comment(
              :quantity="info.likes"
              width="16px"
              height="16px"
              font-size="15px"
              @liked="likeAction"
              :active="info.my_like"
              :id="info.id"
            )
            .break
            slot(name="sub")
            .break
            .comment-main__new
              add-comment(
                v-show="isAddSubComment"
                :id=parentId
                :parentId=parentId
                @submited="addSubComment"
                v-model="subCommentText"
                placeholder="Написать ответ..."
              )
</template>

<script>
import {mapActions} from 'vuex'
import LikeComment from '@/components/LikeComment'
import AddComment from '@/components/Comments/Add.vue'

export default {
  name: 'CommentMain',
  props: {
    admin: Boolean,
    info: Object,
    edit: Boolean,
    deleted: Boolean,
    hasAnswering: {
      type: Boolean,
      default: true,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  components: {LikeComment, AddComment},
  data: () => ({
    subCommentText: '',
    isAddSubComment: false,
  }),
  methods: {
    ...mapActions('global/likes', ['putLike', 'deleteLike']),
    ...mapActions('profile/comments', ['newComment']),
    toggleNewComment() {
      // $emit('answer-comment')
      this.isAddSubComment = !this.isAddSubComment
    },
    addSubComment() {
      this.$emit('new-comment', {
        commentText: this.subCommentText,
        parentId: this.info.id,
      });
      this.subCommentText = '';
      this.isAddSubComment = false;
    },
    likeAction(active) {
      const data = {item_id: this.info.id, post_id: this.info.post_id, type: 'Comment'};
      active ? this.deleteLike(data) : this.putLike(data);
    },
    onDeleteComment() {
      this.$emit('delete-comment', this.info.id)
    },
    editComment() {
      this.$emit('edit-comment', {
        id: this.info.id,
        commentText: this.info.comment_text,
        parentId: this.info.parent_id
      })
    },
    onRecoverComment() {
      this.$emit('recover-comment', this.info.id)
    }
  },
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.comment-main {
  display: flex;
  font-size: 13px;
  position: relative;
  padding-bottom: 26px;
}

.comment-main__pic {
  flex: none;
  align-self: flex-start;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;

  img {
    width: 100%;
  }
}

.comment-main__main {
  width: 100%;
}

.comment-main__author {
  font-weight: 600;
  color: #000;
  margin-bottom: 5px;
  display: block;
}

.comment-main__text {
  line-height: 21px;
  color: #6A6A80;
  margin-bottom: 5px;
}

.comment-main__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.comment-main__time {
  color: santas-gray;
  display: block;
  margin-right: 20px;
}

.comment-main__review {
  color: eucalypt;
  margin-right: 10px;
}

.comment-main__new {
  flex-basis: 100%;
}

.break {
  flex-basis: 100%;
  height: 0;
}
</style>
