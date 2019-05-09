import Taro , { Component  } from '@tarojs/taro'
import { Canvas , View } from '@tarojs/components'
import progressBar from './progressBar'
import './style.less'

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
type propsObject = IndexProps

class Index extends Component<IndexProps,IndexStates>{
    
    constructor(props:IndexProps){
       super(props)
       this.state={
        //    width:props.width ? props.width+'rpx':'100%'  ,
       }
    }
    draw(o:propsObject){
        const { width,color,percentage,animTime,lineWidth } = o
        let progress = new progressBar({ width:width/2,height:width/2,color,percentage,animTime,lineWidth})
        //taro.createCanvasContext方法必须传入组件类实例化this ,所以需要对组件ID方法抛出单独处理
        const ctx2=Taro.createCanvasContext('canvass',this.$scope)
        console.log(ctx2)
        progress.draw(ctx2)   
       
    }
    componentDidMount(){ 
         const { percentage , width , lineWidth ,color ,animTime } = this.props
         this.draw({ percentage , width , lineWidth ,color ,animTime })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps!==this.props){
            this.draw(nextProps)
        }
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
                 <Canvas  style={largeStyles}  canvasId='canvass' id="canvas" className='zl_canvas'  ></Canvas>
               </View>
    }
}
export default Index