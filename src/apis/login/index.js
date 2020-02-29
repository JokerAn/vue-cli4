import myAxios from '../httpBase'

export function loginApi(data){
  return myAxios({
    url: '/cms/admin/login',
    method: 'post',
    data
  })
}
export function localFileApi(data){
  return myAxios({
    url: '/assets/test-json/index.json',
    method: 'get'
  })
}