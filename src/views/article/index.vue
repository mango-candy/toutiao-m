<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate|relativeTime}}</div>

          <!-- 模板中需要使用$event来获取事件参数 -->
          <!-- 当我们传递子组件的数据既要使用还需要修改，一般使用
          传递：props
          :is-followed="article.is_followed"
          修改：$emit
          @update-is_followed="article.is_followed=$event"
          可以使用v-model进行简写:v-model="article.is_followed"
          组件使用v-model传值则自动属性：
          value="article.is_followed"
          @input="article.is_followed=$event"
          后续需要在子组件中使用model将默认名称value和@input改名
          v-model只能最单数据传输修改,且单个组件只能使用一次，多个数据需要用sync
           -->
         <follow-user
          class="follow-btn"
          :user-id="article.aut_id"
          v-model="article.is_followed"
         />

          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="followLoading"
            @click="onFollow"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
            @click="onFollow"
          >关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="article-content"></div>
        <van-divider>正文结束</van-divider>
            <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
          >写评论</van-button>
          <van-icon
            class="comment-icon"
            name="comment-o"
            info="123"
          />
          <collect-article
          v-model="article.is_collected"
          :article-id="article.art_id"
          />
          <!-- <van-icon
            color="#777"
            name="star-o"
          /> -->
          <van-icon
            color="#777"
            name="good-job-o"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus===404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadArticle" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 加载中的loading状态
      errStatus: 0, // 状态码失败
      followLoading: false // 关注按钮的loading状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    // 获取文章详情数据
    async loadArticle () {
      this.loading = true // 只要开始获取文章数据就必须显示loading状态，后续不管是获取成功还是失败都设置关闭loading
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data

        setTimeout(() => {
          this.previewImage()
        }, 0)
        // this.loading = false // 请求成功则loading状态关闭
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }

        // this.loading = false // 若数据请求失败则将loading状态关闭而直接显示加载页面
        console.log('获取数据失败', err)
      }
      this.loading = false // 无论是成功或者失败都需要关闭loading，唯一显示的loading的条件是网速过慢
    },
    // 点击文章图片显示预览
    previewImage () {
      // 1.通过refs索性获取所有的内容
      const articleContent = this.$refs['article-content']
      // 2.将获取的内容里面的图片提取出来
      const imgs = articleContent.querySelectorAll('img')
      // 3.创建空数组，用来存储图片地址
      const images = []
      // 4.遍历获取出来的所有图片，并且将图片和图片的索引号作为形参
      imgs.forEach((img, index) => {
        // 5.通过图片的src属性得到地址，将地址通过遍历的形式存储进前期创建的空数组
        images.push(img.src)
        // 6.遍历的时候创建所有图片的点击事件
        img.onclick = () => {
          // 7.调用vant里面的ImagePreview组件
          ImagePreview({
            // 8.所有的图片地址
            images,
            // 9.图片起始的位置，从0开始，所有图片的索引号
            startPosition: index
          })
        }
      })
    }

  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
