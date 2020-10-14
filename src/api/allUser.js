import request from '@/utils/request'


// 查询系统用户信息
export function findUserInfo(pageIndex, pageSize, username) {

    return request({
        url: '/sysUser/pageList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&username=' + username,
        method: 'get',
    })
}

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

export function logout() {
    return request({
        url: '/sysUser/loginOut',
        method: 'get',
    })
}