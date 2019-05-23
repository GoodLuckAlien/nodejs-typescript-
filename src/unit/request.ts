import Taro from "@tarojs/taro"


const url : string = 'http://local.beautfull.zhaolin:8080/'

/**
 * 请求方法
 * @param {Object} object 参数
 * @param {String} object.url 接口地址
 * @param {String} object.method 接口类型
 * @param {Object} object.data 接口请求数据
 */
interface urlObject {
    url:string
    method:string
    data:object
}


function request ( object:urlObject  , callback : Function  ){
    //获取token
    const token = Taro.getStorageSync('token')
    const baseUrl :string = url + object.url 

    const data : any= Object.assign({
       method:'GET',
       header: {
        Authorization: token || ""
       },
       data:{},
       url:'',
    },{
        ...object,
        url:baseUrl,
    })
    /**
   * 接口返回code判断集合
   * @param {String} code 接口返回的code
   * @param {Object} data 接口返回数据
   */
    const checkRequestStatus = function( code:string , data:any ){
         if(code==='0'){
             callback(data)
         }else{
             console.log(data)
             Taro.showToast({
                title: data.content || "接口错误",
                icon: "none",
                mask: true,
                duration: 1500,
             })
         }
    }
    Taro.request(data).then(res=>{
        let { statusCode, data } = res
        /**
         * 浏览器http请求code是否正确
         */
        if (statusCode >= 200 && statusCode < 300) {
           checkRequestStatus(data.code, data);
        } else {
          throw new Error(`网络请求错误，状态码${statusCode}`);
        }
    })

}
export default request