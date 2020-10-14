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

export function findList(pageIndex, pageSize, apiNo, apiName, apiMethod) {
    return request({
        url: '/sysApi/pageList?',
        method: 'get',

    })
}

//查询所有api
export function findAllApi(apiNo, apiName, apiMethod, groupName) {
    console.log(26)
    return request({
        url: '/sysApi/list?apiNo=' + apiNo + '&apiName=' + apiName + '&apiMethod' + apiMethod + '&groupName=' + groupName,
        method: 'get',
    })
}


export function deleteApi(id) {
    return request({
        url: `/sysApi/${id}`,
        method: 'DELETE',
    })
}


export function getList(params) {
    return request({
        url: '/vue-admin-template/table/list',
        method: 'get',
        params
    })
}