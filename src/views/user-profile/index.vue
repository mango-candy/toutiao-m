<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell
    title="昵称"
    :value="user.name"
    is-link
    @click="isUpdateNameShow=true"
    />
    <van-cell
    title="性别"
    :value="user.gendar === 0 ?  '男' : '女'"
    is-link />
    <van-cell title="生日" :value=user.birthday is-link />
    <!-- /个人信息 -->

    <!-- 编辑昵称开始 -->
    <van-popup
    style="height:100%"
    v-model="isUpdateNameShow"
    position="bottom">
      <update-name
      v-if="isUpdateNameShow"
      v-model="user.name"
      @close="isUpdateNameShow=false"
      />
    </van-popup>
    <!-- 编辑昵称结束 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
export default {
  name: 'UserProfile',
  components: {
    UpdateName
  },
  props: {},
  data () {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false //
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
