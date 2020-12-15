import Vue from 'vue'

import dayjs from 'dayjs'

// dayjs默认语言为英文，需要配置为中文
// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 配置使用 relativeTime相对时间 显示插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

// 定义一个全局过滤器，方便在任何模板中都能使用
// 过滤器相当于一个全局可用的方法（仅供模板中使用）
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方式:{{表达式|过滤器名称}}
// 管道符前面的表达式的结果会作为参数传递到过滤器的函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

// dayjs()表示获取当前最新时间
// dayjs().format('YYYY-MM-DD')
