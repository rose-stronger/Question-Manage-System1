import request from "@/utils/request";

/**
 * 企业管理列表
 */
export function getCompanyList(params) {
  return request({
    url: "/companys",
    method: "get",
    params,
  });
}
/**
 * 企业管理添加
 *
 */
export function postAddCompany(data) {
  return request({
    url: "/companys",
    method: "post",
    data,
  });
}
/**
 * 企业管理详情
 *
 */
export function getCompanyDetail(id) {
  return request({
    url: `/companys/${id}`,
    method: "get",
  });
}
/**
 * 企业管理修改
 *   province: data.province,
      company:data.company,
      province: ,
      remarks: "",
      shortName: "",
      tags: "",
      isFamous: true,
 *
 */
export function putEditCompanyDetail(id, data) {
  return request({
    url: `/companys/${id}`,
    method: "put",
    data,
  });
}

/**
 * 企业管理删除
 *
 */
export function delCompanysDetail(id) {
  return request({
    url: `/companys/${id}`,
    method: "DELETE",
  });
}
/**
 * 企业管理设置状态
 *
 */
export function setCompanysState(id, state) {
  return request({
    url: `/companys/${id}/${state}`,
    method: "POST",
  });
}
