import request from '@/utils/request'

export function addApi(data) {
    return request({
        url: '/sysApi/api',
        method: 'post',
        data
    })
}

export function updateApi(data) {
    return request({
        url: '/sysApi/api',
        method: 'put',
        data
    })
}

export function findList(data) {
    return request({
        url: '/sysApi/pageList',
        method: 'get',
        data
    })
}

export function deleteApi(id) {
    return request({
        url: `/sysApi/${id}`,
        method: 'DELETE',
    })
}