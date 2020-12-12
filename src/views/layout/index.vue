<template>
  <div class="layout-container">
      <!-- 子路由出口开始 -->
      <router-view />
      <!-- 子路由出口结束 -->

      <!-- 标签导航栏开始 -->
      <!-- route开启路由模式  to是配合路由模式实现路由导航跳转 -->
      <van-tabbar class="layout-tabbar" route>
        <van-tabbar-item to="/">
          <i slot="icon" class="toutiao toutiao-shouye"></i>
          <span class="text">首页</span>
          </van-tabbar-item>
        <van-tabbar-item to="/qa">
          <i slot="icon" class="toutiao toutiao-wenda"></i>
          <span class="text">问答</span>
          </van-tabbar-item >
          <van-tabbar-item to="/video">
          <i slot="icon" class="toutiao toutiao-shipin"></i>
          <span class="text">视频</span>
          </van-tabbar-item>
          <van-tabbar-item to="/my">
          <i slot="icon" class="toutiao toutiao-wode"></i>
          <span class="text">我的</span>
          </van-tabbar-item>
      </van-tabbar>
      <!-- 标签导航栏结束 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {

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
.layout-container{
 .layout-tabbar{
  i.toutiao{
      font-size: 40px;
  }
  span.text{
      font-size: 20px;
  }
 }
}
</style>
