import request from '@/utils/request'

//分页查询部门用户
export function findDepartUser(pageIndex, pageSize, departmentNo) {
    return request({
        url: '/sysDepartmentUser/pageList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&departmentNo=' + departmentNo,
        method: 'get',

    })
}


//添加部门用户
export function addDepartUser(data) {
    return request({
        url: '/sysDepartmentUser/departmentUser',
        method: 'post',
        data
    })
}

//删除部门用户
export function delDepartUser(id) {
    return request({
        url: `/sysDepartmentUser/${id}`,
        method: 'delete',
    })
}


// 查询系统用户信息
export function findUserInfo(pageIndex, pageSize, username) {
    return request({
        url: '/sysUser/pageList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&username=' + username,
        method: 'get',
    })
}