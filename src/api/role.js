import request from '@/utils/request'

export function getRoutes() {
    return request({
        url: '/vue-element-admin/routes',
        method: 'get'
    })
}

export function getRoles(pageIndex, pageSize, roleName) {
    return request({
        url: '/sysRole/pageList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&roleName=' + roleName,
        method: 'get'
    })
}

export function addRole(data) {

    return request({
        url: '/sysRole/role',
        method: 'post',
        data
    })
}

export function updateRole(data) {
    return request({
        url: `/sysRole/role`,
        method: 'put',
        data
    })
}

export function deleteRole(id) {
    return request({
        url: `/sysRole/${id}`,
        method: 'delete'
    })
}


//配置角色api
export function configureRoleApi(data) {
    return request({
        url: '/sysRoleApi/roleApi',
        method: 'put',
        data
    })
}

//查询角色api
export function findApiList(roleNo) {
    return request({
        url: '/sysRoleApi/roleApi/' + roleNo,
        method: 'get',
    })
}

//查询所有api
export function findAllApi(data) {

    return request({
        url: '/sysApi/list',
        method: 'get',
        data
    })
}

//提交保存的角色api
export function submitApi(data) {

    return request({
        url: '/sysRoleApi/roleApi',
        method: 'put',
        data
    })
}

//查询所有菜单

export function findMeun() {

    return request({
        url: '/sysMenu/allMenus',
        method: 'get',

    })
}

//查询角色菜单


export function findRoleMeun(data) {

    return request({
        url: '/sysRoleMenu/list?roleNo=' + data,
        method: 'get',
    })
}

//提交保存的菜单api
export function submitMeunApi(data) {

    return request({
        url: '/sysRoleMenu/roleMenu',
        method: 'put',
        data
    })
}

//添加角色菜单
export function addRoleMeun(data) {

    return request({
        url: '/sysRoleMenu/sysRoleMenu',
        method: 'post',
        data
    })
}