import myAxios from '../httpBase'

export function loginApi(data){
  return myAxios({
    url: '/myapi/cms/admin/login',
    method: 'post',
    data
  })
}