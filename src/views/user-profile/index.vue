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
    :value="user.gender === 0 ?  '男' : '女'"
    is-link
    @click="isUpdateGenderShow=true"
    />
    <van-cell
    title="生日"
    :value="user.birthday"
    is-link
    @click="isUpdateBirthdayShow=true"
    />
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

    <!-- 编辑性别 -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom">
      <update-gender
      v-if="isUpdateGenderShow"
      v-model="user.gender"
      @close="isUpdateGenderShow=false"
      />
    </van-popup>
    <!-- 编辑性别结束 -->

      <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom">
    <update-birthday
      v-if="isUpdateBirthdayShow"
      v-model="user.birthday"
      @close="isUpdateBirthdayShow=false"
    />
    </van-popup>
    <!-- 编辑生日结束 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday
  },
  props: {},
  data () {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false, // 修改昵称弹窗
      isUpdateGenderShow: false, // 修改性别弹窗
      isUpdateBirthdayShow: false // 修改生日弹窗
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
