import request from '@/utils/request'

//新增活动公告配置
export function addActivityHorn(data) {
    return request({
        url: '/gameConfig/activityHorn',
        method: 'post',
        data
    })
}

//修改活动公告配置
export function updateActivityHorn(data) {
    return request({
        url: '/gameConfig/activityHorn',
        method: 'put',
        data
    })
}

//分页查询活动公告配置
export function findActivityHorn() {
    return request({
        url: '/gameConfig/activityHorn',
        method: 'get',

    })
}

//删除活动公告配置
export function deleteActivityHorn(unionId) {
    return request({
        url: `/gameConfig/activityHorn/${unionId}`,
        method: 'DELETE',
    })
}


// 查询免费岛屿配置
export function findFreeCheckpoint() {
    return request({
        url: '/gameConfig/freeCheckpoint',
        method: 'get',

    })
}

//新增免费岛屿配置
export function addFreeCheckpoint(data) {
    return request({
        url: '/gameConfig/freeCheckpoint',
        method: 'post',
        data
    })
}

//修改免费岛屿配置
export function updateFreeCheckpoint(data) {
    return request({
        url: '/gameConfig/freeCheckpoint',
        method: 'put',
        data
    })
}


//删除免费岛屿配置
export function deleteFreeCheckpoint(checkPoint) {
    return request({
        url: `/gameConfig/freeCheckpoint/${checkPoint}`,
        method: 'DELETE',
    })
}

// 分页查询公告配置
export function findNotice() {
    return request({
        url: '/gameConfig/notice',
        method: 'get',

    })
}


//新增公告配置
export function addNotice(data) {
    return request({
        url: '/gameConfig/notice',
        method: 'post',
        data
    })
}


//修改公告配置
export function updateNotice(data) {
    return request({
        url: '/gameConfig/notice',
        method: 'put',
        data
    })
}


//删除公告配置
export function deleteNotice(checkPoint) {
    return request({
        url: `/gameConfig/notice/${cId}`,
        method: 'DELETE',
    })
}

// 分页查询系统活动公告配置
export function findSystemHorn() {
    return request({
        url: '/gameConfig/systemHorn',
        method: 'get',
    })
}

//新增系统活动公告配置
export function addSystemHorn(data) {
    return request({
        url: '/gameConfig/systemHorn',
        method: 'post',
        data
    })
}

//修改系统活动公告配置
export function updateSystemHorn(data) {
    return request({
        url: '/gameConfig/systemHorn',
        method: 'put',
        data
    })
}

//删除系统活动公告配置
export function deleteSystemHorn(unionId) {
    return request({
        url: `/gameConfig/systemHorn/${unionId}`,
        method: 'DELETE',
    })
}


// 分页查询配置管理 限时活动配置
export function findTimeLimit() {
    return request({
        url: '/gameConfig/timeLimit',
        method: 'get',
    })
}


//修改限时活动配置
export function updateTimeLimit(data) {
    return request({
        url: '/gameConfig/timeLimit',
        method: 'put',
        data
    })
}


// 查询代币配置
export function findTokenConfig() {
    return request({
        url: '/gameConfig/tokenConfig',
        method: 'get',
    })
}


//新增代币配置
export function addTokenConfig(data) {
    return request({
        url: '/gameConfig/tokenConfig',
        method: 'post',
        data
    })
}

//修改代币配置
export function updateTokenConfig(data) {
    return request({
        url: '/gameConfig/tokenConfig',
        method: 'put',
        data
    })
}


//删除代币配置
export function deleteTokenConfig(cId) {
    return request({
        url: `/gameConfig/tokenConfig/${cId}`,
        method: 'DELETE',
    })
}


// 分页查询紧急公告配置
export function findUrgencyHorn() {
    return request({
        url: '/gameConfig/urgencyHorn',
        method: 'get',
    })
}

//新增紧急公告配置
export function addUrgencyHorn(data) {
    return request({
        url: '/gameConfig/urgencyHorn',
        method: 'post',
        data
    })
}


//修改紧急公告配置
export function updateUrgencyHorn(data) {
    return request({
        url: '/gameConfig/urgencyHorn',
        method: 'put',
        data
    })
}

//删除紧急公告配置
export function deleteUrgencyHorn(unionId) {
    return request({
        url: `/gameConfig/urgencyHorn/${unionId}`,
        method: 'DELETE',
    })
}