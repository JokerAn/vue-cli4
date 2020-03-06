import myAxios from '../httpBase'

export function loginApi(data){
  return myAxios({
    url: '/shiro-api/login',
    method: 'post',
    data
  })
}