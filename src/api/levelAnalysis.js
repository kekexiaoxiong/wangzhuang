import request from '@/utils/request'


//查询等级详解--等级详情
export function findLevDetail(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/levelDistribution/playerKeyLevelInfo?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType +
            '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询等级详解--按日趋势
export function findTrend(gameType, channelId, deviceType, level, beginTime, endTime) {
    return request({
        url: '/levelDistribution/playerKeyLevelUpData?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&level=' + level +
            '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}


//查询等级详解--升级时长
export function findLevDuration(gameType, channelId, deviceType, level, beginTime, endTime) {
    return request({
        url: '/levelDistribution/playerKeyLevelUpTime?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&level=' + level +
            '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询等级详解--关键等级
export function findLevKey(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/levelDistribution/playerKeyLevels?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType +
            '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//玩家等级分布--玩家等级分布
export function findLevSpread(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/levelDistribution/playerLevelDistribution?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType +
            '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//玩家等级分布--流失玩家停留等级
export function findLevStop(gameType, channelId, deviceType, type, beginTime, endTime) {
    return request({
        url: '/levelDistribution/playerLevelDistributionLossCount?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&type=' + type +
            '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}


//玩家等级分布--游戏次数等级分布
export function findLevTimes(gameType, channelId, deviceType, type, beginTime, endTime) {
    return request({
        url: '/levelDistribution/playerLevelDistributionPlayerCount?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&type=' + type +
            '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//新玩家进度--新玩家等级
export function findLevNewPlayer(gameType, channelId, deviceType, type, beginTime, endTime) {
    return request({
        url: '/levelDistribution/playerLevelSchedule?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&type=' + type +
            '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}


//新玩家等级--7日内等级变迁
export function findLevWeekChange(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/levelDistribution/playerLevelWeekChange?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType +
            '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}