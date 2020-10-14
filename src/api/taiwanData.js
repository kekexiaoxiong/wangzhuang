import request from '@/utils/request'

//核心数据 每日数据
export function findTwDay(gameType, channelId, target, dateTime) {
    return request({
        url: '/twData/twWhoDataByDay?gameType=' + gameType + '&channelId=' + channelId + '&target=' + target + '&dateTime=' + dateTime,
        method: 'get',
    })
}

//核心数据 每周数据
export function findTwWeek(gameType, channelId, target) {
    return request({
        url: '/twData/twWhoDataByMonth?gameType=' + gameType + '&channelId=' + channelId + '&target=' + target,
        method: 'get',
    })
}

//核心数据 每月数据
export function findTwMonth(gameType, channelId) {
    return request({
        url: '/twData/twWhoDataByWeek?gameType=' + gameType + '&channelId=' + channelId,
        method: 'get',
    })
}


//数据报表 每日报表
export function findTwReport(gameType, country, channelId, beginTime, endTime, pageIndex, pageSize) {
    return request({
        url: '/twData/twDataReport?gameType=' + gameType + '&country=' + country + '&channelId=' +
            channelId + '&beginTime=' + beginTime + '&endTime=' + endTime + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        method: 'get',
    })
}