<template>
  <!-- load 事件：
     List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
     如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

     loading 属性！！！：控制加载中的 loading 状态
     非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
     加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

     finished 属性！！！：控制加载结束的状态
     在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
     所有数据加载结束，finished 为 true，此时不会触发 load 事件 -->
  <div class="article-list">
    <!-- van-pull-refresh下拉刷新组件 -->
    <van-pull-refresh
    v-model="isreFreshLoading"
     :success-text="refreshSuccessText"
     :success-duration="1000"
    @refresh="onRefresh">
      <!-- list列表 -->
       <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad">
       <van-cell
        v-for="(article,index) in list"
        :key="index"
        :title="article.title" />
       </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中的 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的loading状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 初始化或滚动到列表底部时会触发调用onLoad
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          // channel_id:频道id 从home/index.vue中获取
          channel_id: this.channel.id,
          // timestamp：简单理解就是页码，
          // 请求第1页数据：当前最新时间戳（通过Date.now()获取）
          // 请求历史第2页数据的时间戳，会在当前请求结果中通过系统返回得到
          timestamp: this.timestamp || Date.now(),
          // with_top：是否包含置顶文章，数据1是包含置顶文章，0是不包含
          with_top: 1
        })

        // 2.将请求结果数据放入list数组中
        const { results } = data.data
        this.list.push(...results) // 必须要使用push和展开运算符，因为是列表形式界面，需要将数据一个一个追加进入

        // 3.本次数据加载状态结束之后需要将加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，将finished设置为true,将不再load加载更多了
          this.finished = true
        }
      } catch (err) {
        // 暂时错误提示状态
        this.error = true
        // 请求失败，loading关闭
        this.loading = false
      }
    },

    // 当下拉刷新的时候会触发调用该函数
    async onRefresh () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          // channel_id:频道id 从home/index.vue中获取
          channel_id: this.channel.id,
          // 下拉刷新，每次请求获取最新数据，所以传递当前最新时间戳
          timestamp: Date.now(),
          // with_top：是否包含置顶文章，数据1是包含置顶文章，0是不包含
          with_top: 1
        })
        // 2. 将获取到的数据追加到列表的顶部
        // this.list.unshift(...data.data.results)
        const { results } = data.data
        this.list.unshift(...results)

        //  3.关闭下拉刷新的loading的状态
        this.isreFreshLoading = false

        // 3.1 更新下拉刷新成功的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }

    // 初始化或加载至底部的时候会触发或调用onLoad事件
    // onLoad () {
    //   // 1.请求获取数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     //2. 将请求结果数据放入list数组中
    //     for (let i = 0; i < 10; i++) {
    //       // list.length + 1表示的是前面的需要逐一递加
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 3.本次数据加载状态结束之后需要将加载状态设置为结束
    //     // 若loading状态没有设置为false则会一直显示加载中，关闭之后才能加载更多的数据
    //     this.loading = false

    //     // 4.判断数据是否全部加载完成
    //     if (this.list.length >= 40) {
    //       // 如果已经加载40条数据，则将finished设置为true，显示底部的‘没有更多了’的信息，并不在进行加载
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
  }
}
</script>
<style scoped lang="less">
.article-list{
      height: 79vh;
      overflow-y:auto ;
}
</style>
