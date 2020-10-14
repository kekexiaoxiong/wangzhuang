import request from '@/utils/request'


//查询新增玩家数据
export function findNewPlayer(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/newPlayerList?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询活跃玩家渠道数据
export function findPlayerActiveChannel(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/playerActiveChannelData?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询活跃玩家地区数据
export function findPlayerActiveCountry(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/playerActiveCountryData?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询活跃玩家折线图数据
export function findPlayerActive(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/playerActiveData?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询活跃玩家已玩天数数据
export function findPlayerActiveDay(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/playerActiveDayData?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询活跃玩家等级数据
export function findPlayerActiveLevel(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/playerActiveLevelData?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询活跃玩家合计数据
export function findPlayerActiveTotal(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/playerActiveTotalData?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询新账户留存折线图
export function findAccountRemain(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/accountRemain?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询留存用户分析
export function findRemainPlayerAnalyze(gameType, channelId, deviceType, groupType, analyzeType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/remainPlayerAnalyze?gameType=` + gameType + '&channelId=' + channelId +
            '&deviceType=' + deviceType + '&groupType=' + groupType + '&analyzeType=' + analyzeType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询平均留存玩家数据
export function findRemainPlayerAver(gameType, channelId, deviceType, beginTime, endTime) {

    return request({
        url: `/gamePlayer/remainPlayerAver?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询付费转化折线数据
export function findChargeConversion(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/chargeConversion?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询付费转化合计数据
export function findChargeConversionTotal(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/chargeConversionTotal?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询付费转化充值包类型
export function findFirstChargeByChargeType(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/firstChargeByChargeType?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询付费转化首付金额
export function findFirstChargeMoney(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/firstChargeMoneyType?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询付费转化游戏天数
export function findFirstChargePlayDay(gameType, channelId, deviceType, beginTime, endTime) {

    return request({
        url: `/gamePlayer/firstChargePlayDay?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询付费转化首付玩家等级
export function findFirstChargePlayerLevel(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/firstChargePlayerLevel?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}


//查询玩家流失 - 流失与回流折线图
export function findPlayerLossAndReturnListl(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/playerLossAndReturnList?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' + deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询玩家流失 - 玩家回流分析
export function findPlayerLossDataLis(gameType, channelId, deviceType, lossType, chargeType, analyzeType, beginTime, endTime) {
    return request({
        url: `/gamePlayer/playerLossDataLis?gameType=` + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&lossType=' + lossType + '&chargeType=' + chargeType + '&analyzeType=' + analyzeType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//查询游戏习惯