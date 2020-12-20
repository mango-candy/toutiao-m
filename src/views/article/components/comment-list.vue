<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error.text="加载失败，请点击重试"
  >
    <comment-item
    v-for="(item,index) in list"
    :key="index"
    :comment="item"
     />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
      // 1.请求获取数据
        const { data } = await getComments({
        // 评论类型，a对文章(article)的评论，c对评论(comment)的回复
          type: 'a',
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        // 2.将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 把文章的评论总数量传递到父组件中
        this.$emit('onload-success', data.data)

        // 3.将loading状态设置为false
        this.loading = false
        // 4.判断是否还有剩余数据未渲染完
        if (results.length) {
          // 4.1 如果有剩余数据未渲染则更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          // 4.2 如果没有则将finished设置为结束。
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
