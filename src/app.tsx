import '@tarojs/async-await'
import Taro, { Component, Config  } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/root/start/index',
      'pages/root/login/index',
      'pages/root/register/index',
      "pages/root/homes/index",
      "pages/root/client/index",
      "pages/root/my/index",
    ],
    subPackages:[
      {
         root:'pages/business/',
         pages:[
           'my/index', //我的
           
          ],
      },
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#5587FF",
      backgroundColor: "#fff",
      borderStyle: "black",
      custom:false,
      list: [
        {
          pagePath: "pages/root/homes/index",
          text: "工作",
          iconPath: "./assets/images/menus/tab_Repair@2x.png",
          selectedIconPath: "./assets/images/menus/tab_Repair_pre@2x.png"
        },
        {
          pagePath: "pages/root/client/index",
          text: "顾客",
          iconPath: "./assets/images/menus/tab_customer@2x.png",
          selectedIconPath: "./assets/images/menus/tab_customer_pre@2x.png"
        },
        {
          pagePath: "pages/root/my/index",
          text: "我的",
          iconPath: "./assets/images/menus/tab_mine@2x.png",
          selectedIconPath: "./assets/images/menus/tab_mine_pre@2x.png"
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
