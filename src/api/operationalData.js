import request from '@/utils/request'

//分页查询玩家留存
export function findPlayerRatain(pageIndex, pageSize, gameType, country, channelId, beginTime, endTime) {
    return request({
        url: '/operationalData/PlayerRetainData?pageIndex=' + pageIndex + '&pageSize=' + pageSize +
            '&gameType=' + gameType + '&country=' + country + '&channelId=' + channelId + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

//分页查询成就系统
export function findAchievement(pageIndex, pageSize, rid, achievementType) {
    return request({
        url: '/operationalData/achievement?pageIndex' + pageIndex + '&pageSize=' + pageSize + '&rid=' + rid + '&achievementType=' + achievementType,
        method: 'get',

    })
}

// 分页查询充值排行
export function findChargeRank(pageIndex, pageSize, rid, nick, beginTime, endTime) {
    return request({
        url: '/operationalData/chargeRank?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&rid=' + rid + '&nick=' + nick + '&beginTime=' + beginTime + '&endTime' + endTime,
        method: 'get',

    })
}

//分页查询实时收入
export function findChargeRecord(pageIndex, pageSize, rid, nick, buyType, chargeType, payType, payMoney, platformType, gameType, beginTime, endTime) {
    return request({
        url: '/operationalData/chargeRecord?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&rid=' + rid + '&nick=' + nick + '&buyType=' +
            buyType + '&chargeType=' + chargeType + '&payType=' + payType + '&payMoney=' + payMoney + '&platformType=' + platformType + '&gameType=' +
            gameType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}


// 查询实时收入合计数据
export function findChargeRecordCount(pageIndex, pageSize, rid, nick, buyType, chargeType, payType, payMoney, platformType, gameType, beginTime, endTime) {
    return request({
        url: '/operationalData/chargeRecord?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&rid=' + rid + '&nick=' + nick + '&buyType=' +
            buyType + '&chargeType=' + chargeType + '&payType=' + payType + '&payMoney=' + payMoney + '&platformType=' + platformType + '&gameType=' +
            gameType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

// 分页查询推广渠道
export function findExtendChannel(pageIndex, pageSize, rid, channelId, onlineState, beginTime, endTime) {
    return request({
        url: '/operationalData/extendChannel?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&rid=' + rid + '&channelId=' + channelId + '&onlineState=' +
            onlineState + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

// 分页查询收入概况
export function findIncomeSurvey(pageIndex, pageSize, deviceType, platformType, gameType, channelId, beginTime, endTime) {
    return request({
        url: '/operationalData/incomeSurvey?pageIndex' + pageIndex + '&pageSize=' + pageSize + '&deviceType=' + deviceType + '&platformType=' + platformType +
            '&gameType=' + gameType + '&channelId=' + channelId + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

// 当日登录用户
export function findLoginData() {
    return request({
        url: '/operationalData/loginData',
        method: 'get',

    })
}

// 登录账号折线图
export function findOnlineData() {
    return request({
        url: '/operationalData/onlineData',
        method: 'get',
    })
}

// 分页查询新老玩家付费情况
export function findPlayerPayData(pageIndex, pageSize, gameType, country, channelId, beginTime, endTime) {
    return request({
        url: '/operationalData/playerPayData?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&gameType=' + gameType + '&country=' + country + '&channelId=' +
            channelId + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

// 注册账号折线图
export function findRegisterData() {
    return request({
        url: '/operationalData/registerData',
        method: 'get',
    })
}

// 分页查询签到详情
export function findSignlnlnfoList(pageIndex, pageSize, dateTime, rid) {
    return request({
        url: '/operationalData/signInInfoList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&dateTime=' + dateTime + '&rid=' + rid,
        method: 'get',

    })
}

// 分页查询签到系统
export function findSignlnList(pageIndex, pageSize, beginTime, endTime) {
    return request({
        url: '/operationalData/signInList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',

    })
}

// 分页查询vip系统
export function findVipList(pageIndex, pageSize, rid, vipLevel) {
    return request({
        url: '/operationalData/vipList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&rid=' + rid + '&vipLevel=' + vipLevel,
        method: 'get',
    })
}

// 分页查询整体数据
export function findWholeDataPageList(pageIndex, pageSize, deviceType, platformType, gameType, channelId, beginTime, endTime) {
    return request({
        url: '/operationalData/wholeDataPageList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&deviceType=' + deviceType +
            '&platformType=' + platformType + '&gameType=' + gameType + '&channelId=' + channelId + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}