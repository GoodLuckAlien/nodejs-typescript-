import Taro , { Component  } from '@tarojs/taro'
import {  View , Text , Image , Button } from '@tarojs/components'
import './style.less'
// import home from './img/home.jpg'
import  request from '../../../unit/request'
// 微信授权页面 

interface IndexStates {
    hasAuthorization:Boolean
}

class Index extends Component<{},IndexStates>{
    
    constructor(props:object){
       super(props)
       this.state={
          hasAuthorization:false,
       }
    }
    config = {
        navigationStyle: 'custom',
        enablePullDownRefresh: true,
        
    }
    
    async componentDidMount(){ 
        const authorization = await Taro.getSetting()
        if(authorization.authSetting['scope.userInfo']) { //已授权
            this.getDefaultUserInfo()
            this.getAutoLogin()
            this.setState({hasAuthorization: true})
          } else {
            this.getAutoLogin()
            this.setState({hasAuthorization: false})
          }
    }
    //控制自动登陆
    async getAutoLogin(){
       const { code } =await Taro.login()
        console.log(code)
       let obj={
           method:'get',
           data:{ code:18241891385 },
           url:'getApiCode',
       }
      //  Taro.navigateTo({url: '/pages/root/login/index'})
       let token = Taro.getStorageSync('token')
       if(token){
        Taro.switchTab({url: '/pages/root/homes/index'})
       }
       request(obj,((res : any )=>{
          if(res.code==='0'){
            Taro.navigateTo({url: '/pages/root/login/index'})
          }
       }))
       
    }
    async getDefaultUserInfo(){
        const wxInfo = await Taro.getUserInfo()
        Taro.setStorageSync('wxInfo',wxInfo)
    }
    getUserInfo=(e:any)=>{
      if(e.detail.userInfo) {
        Taro.setStorageSync('wxInfo', e.detail.userInfo)
        Taro.navigateTo({url: '/pages/root/login/index'})
      }
    }
    render(){
        const { hasAuthorization } = this.state
        return <View className='start' >
                 <Image src={'https://static.gytcrm.com/BosscardShopMini/Start_bg@2x.png'} />
                 {
                    !hasAuthorization  &&   <Button open-type='getUserInfo'  className='button  fadeIn'  ongetuserinfo={this.getUserInfo} type='primary'>微信授权登录</Button>
                 }
                 <Text  className='tip'  >© alien提供技术服务</Text>
               </View>
    }
}
export default Index