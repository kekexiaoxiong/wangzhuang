import request from '@/utils/request'


//查询游戏概况线图数据
export function findLineGraph(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/generalSituation/gameGeneralSituationLine?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询游戏概况合计数据
export function findTotleData(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/generalSituation/gameGeneralSituationTotal?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}