<template>
  <div class="home-container">
      <!-- 导航栏开始 -->
    <van-nav-bar class="page-nav-bar" fixed>
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
      <van-tab
      v-for="channel in channels"
      :key="channel.id"
      :title="channel.name"
      >

      <!-- 文章列表 -->
      <article-list :channel="channel"></article-list>
      <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow=true">
           <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表结束 -->

    <!-- 频道编辑弹出层开始 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
    <!-- 弹出层的内容组件 -->
      <channel-edit
      :my-channels="channels"
      :active="active"
      @updata-active="onUpdataActive"
      />
    </van-popup>
    <!-- 频道编辑弹出层结束 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false // 控制频道弹出层的显示状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    // 获取我的频道内的频道数据
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    // 编辑状态下点击 我的频道 的频道元素主页切换频道
    onUpdataActive (index, isChannelEditShow = true) {
      this.active = index
      // 关闭弹层
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>
<style scoped lang="less">
// 当前组件中加了 scoped 对内部样式的修改需要加 /deep/，或者去掉 scoped
.home-container {
  padding-top:174px;
  padding-bottom:100px;
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
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
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
