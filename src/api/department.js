import request from '@/utils/request'

//添加部门
export function addDepart(data) {
    return request({
        url: '/sysDepartment/department',
        method: 'post',
        data
    })
}

//查询部门
export function findDepart(pageIndex, pageSize, departmentNo, departmentName) {

    return request({
        url: '/sysDepartment/pageList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&departmentNo=' + departmentNo + '&departmentName=' + departmentName,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

//删除部门
export function delDpart(departmentNo) {
    return request({

        url: `/sysDepartment/${departmentNo}`,
        method: 'delete',
        // params: { token }
    })
}

//修改部门
export function updateDepart(data) {
    return request({
        url: '/sysDepartment/department',
        method: 'put',
        data
    })
}