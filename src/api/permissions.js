import request from '@/utils/request'

/**
 * 权限列表
 */
export function getPermissionsList(params) {
  return request({
    url: '/permissions',
    method: 'get',
    params
  })
}
/**
 * 权限组添加
 *
 *  */
export function postAddPermissions(data) {
  return request({
    url: '/permissions',
    method: 'POST',
    data: {
      title: data.title,
      permissions: data.permissions
    }
  })
}
/**
 * 权限组详情
 *
 */
export function getPermissionsDetail(id, params) {
  return request({
    url: `/permissions/${id}`,
    method: 'get',
    params: {
      title: params.title,
      permissions: params.permissions
    }
  })
}
/**
 * 权限组修改
 *
 */
export function putEditPermissionsDetail(id, data) {
  return request({
    url: `/permissions/${id}`,
    method: 'put',
    data: { id: data.id, title: data.title, permissions: data.permissions }
  })
}
/**
 * 权限组删除
 *
 */
export function delPermissionsDetail(id) {
  return request({
    url: `/permissions/${id}`,
    method: 'DELETE'
  })
}
