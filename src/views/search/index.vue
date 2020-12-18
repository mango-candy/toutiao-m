<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
      class="search-from"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>
    <!-- 搜索栏 -->

    <!-- 搜索结果 开始 -->
        <search-result
        v-if="isResultShow"
        :search-text="searchText">
        </search-result>
    <!-- 搜索结果 结束 -->

    <!-- 联想建议 开始 -->
    <search-suggestion
    v-else-if="searchText"
    :search-text="searchText"
    @search="onSearch"
    ></search-suggestion>
    <!-- 联想建议 结束 -->

    <!-- 搜索历史记录 开始 -->
    <search-history v-else
    :search-histories="searchHistories"
    @clear-search-histories="searchHistories=[]"
    @search="onSearch"
    ></search-history>
    <!-- 搜索历史记录 结束 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史记录数据
    }
  },
  watch: {
    // 当搜索历史的内容发生变化时，将最新的搜索历史的数据，存储到本地
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
    // 完整写法 支持自定义配置进行深度监视
    // searchHistories: {
    //   handler () {}
    // }
  },
  methods: {
    // 触发搜索事件
    onSearch (val) {
      // 发生搜索事件后，将搜索的词条更新搜索文本框内容
      this.searchText = val

      // 将搜索的词条存储搜索历史记录
      // 要求：1.不要有重复历史记录
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
        // 要求：2.新的搜索记录排在前面
      } else { this.searchHistories.unshift(val) }

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-from{
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index: 1;

  }
}
</style>
