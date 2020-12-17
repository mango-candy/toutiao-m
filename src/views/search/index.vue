<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
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
        <search-result v-if="isResultShow"></search-result>
    <!-- 搜索结果 结束 -->

    <!-- 联想建议 开始 -->
    <search-suggestion
    v-else-if="searchText"
    :search-text="searchText"></search-suggestion>
    <!-- 联想建议 结束 -->

    <!-- 搜索历史记录 开始 -->
    <search-history v-else></search-history>
    <!-- 搜索历史记录 结束 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
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
      isResultShow: false // 控制搜索结果的展示
    }
  },
  methods: {
    onSearch (val) {
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
  .van-search__action {
    color: #fff;
  }
}
</style>
