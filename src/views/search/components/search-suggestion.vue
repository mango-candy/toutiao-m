<template>
  <div class="search-suggestion">
    <van-cell
    icon="search"
    v-for="(text, index) in Suggestions"
    :key="index"
    >
    <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      Suggestions: [] // 联想建议数据列表
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当searchText发生改变的时候就会调用handler函数
      // 注意handler函数名称是固定的
      // debounce 防抖函数
      // 参数1：需要防抖的函数
      // 参数2：需要延迟的时间，单位毫秒
      // 返回值：防抖之后的函数
      handler: debounce(
        function (value) {
          this.loadSearchSuggestions(value)
        }
        , 300),
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      immediate: true // 该回调会在侦听开始后立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 获取搜索框联想建议自动补全的数据
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.Suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },

    // 搜索关键字高亮
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 如果需要在正则表达式//中写动态数据，则需要手动 new RegExp
      // RegExp是正则表达式的原生构造函数
      // 参数1：匹配模式字符串，会根据字符串创建解析正则对象
      // 参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi') // g：全局匹配，i：忽略大小写
      return text.replace(reg, highlightStr)
    }
  }
}
</script>
<style scoped lang="less">
.search-suggestion{
 /deep/ span.active{
   color:#3296fa
  }
}
</style>
