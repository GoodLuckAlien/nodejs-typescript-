import Taro, { Component } from '@tarojs/taro'
import { View , Button , Input , Text } from '@tarojs/components'

import './style.less'
import request from '../../../unit/request'

interface IndexSate {
   pwd :number | undefined
   phoneTem:string 
   isOpened:boolean
}

export default class Login extends Component<{} , IndexSate > {

  config = {
    navigationBarTitleText: '登陆',
    backgroundColor: '#fff',
    enablePullDownRefresh: false
  }

  state = {
    phoneTem: '',
    pwd: undefined,
    isOpened: false,
  }

  handleChangeAc = (e:any) => {
    console.log(e)
    this.setState({phoneTem : e.detail.value})
    
  }

  handleChangePs = (e:any) => {
      console.log(e)
    this.setState({pwd : e.detail.value})
  }

  async getUserInfo() {
    const { userInfo } = await Taro.getUserInfo()
    Taro.setStorageSync('wxInfo', userInfo)
  }

  async login() {
    const { phoneTem , pwd } = this.state
    if(!phoneTem || !pwd) {
      Taro.showToast({
        title: '请先输入用户名和密码',
        icon: 'none',
        mask: true,
        duration: 1500
      })
      return false
    }
    //登陆操作
    request({
      url:'login',
      method:'post',
      data:{
        username:phoneTem,
        password:pwd,
      }
    },(res:any)=>{
      if(res.code==='0'){
         //保存token 
         Taro.setStorageSync('token',res.token)
         Taro.switchTab({url: '/pages/root/homes/index'})
         
      }else{
        Taro.showToast({
          title:res.content,
          icon: 'none',
        })
      }
    })
  }
  routeGo=(url:string)=>{
    Taro.navigateTo({
      url,
    })
  }
  render() {
      const { phoneTem , pwd } = this.state
    return (
      <View className='login'>
        <View className='head'>
        </View>
        <View className='content'>
          <Input
            type='text'
            value={phoneTem}
            className='input'
            placeholder='手机号'
            onInput={this.handleChangeAc}
          />
          <Input
            name='pwd'
            type='number'
            password={true}
            placeholder='密码'
            value={pwd}
            className='input'
            onInput={this.handleChangePs}
          />
          <Button className='button' type='primary' onClick={this.login}>登录</Button>
          <View className='addtion'  ><Text>忘记密码 ？</Text> <Text  onClick={ this.routeGo.bind(this,'/pages/root/register/index') }   >注册？</Text> </View>
        </View>
       
        <View className='tip'>©  alien提供技术服务</View>
        {/* <AtMessage /> */}
      </View>
    )
  }
}