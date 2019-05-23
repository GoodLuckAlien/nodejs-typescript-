import Taro, { Component } from '@tarojs/taro'
import { View  } from '@tarojs/components'


class Index extends Component{
   constructor(){
       super()
   }
  
   routerGo=(url:string)=>{
      Taro.navigateTo({
          url,
      })
   }
   render(){
       return<View onClick={this.routerGo.bind(this,'/pages/business/text/index')} >多文件上传</View> 
   }
}

export default Index