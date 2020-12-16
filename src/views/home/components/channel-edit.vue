<template>
  <div class="channel-edit">
    <!-- 我的频道标题 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini" @click="isEdit=!isEdit"
        >{{isEdit ? '完成':'编辑'}}</van-button
      >
    </van-cell>
    <!-- 我的频道 内容 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel,index)"
      >
      <van-icon
      v-show="isEdit && !fiexdChannels.includes(channel.id)" slot="icon"
      name="clear">
      </van-icon>
      <!-- v-bind:class语法：
      对象中的key表示css中要作用的类名
      对象中的value表示要计算的布尔值
      布尔值为true，则作用该类名
      布尔值为false，则不作用该类名
       -->
      <span
      class="text"
      :class="{ active: index === active }" slot="text"
       >{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐标题 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 频道推荐内容 -->
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channels, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channels.name"
        @click="onAddChannel(channels)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制关闭图标的显示
      fiexdChannels: [0] // 固定频道不允许删除
    }
  },
  computed: {
    recommendChannels () {
      // const channels = []
      // this.allChannels.forEach(channel => {
      //   // find遍历数组，找到满足条件的元素项
      //   // 在find里面定义函数，以myChannel做箭头函数的形参，
      //   // 用myChannels里面的id和allChannels里面forEach遍历出来的channel.id进行比较.
      //   // find里面的myChannel是自定义形参，为了方便理解。
      //   const ret = this.myChannels.find(myChannel => {
      //     return myChannel.id === channel.id
      //   })
      //   // 如果我的频道中不包含该频道项，则收集到推荐频道中
      //   if (!ret) {
      //     channels.push(channel)
      //   }
      // })
      // // 将计算结果返回
      // return channels

      // 语法优化
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(mychannel => {
          return mychannel.id === channel.id
        })
      })
    }

  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 获取全部频道数据
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    // 点击推荐频道元素名字添加进入我的频道
    onAddChannel (channel) {
      this.myChannels.push(channel)
    },
    // 点击 我的频道 内的频道元素 删除或切换频道
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 1.在删除状态下，如果是固定频道则不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        // 2.在删除状态下，删除频道
        // index:当前频道列表选中的频道索引
        // this.active：主页激活的频道索引
        this.myChannels.splice(index, 1)
        // 2.1 防止BUG且删除当前高亮频道，让高亮状态前进一位
        if (index <= this.active) {
          //  让激活频道的索引-1
          this.$emit('updata-active', this.active - 1, true)
        }
      } else {
        // 3.编辑状态则点击之后切换频道
        this.$emit('updata-active', index, false)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  // 编辑按钮
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
