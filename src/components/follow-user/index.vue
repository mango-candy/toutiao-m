<template>
     <van-button
            v-if="isFollowed"
            class="follow-btn"
            round
            size="small"
            :loading="loading"
            @click="onFollow"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="loading"
            @click="onFollow"
          >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 点击--关注用户、取消关注 的按钮
    async onFollow () {
      // 点击关注按钮开始请求后台数据的时候将按钮变为loading状态，防止用户重复点击
      this.loading = true
      try {
        // 如果点击按钮时存在isFollowed的状态表明已关注
        if (this.isFollowed) {
          // 因为当前处于已关注状态所以点击后需要变成未关注状态,所以需要调用的是取消关注的接口并传递被点击的用户ID
          await deleteFollow(this.userId)
        } else {
          // 因为当前处于为关注状态,所以点击时需要关注该用户,所以调用的是关注的接口
          await addFollow(this.userId)
        }
        // 切换按钮状态(子组件改变父组件状态)
        // this.article.is_followed = !this.article.is_followed
        // ('update-is_followed', !this.isFollowed)：可以理解为将this.isFollowed的状态更新！this.isFollowed
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败,请重试!'
        if (err.response && err.response.status === 400) {
          message = '用户无法关注自己'
        } else this.$toast(message)
      }
      // 数据请求结束后撤销关注按钮的loading状态
      this.loading = false
    }
  }
}
</script>
<style scoped lang="less"></style>
