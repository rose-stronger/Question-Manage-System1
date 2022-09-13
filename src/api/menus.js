import request from "@/utils/request";

/**
 * 菜单列表
 */
export function getMenusList(params) {
  return request({
    url: "/menus",
    method: "get",
    params,
  });
}
/**
 * 菜单添加
 *  isPoint: data.isPoint,
 * pid	integer	必须		父 id
      pid: data.pid,
      code: data.code,
      title: data.title,
 */
export function postAddMenus(data) {
  return request({
    url: "/menus",
    method: "post",
    data,
  });
}
/**
 * 菜单详情
 *
 */
export function getMenusDetail(id) {
  return request({
    url: `/menus/${id}`,
    method: "get",
  });
}
/**
 * 菜单修改
 *
 */
export function putEditMenusDetail(id, data) {
  return request({
    url: `/menus/${id}`,
    method: "put",
    data,
  });
}
/**
 * 菜单删除
 *
 */
export function delMenusDetail(id) {
  return request({
    url: `/menus/${id}`,
    method: "DELETE",
  });
}
