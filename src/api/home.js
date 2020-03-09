import axios from 'axios'
import jsonp from 'assets/js/jsonp'
import { SUCC_CODE,TIMEOUT,HOME_RECOMMEND_PAGE_SIZE,jsonpOptions } from './config'

// 获取首页轮播图
export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider',{
    timeout : TIMEOUT
  }).then(res =>{
    // console.log(res);
    if(res.data.code === SUCC_CODE){
      return res.data.slider;
    }

    throw new Error('没有成功找到数据');
  }).catch(err =>{
    if(err) {
      console.log(err)
    }
    return [
      {
        linkUrl: 'https://www.imooc.com',
        picUrl: require('assets/img/404.png')
      }
    ]
  }).then( res => {
    // 此处then为 手动设置获取数据时间
    return new Promise( resolve =>{
      setTimeout( () =>{
        resolve(res)
      },1000)
    })
  })
}

// 通过jsonp发送请求
export const getHomeRecommend = ( page = 1, psize = HOME_RECOMMEND_PAGE_SIZE )=>{
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    psize,
    type: 0,
    frontCatId :''
  };

  return jsonp(url ,params ,jsonpOptions).then( res => {
    // console.log(res)
    if(res.code === '200' ){
      return res;
    }

    // 手动抛出错误
    throw new Error('没有获取到数据')
  }).catch( err => {
    // 将错误内容打印出来
    if(err) {
      console.log(err)
    }
  }).then( res => {
    // 此处then为手动延迟数据获取
    return new Promise( resolve => {
      setTimeout(()=>{
        resolve(res)
      },1000)
    })
    // console.log(data)
  })
}