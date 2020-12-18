<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <!-- v-if 结合 v-show来使用 -->
      <div v-if="isDeleteShow">
      <span @click="$emit('clear-search-histories')">全部删除</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell
    :title="item"
    v-for="(item,index) in searchHistories"
    :key="index"
    @click="onSearchItemClick(item,index)"
    >
      <van-icon v-show="isDeleteShow" name="close"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    // prop 数据
    // 如果是普通数据（数字，字符串，布尔值）绝对不能修改
    // 即使改了也无法传导给父组件
    //  如果是引用类型数据（数组，对象）
    // 可以修改，例如[].push
    // 不能重新赋值  ， xxx=[]
    searchHistories: { /// / 搜索的历史记录数据
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制删除显示状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 点击历史单元格触发删除或搜索事件
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        //  删除状态下，点击单元格删除历史记录数据
        this.searchHistories.splice(index, 1)
      } else {
        // 非删除状态，点击单元格直接进行搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>
<style scoped lang="less"></style>
