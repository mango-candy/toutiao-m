<template>
<!-- 文章列表项组件 -->
<!-- cell中的 to属性 和VueRouter中的RouterLink导航键中的 to属性用法是一样的 -->
  <!-- :to="'/article/'+article.art_id" -->
  <!-- :to="`/article/${article.art_id}`" -->
  <van-cell
  class="article-item"
  :to="{
      name:'article',  //根据路由名称进行跳转
      params:{        //传递路由动态参数
      // 属性名：路由路径中设计的动态参数名称
        articleId: article.art_id
      }
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <!-- 三张图片的情况 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image :src="img" fit="cover" class="cover-item-img" />
        </div>
      </div>
      <!-- 文章信息 -->
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 右侧一张图片的情况 -->
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      slot="default"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: { // 这个article是从home/components里面 article-item标签传过来的
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  // 右侧的一张图片
  .van-cell__value {
    // https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex
    flex: unset;
    // unset
    // 属性是默认继承属性，该值等同于 inherit
    // 该属性是非继承属性，该值等同于 initial
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 100%;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
