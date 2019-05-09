import Taro from '@tarojs/taro'

interface progressBarType{
    width:number,        //宽度
    height:number,       //高度
    percentage:number,//必填参数
    animTime:number,     //动画时间
    color:string,     //颜色
    lineWidth:number,
}
/**
 * 构造函数
 * @param progressBar //can
 * @constructor
 * @author zhaolin
 */
function progress(progressBar:progressBarType){
   this.width=progressBar.width
   this.height=progressBar.height
   this.percentage=progressBar.percentage
   this.animTime=progressBar.animTime
   this.color=progressBar.color
   this.lineWidth=progressBar.lineWidth
}
/**
 * 绘图功能
 * @param percentage //起始百分比
 * @param width      //宽度
 * @param height     //高度
 */
progress.prototype.run=function(percentage:number,width:number,height:number,color:string){
    var num = (2 * Math.PI / 100 * percentage) - 0.5 * Math.PI;
    this.ctx2.beginPath();
    this.ctx2.arc(width, height, width-this.lineWidth/2,-0.5*Math.PI,num ); //每个间隔绘制的弧度
    this.ctx2.setStrokeStyle(color);
    this.ctx2.setLineWidth(this.lineWidth);
    this.ctx2.setLineCap("round");
    this.ctx2.stroke();
    this.ctx2.setFontSize(40*(width/210)); 
    this.ctx2.setFillStyle(color);
    this.ctx2.setTextAlign("center");
    this.ctx2.setTextBaseline("middle");
    this.ctx2.fillText(percentage + "%", width, height);
    this.ctx2.draw();
}
/**
 * 动画效果
 * @param time       //时间间隔
 * @param width      //宽度
 * @param height     //高度
 * @param start      //其实百分比
 * @param end        //结束百分比
 */
progress.prototype.animate=function(start:number, end:number, time:number, width:number, height:number){
        start++;
        if (start > end) {
            return false;
        }
        if(this.timer) clearTimeout(this.timer)
        this.run(start, width, height,this.color);
        this.timer =setTimeout( ()=> {
            this.animate(start, end, time, width, height);
          }, time);
}
interface RectType{
    width:number
    height:number
}
progress.prototype.draw=function(ctx2:any){
    //由于
    this.ctx2=ctx2  
    var time = this.animTime / this.percentage;
       if(!this.width||!this.height){   
        Taro.createSelectorQuery().select('#'+ctx2).boundingClientRect(function (rect:RectType) { 
            var w = Math.ceil(rect.width / 2); 
            var h = Math.ceil(rect.height / 2); 
            this.animate(0, this.percentage, time, w, h)
          }).exec();
       }else{
        this.animate(0, this.percentage, time, this.width, this.height)
       }
}
export default progress
