<template>
<!-- 只有list在可视范围内才会检查滚动位置触发onload -->
<!-- immediate-check :是否在初始化时立即执行滚动位置检查 -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
    :error="error"
    error.text="加载失败，请点击重试"
  >
    <comment-item
    v-for="(item,index) in list"
    :key="index"
    :comment="item"
    @reply-click="$emit('reply-click',$event)"
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
    },
    list: {
      type: Array,
      default: () => [] // 对象给默认值要以函数返回值的方式
    },
    type: {
      type: String,
      validator (value) { // 自定义Prop数据验证
        return ['a', 'c'].includes(value) // 数据验证,传递过来的数据必须是a或者c,返回的是布尔值
      },
      default: 'a' // 默认值类型,若子组件调用可以在子组件中做修改
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  created () {
    // 因为前面设置了:immediate-check="false"，所以如果用户在网速过慢的情况下，loading效果会消失，这里手动添加
    this.loading = true
    this.onLoad()
  },
  methods: {

    async onLoad () {
      try {
      // 获取文章的评论和获取评论的回复是同一个接口
      // 唯一不同的区别是接口参数不一样
      // type:    a  文章的评论; c 评论的回复
      // source:  文章的平路需要获取文章的id  评论的回复需要获取评论的id
      // 1.请求获取数据
        const { data } = await getComments({
        // 评论类型，a对文章(article)的评论，c对评论(comment)的回复
          type: this.type,
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
