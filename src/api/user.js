import request from "@/utils/request";

/**
 *登录
 */
export function userlogin(data) {
  return request({
    url: "/frame/login",
    method: "POST",
    data,
  });
}



/**
 * 用户资料
 */
 export function userInformation() {
  return request({
    url: '/frame/profile',
    method: 'POST',

  })
}



/**
 *
 * 用户列表
 */
export function getUserList(params) {
  return request({
    url: "/users",
    method: "get",
    params,
  })


}
/**
 *
 * 用户添加
 */
export function postAddUser(data) {
  return request({
    url: "/users",
    method: "post",
    data,
  });
}
/**
 *
 * 用户详情
 */
export function getUserDetail(id) {
  return request({
    url: `/users/${id}`,
    method: "get",
  });
}
/**
 *
 * 用户修改
 */
export function putUserEdit(id, data) {
  return request({
    url: `/users/${id}`,
    method: "PUT",
    data: {
      avatar: data.avatar,
      email: data.email,
      id: data.id,
      introduction: data.introduction,
      permission_group_id: data.permission_group_id,
      phone: data.phone,
      role: data.role,
      username: data.username,
    },
  });
}
/**
 *
 * 用户删除
 */
export function DelUser(id) {
  return request({
    url: `/users/${id}`,
    method: "DELETE",
  });
}

// export function postRegister(data) {
//   return request({
//     url:'/frame/register',
//     method:'POST',
//     data
//   })
// }

export function getInfo(token) {
  return request({
    url: "/vue-admin-template/user/info",
    method: "get",
    params: { token },
  });
}

// export function logout() {
//   return request({
//     url: "/vue-admin-template/user/logout",
//     method: "post",
//   });
// })
