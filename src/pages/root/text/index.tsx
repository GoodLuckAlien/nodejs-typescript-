import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../../actions/counter'
import Pro from '../../../components/progressBar'
import './style.less'


type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatch = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
  dispatch:(a:object)=>void
}

type PageOwnProps = {}

type PageState = {
  haha:object,
  percentage:number
}

type IProps = PageStateProps & PageDispatch & PageOwnProps

interface Index {
  props: IProps
  state:PageState
}

@connect(({ counter }) => ({
  counter
}))
class Index extends Component {
    config: Config = {
    navigationBarTitleText: '记事本'
  }
  constructor(prop){
    super(prop)
    this.state={
      haha:{},
      percentage:48,
    }
  }
  
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    console.log(this.props)
  }
  componentDidHide () { }
  add=()=>{
    const { dispatch } = this.props
    dispatch(add())
  }
  dec=()=>{
    let { percentage  } = this.state
    percentage++
    this.setState({
      percentage,
    })
  }
  asyncAdd=()=>{
    Taro.navigateTo({
      url:'pages/business/my/index'
    })
  }

  render () {
    const { percentage } = this.state
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.add}>+</Button>
        <Button className='dec_btn' onClick={this.dec}>-</Button>
        <Button className='dec_btn' onClick={this.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View style={{width:'400px',height:'400px'}}  >
          <Pro 
           percentage={percentage}
           width={50} 
           lineWidth={4} 
           color={'#58bc58'} 
           animTime={300}   />
           <Pro 
           percentage={percentage-5}
           width={200} 
           lineWidth={7} 
           color={'red'} 
           animTime={300}   />
         </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
