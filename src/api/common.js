import request from '@/utils/request'

//查询渠道数据
export function findChannel() {
    return request({
        url: '/common/channelTypeEnum',
        method: 'get',
    })
}

//查询关卡数据
export function findCheckpoint() {
    return request({
        url: '/common/checkpoint',
        method: 'get',
    })
}

//查询设备数据
export function findDeviceType() {
    return request({
        url: '/common/deviceTypeEnum',
        method: 'get',
    })
}

//查询公司数据
export function findGameTypeEnum() {
    return request({
        url: '/common/gameTypeEnum',
        method: 'get',
    })
}

//查询平台数据
export function findPlatFormType() {
    return request({
        url: '/common/platformTypeEnum',
        method: 'get',
    })
}

//购买种类
export function findChargeType() {
    return request({
        url: '/common/chargeType',
        method: 'get',
    })
}
//支付面额
export function findChargeMoney() {
    return request({
        url: '/common/chargeMoney',
        method: 'get',
    })
}

//支付方式
export function findPayType() {
    return request({
        url: '/common/payType',
        method: 'get',
    })
}


//获取持有时间

export function findHoldWeek() {
    return request({
        url: '/common/holdWeekData',
        method: 'get',
    })
}

//appid

export function findAppid() {

    return request({
        url: '/common/advertisingAppId',
        method: 'get',
    })
}