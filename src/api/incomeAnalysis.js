import request from '@/utils/request'

//付费习惯--充值频次和额度
export function findPayHobitQuota(gameType, channelId, deviceType, type, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/chargeData?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&type=' + type + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

//付费习惯--充值间隔
export function findPayHobitInterval(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/chargeInterval?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

//付费习惯--查询充值总金额
export function findPayHobitTotal(data) {
    return request({
        url: '/incomeAnalysis/chargeMoneyTotal?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

//收入数据--查询收入数据折线图数据
export function findIncomeData(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/incomeData?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

//新玩家价值--新玩家收入贡献
export function findNewPlayerContribution(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/newPlayerContribution?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}


//新玩家价值--各渠道新玩家价值
export function findNewPlayerChannel(gameType, channelId, deviceType, type, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/newPlayerValueChannel?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&type=' + type + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}


//新玩家价值--各地区新玩家价值
export function findNewPlayerCountry(gameType, channelId, deviceType, type, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/newPlayerValueCountry?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&type=' + type + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

//付费习惯--消费包类型
export function findConsumeType(gameType, channelId, deviceType, type, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/payHabitsChargeType?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&type=' + type + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}


//付费习惯--充值方式
export function findPayType(gameType, channelId, deviceType, type, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/payHabitsPayType?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&type=' + type + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}


//付费渗透--付费率
export function findPayInfiltration(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/payInfiltration?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

//收入数据--各渠道收入
export function findIncomeChannel(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/playerReChargeChannel?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}


//收入数据--各地区收入
export function findIncomeCountry(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/playerReChargeCountry?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}


//收入数据--收入金额等级
export function findIncomeLevel(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/playerReChargeLevel?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

//付费渗透--各渠道付费渗透
export function findChannelsPayPenetration(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/playerReChargePenetrationChannel?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

//付费渗透--各地区付费渗透
export function findCountryPayPenetration(gameType, channelId, deviceType, beginTime, endTime) {
    return request({
        url: '/incomeAnalysis/playerReChargePenetrationCountry?gameType=' + gameType + '&channelId=' + channelId + '&deviceType=' +
            deviceType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}