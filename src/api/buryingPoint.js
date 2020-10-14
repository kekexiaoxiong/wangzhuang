import request from '@/utils/request'

//查询埋点数据验证
export function findDataCheck(rid, buryingType, beginTime, endTime, pageIndex, pageSize) {
    return request({
        url: '/buried/buriedCheckData?rid=' + rid + "&beginTime=" + beginTime + "&endTime=" + endTime + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        method: 'get',

    })
}

//查询机台详情
export function findMachineDetail(country, channelId, type, beginTime, endTime) {

    return request({
        url: '/buried/checkpointRemain?country=' + country + "&channelId=" + channelId + "&type=" + type + "&beginTime=" + beginTime + "&endTime=" + endTime,
        method: 'get',

    })
}

//客户反馈数据
export function findFeedbackData(country, channelId, beginTime, endTime) {

    return request({
        url: '/buried/feedBackData?country=' + country + "&channelId=" + channelId + "&beginTime=" + beginTime + "&endTime=" + endTime,
        method: 'get',

    })
}

//埋点 --FreeCoin&FLOP RESET数据
export function findRestData(country, channelId, beginTime, endTime) {

    return request({
        url: '/buried/freeCoinAndFlopResetData?country=' + country + "&channelId=" + channelId + "&beginTime=" + beginTime + "&endTime=" + endTime,
        method: 'get',
    })
}

//查询管卡破产数据
export function findGobrokeData(country, channelId, type, beginTime, endTime) {

    return request({
        url: '/buried/goBrokeData?country=' + country + "&channelId=" + channelId + "&type=" + type + "&beginTime=" + beginTime + "&endTime=" + endTime,
        method: 'get',

    })
}

//查询玩家行为记录
export function findMaBehaviour(rid, buriedType, type, beginTime, endTime, pageIndex, pageSize) {

    return request({
        url: '/buried/playerBehaviour?rid=' + rid + "&buriedType=" + buriedType + "&type=" + type + "&beginTime=" +
            beginTime + "&endTime=" + endTime + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        method: 'get',

    })
}

//查询等级留存
export function findLevelRemain(country, channelId, type, beginTime, endTime) {

    return request({
        url: '/buried/playerLevelRemain?country=' + country + "&channelId=" + channelId + "&type=" + type + "&beginTime=" + beginTime + "&endTime=" + endTime,
        method: 'get',

    })
}

//查询成就系统数据
export function findQuestData(country, channelId, type, beginTime, endTime) {

    return request({
        url: '/buried/questData?country=' + country + "&channelId=" + channelId + "&type=" + type + "&beginTime=" + beginTime + "&endTime=" + endTime,
        method: 'get',

    })
}

//查询系统点击使用率
export function findButtonData(country, channelId, type, beginTime, endTime) {

    return request({
        url: '/buried/systemButtonData?country=' + country + "&channelId=" + channelId + "&type=" + type + "&beginTime=" + beginTime + "&endTime=" + endTime,
        method: 'get',

    })
}