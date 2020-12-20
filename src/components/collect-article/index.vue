<template>
    <van-icon
    :name="value ? 'star' : 'star-o'"
    :class="{
      collected: value
    }"
    :loading="false"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
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
    // 点击收藏按钮，已收藏则取消收藏，未收藏则收藏
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏，则操作取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏，则添加收藏
          await addCollect(this.articleId)
        }
        // 所有操作完成后需要更新收藏图标视图
        this.$emit('input', !this.value)
        // 注意这里的 this.value 不会马上改变，所以进行了取反
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>
<style scoped lang="less">
    .collected {
      color: #ffa500 !important;
    }
</style>
