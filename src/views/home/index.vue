<template>
  <div class="home-container">
      <!-- 导航栏开始 -->
    <van-nav-bar class="page-nav-bar">
     <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 导航栏结束 -->

    <!-- 频道列表开始 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 n">内容 n</van-tab>
      <van-tab title="标签 n">内容 n</van-tab>
      <van-tab title="标签 n">内容 n</van-tab>
      <van-tab title="标签 n">内容 n</van-tab>
      <van-tab title="标签 n">内容 n</van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
           <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表结束 -->
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
// 当前组件中加了 scoped 对内部样式的修改需要加 /deep/，或者去掉 scoped
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;   //清除原有的最大宽度的属性
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
    }
    // Tab 标签页
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder{
      // flex-shrink默认值为1表示参与剩余空间计算，设置为0则不参与剩余空间计算强行获取现有空间
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items:center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.852;
      i.toutiao{
        font-size: 33px;
      }
      &:before{
          content:"";
          position: absolute;
          left: 0;
          width: 1px;
          height: 100%;
          background: url("../../assets/gradient-gray-line.png");
          background-size: contain;
      }
    }
  }
}
</style>
