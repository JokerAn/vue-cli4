import myAxios from '../../httpBase'

// 获取某一个校区详情
export function getOrgInfoApi(id){
  return myAxios({
    url: '/myapi/cms/orgCampus/getById?id=' + id,
    method: 'get'
  })
}