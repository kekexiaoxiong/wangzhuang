import request from '@/utils/request'

//添加部门角色
export function addDepartRole(data) {

    return request({
        url: '/sysDepartmentRole/departmentRole',
        method: 'post',
        data
    })
}

//查询部门角色
export function findDepartRole() {
    return request({
        url: '/sysDepartmentRole/pageList',
        method: 'get',

    })
}

//删除部门角色
export function delDepartRole(id) {

    return request({
        url: `/sysDepartmentRole/${id}`,
        method: 'delete',

    })
}

//查询所有角色信息
export function getRoles(pageIndex, pageSize, departmentNo) {
    return request({
        url: '/sysRole/pageList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&departmentNo=' + departmentNo,
        method: 'get'
    })
}