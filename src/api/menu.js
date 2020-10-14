import request from '@/utils/request'

export function findAllMenu(data) {
    return request({
        url: '/sysMenu/allMenus',
        method: 'get',
        data
    })
}



export function updateMenu(data) {
    return request({
        url: '/sysMenu/menu',
        method: 'put',
        data
    })
}

//添加菜单
export function addNewMenu(data) {
    return request({
        url: '/sysMenu/menu',
        method: 'post',
        data
    })
}

//删除菜单
export function deleteMenu(id) {
    return request({
        url: `/sysMenu/${id}`,
        method: 'DELETE',
    })
}

//系统菜单api管理

//配置菜单api
export function apiMenu(data) {
    return request({
        url: '/sysMenuApi/menuApi',
        method: 'put',
        data
    })
}

//查询菜单api
export function findApiMenu(menuId) {
    return request({
        url: `/sysMenuApi/menuApi/${menuId}`,
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