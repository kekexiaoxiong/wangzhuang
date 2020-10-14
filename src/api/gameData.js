import request from '@/utils/request'


// 分页查询管卡监控
export function findCheckPoint(pageIndex, pageSize, checkPoint, beginTime, endTime) {

    return request({
        url: '/gameData/checkPointMonitoring?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&checkPoint=' + checkPoint + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

// 查询管卡库存变化
export function findCheckpointChange(pageIndex, pageSize, timeType, inventoryType) {
    return request({
        url: '/gameData/checkpointChange?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&timeType=' + timeType + '&inventoryType=' + inventoryType,
        method: 'get',
    })
}

// 分页查询经济概况--砖石概况
export function findDiamondSurvey(pageIndex, pageSize, beginTime, endTime) {
    return request({

        url: '/gameData/diamondSurvey?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}
// 分页查询定时金币监控
export function findFixedTimeMonitoring(pageIndex, pageSize, beginTime, endTime) {
    return request({
        url: '/gameData/fixedTimeMonitoring?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}
// 分页查询经济概况--金币概况
export function findGoldSurvey(pageIndex, pageSize, beginTime, endTime) {
    return request({
        url: '/gameData/goldSurvey?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}
// 分页查询经济概况--金币/砖石/代币持有量
export function findHoldings(pageIndex, pageSize, dateTime, type) {

    return request({
        url: '/gameData/holdings?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&dateTime=' + dateTime + '&endTime=' + type,
        method: 'get',
    })
}
// 分页查询玩家关卡监控
export function findPlayerCheckPointMonitoring(pageIndex, pageSize, checkPoint, rid, platformType, beginTime, endTime) {
    return request({
        url: '/gameData/playerCheckPointMonitoring?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&checkPoint=' + checkPoint +
            '&rid=' + rid + '&platformType=' + platformType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

// 分页查询玩家每日经济概况
export function findPlayerEconomyGold(pageIndex, pageSize, sortType, startGold, endGold) {
    return request({
        url: '/gameData/playerEconomyGold?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&sortType=' + sortType +
            '&startGold=' + startGold + '&endGold=' + endGold,
        method: 'get',
    })
}

// 分页查询玩家游戏日志 玩家管卡监控详情
export function findPlayerGameLog(pageIndex, pageSize, checkPoint, rid, beginTime, endTime) {
    return request({
        url: '/gameData/playerGameLog?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&checkPoint=' + checkPoint + '&rid=' + rid + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

// 分页查询玩家登录日志详情
export function findPlayerLoginInfo(pageIndex, pageSize, rid, dateTime) {
    return request({
        url: '/gameData/playerLoginInfo?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&rid=' + rid + '&dateTime=' + dateTime,
        method: 'get',
    })
}

// 分页查询玩家登录日志
export function findPlayerLoginLog(pageIndex, pageSize, rid, platformType, beginTime, endTime) {
    return request({
        url: '/gameData/playerLoginLog?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&rid=' + rid + '&platformType=' + platformType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

// 分页查询玩家监控
export function findRoleMonitoring(pageIndex, pageSize, rid, nick, beginTime, endTime) {
    return request({
        url: '/gameData/roleMonitoring?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&rid=' + rid + '&nick=' + nick + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

// 分页查询经济概况--代币概况
export function findTokenSurvey(pageIndex, pageSize, beginTime, endTime) {
    return request({
        url: '/gameData/tokenSurvey?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}