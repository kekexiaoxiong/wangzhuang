import request from '@/utils/request'

//登录
export function login(data) {
    return request({
        url: '/sysUser/login',
        method: 'post',
        data
    })
}

//获取用户详情
export function getInfo() {
    return request({
        url: '/sysUser/info',
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}


export function getList() {
    return request({

        url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

export function getList2() {

    return request({

        url: '/sysMenu/userMenuList2',
        method: 'get',
        // params: { token }
    })
}

//退出登录
export function logout() {
    return request({
        url: '/sysUser/loginOut',
        method: 'get',
    })
}



// 查询系统用户信息
export function findUserInfo(pageIndex, pageSize, username) {
    return request({
        url: '/sysUser/pageList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&username=' + username,
        method: 'get',
    })
}

//添加用户
export function addUser(data) {
    return request({
        url: '/sysUser/admin/register',
        method: 'post',
        data
    })
}

//删除用户
export function delUser(userNo) {
    return request({
        url: `/sysUser/admin/${userNo}`,
        method: 'delete',
    })
}

//刷新token
export function refreshToken(userNo) {
    return request({
        url: '/sysUser/refreshToken',
        method: 'get',
    })
}

//管理员重置密码
export function resetPassword(data) {
    return request({
        url: '/sysUser/admin/password',
        method: 'put',
        data
    })
}

//编辑用户

export function updateUser(data) {
    return request({
        url: '/sysUser/sysUser',
        method: 'put',
        data

    })
}

//查询所有部门
export function addAllDepart() {
    return request({
        url: '/sysDepartment/list',
        method: 'get',

    })
}

//分页查询所有用户角色

export function findAllRole(pageIndex, pageSize, userNo) {
    return request({
        url: '/sysUserRole/pageList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&userNo=' + userNo,
        method: 'get'
    })
}

//添加用户角色

export function addUserRole(data) {
    return request({
        url: '/sysUserRole/userRole',
        method: 'post',
        data
    })
}

// 删除用户角色
export function delUserRole(id) {
    return request({
        url: `/sysUserRole/${id}`,
        method: 'delete'
    })
}

//查询所有用户角色信息
export function getRoles(pageIndex, pageSize, roleName) {
    return request({
        url: '/sysRole/pageList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&roleName=' + roleName,
        method: 'get'
    })
}

//修改密码
export function updateUserPassword(data) {
    return request({
        url: '/sysUser/updateUserPassword',
        method: 'put',
        data
    })
}