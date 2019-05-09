import Taro, { Component } from '@tarojs/taro'
import { View , Button , Input  } from '@tarojs/components'
import request from '../../../unit/request'
import '../login/style.less'
import './style.less'

interface IndexSate {
   pwd :number | undefined
   phoneTem:string 
   isOpened:boolean
}

export default class Login extends Component<{} , IndexSate > {

  config = {
    navigationBarTitleText: '注册',
    backgroundColor: '#fff',
    enablePullDownRefresh: false
  }

  state = {
    phoneTem: '',
    pwd: undefined,
    isOpened: false,
  }

  handleChangeAc = (e:any) => {
    // console.log(e)
    this.setState({phoneTem : e.detail.value})
    
  }

  handleChangePs = (e:any) => {
      
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
    request({
        url:'resgister',
        method:'post',
        data:{ username:phoneTem,password:pwd  },
    },(res:any)=>{
       if(res.code==='0'){
        Taro.showToast({
          title: '注册成功',
          icon: 'none',
        })
        Taro.navigateBack()
       }
       else{
        Taro.showToast({
          title: res.content,
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
  verification=(val:any)=>{
     //正则验证
     const PHONE = /^[1]([3-9])[0-9]{9}$/
     if(PHONE.test(val.detail.value)){
      request({
        url:'verification',
        method:'get',
        data:{ username:val.detail.value  }
      },(res:any)=>{
         if(res.code==='0'){ 
         }else{
          Taro.showToast({
            title: res.content,
            icon: 'none',
          })
          this.setState({
            phoneTem:'',
          })
         }
      })
     }else{
        Taro.showToast({
          title: '请输入符合的手机号',
          icon: 'none',
        })
        this.setState({
          phoneTem:'',
        })
     }
  }
  render() {
      const { phoneTem , pwd } = this.state
    return (
      <View className='login'>
        <View className='rhead'  >
        </View>
        <View className='content'>
          <Input
            type='text'
            value={phoneTem}
            className='input'
            placeholder='手机号'
            onBlur={this.verification}
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
           {/* <Input
            name='text'
            type='number'
            password={true}
            placeholder='验证码'
            value={pwd}
            className='input'
            onInput={this.handleChangePs}
          /> */}
          <View className='addtion'  > 
            
          </View>
          <Button className='button' type='primary' onClick={this.login}>注册</Button>  
        </View>
       
        <View className='tip'>©  alien提供技术服务</View>
        {/* <AtMessage /> */}
      </View>
    )
  }
}