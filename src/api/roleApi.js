import request from '@/utils/request'

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
        url: `/sysRoleApi/roleApi/${roleNo}`,
        method: 'get',
        data
    })
}