import Taro, { Component } from '@tarojs/taro'
import { View  , Button   } from '@tarojs/components'
// import { AtImagePicker  } from 'taro-ui'
// import './style.less'

class Index extends Component{
   constructor(){
       super()
   }
   config = {
    navigationBarTitleText: '多文件上传',
    backgroundColor: '#fff',
    enablePullDownRefresh: false
    }
   uploadImg=()=>{
       Taro.chooseImage({
           sizeType:['origin'],
           sourceType: ['album', 'camera'], 
           success:res=>{
               console.log(res.tempFilePaths)
               //获取token
               const token = Taro.getStorageSync('token')
               Taro.uploadFile({
                   url:'http://local.beautfull.zhaolin:8080/uploadImg',
                   filePath:res.tempFilePaths[0],
                   name:'myImg',
                   header:{
                    Authorization:token || '' , 
                   },
               })
           },
       })
   } 
   render(){
       return<View>
               <Button  onClick={this.uploadImg} >文件上传</Button>
            </View> 
   }
}

export default Index