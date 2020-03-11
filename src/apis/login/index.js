import myAxios from '../httpBase'

export function loginApi(data){
  return myAxios({
    url: '/cms/admin/login',
    method: 'post',
    data
    // 除了基本的token 有些接口需要额外的标识
    // headers: {
    //   'App-version': 1
    // }
  })
}