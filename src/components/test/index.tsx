import Taro , { Component  } from '@tarojs/taro'
import {  View } from '@tarojs/components'


interface IndexProps  { 
    percentage:number,
    width: number,
    lineWidth:number,
    animTime:number,
    color:string,
}
interface IndexStates {
    // width:string,
}

class Index extends Component<IndexProps,IndexStates>{
    
    constructor(props:IndexProps){
       super(props)
       this.state={
        //    width:props.width ? props.width+'rpx':'100%'  ,
       }
    }
    componentDidMount(){ 
        //  const { percentage , width , lineWidth ,color ,animTime } = this.props
         
    }
    render(){
        const { lineWidth , width  } = this.props
        const largeStyles={
            height:width+'px',
            width:width+'px',
        }
        const smallStyles={
            height:(Number(width)-2*lineWidth)+'px',
            width:(Number(width)-2*lineWidth)+'px',
        }
        return <View style={{width:"100%",height:'100%',position:'relative'}} >
                 <View className='zl_bigCircle' style={largeStyles}  ></View>
                 <View className='zl_littleCircle' style={smallStyles} ></View>
               </View>
    }
}
export default Index