import Taro , { Component  } from '@tarojs/taro'
import {  View  , Image ,Canvas  } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
// 微信授权页面 
import './style.less'
// import img1 from './img/1.jpg'
import img2 from './img/2.jpg'
import img3 from './img/3.jpg'

interface IndexStates {
    width:number,
    height:number,
}

interface Index {
    imgOnLoadCount : number //记录加载图片得数量
    defaultWidth : number // 屏幕默认宽度

}

class Index extends Component<{},IndexStates>{
    
    constructor(props:object){
       super(props)
       this.state={
          height:0,
          width:0,
       }
       this.imgOnLoadCount = 0
       this.defaultWidth = 375
    }
    componentDidMount(){ 
    }
    ImgLoad=()=>{
    //   return false
      const { imgOnLoadCount  } = this
      this.imgOnLoadCount= imgOnLoadCount+1  
      if(this.imgOnLoadCount === 3 ){
          //图片初始化处理 获取
          let PromiseA = new Promise((resolve,reject)=>{
            Taro.getSystemInfo({
                success:(res:any)=>{
                    resolve(res.screenWidth)
                  },
                  fail:()=>{
                    reject()
                  },
             })
          })
          PromiseA.then((res:number)=>{
             this.defaultWidth = res
             this.getCanvasHeight((res:number)=>{
                  this.initDraw(res)
             })
          },()=>{
             this.getCanvasHeight((res:number)=>{
                this.initDraw(res)
             })
          })
      }
    }
    initDraw=(height:number)=>{
        const { defaultWidth } = this 
        console.log(defaultWidth,height)
        // Taro.getImageInfo({
        //     src: './img/1.jpg',
        //     success :  function(res){
        //         console.log(res)
        //     },
        // })   
        this.setState({
            width:defaultWidth,
            height,
        },()=>{
                let canvas = Taro.createCanvasContext('composeImg',this.$scope)  
                canvas.setFillStyle('#fff')    //这里是绘制白底，让图片有白色的背景
                canvas.fillRect(0, 0, defaultWidth, height)
                canvas.drawImage('http://static.gytcrm.com/BosscardShopMini/car_bg.png',0,0,defaultWidth,height/3)
                canvas.drawImage('./img/2.jpg',0,height/3,defaultWidth,height/3)
                canvas.drawImage('./img/3.jpg',0,height*2/3,defaultWidth,height/3)
                canvas.draw(true,()=>{
                    this.saveComposeImg(height)
                })        
        })
    }
    saveComposeImg=(height:number)=>{
        const { defaultWidth } = this 
        Taro.canvasToTempFilePath({
            x:0,
            y:0,
            height,
            width:defaultWidth,
            canvasId:'composeImg',
            success:function(e){
                Taro.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                  })
            }
        })
    }
    getCanvasHeight=(callback:Function)=>{
        // 动态获取父容器高度
       Taro.createSelectorQuery().selectAll('.imgs').boundingClientRect((res:any)=>{
                let height :number = 0
                console.log(res)
                res.forEach((i:any)=>{
                    height = i.height+height
                })
                callback(height)
        }).exec()
    }
    render(){
        const { height , width } = this.state
        return <View className='box'  style={{width:"100%"}} >
                  <Image className='imgs' src={'http://static.gytcrm.com/BosscardShopMini/car_bg.png'} onLoad={this.ImgLoad} />
                  <Image className='imgs' src={img2} onLoad={this.ImgLoad} />
                  <Image className='imgs' src={img3} onLoad={this.ImgLoad} />
                  <Canvas  style={{ height: height +'px' ,width: width + 'px'  }}  className='canvas'  canvasId='composeImg'  />
               </View>
    }
}
export default Index