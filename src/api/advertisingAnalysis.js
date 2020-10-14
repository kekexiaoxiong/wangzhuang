import request from '@/utils/request'

//查询市场投放 回收数据
export function findAdRecycle(appId, country, beginTime, endTime) {
    return request({
        url: '/advertisingAnalysis/adRecycleByApp?appId=' + appId + '&country=' + country + '&beginTime=' + beginTime + '&endTime=' + endTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

//查询市场投放数据 app级别 
export function findLaunchApp(appId, country, beginTime, endTime, pageIndex, pageSize) {

    return request({
        url: '/advertisingAnalysis/advertisementInjectingByApp?appId=' + appId + '&country=' + country + '&beginTime=' + beginTime + '&endTime=' + endTime +
            '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

//查询市场投放回收数据 app级别 
export function findAdRecycleByApp(appId, country, beginTime, endTime) {

    return request({
        url: '/advertisingAnalysis/adRecycleByApp?appId=' + appId + '&country=' + country + '&beginTime=' + beginTime + '&endTime=' + endTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}


//查询市场投放数据  campaign级别 
export function findLaunchCampaign(appId, country, partner, mediaSource, dateTime, pageIndex, pageSize) {

    return request({
        url: '/advertisingAnalysis/advertisementInjectingByCampaign?appId=' + appId + '&country=' + country + '&partner=' + partner + '&mediaSource=' + mediaSource + '&dateTime=' + dateTime +
            '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}


//查询市场投放回收数据   campaign级别 
export function findAdRecycleByCampaign(appId, mediaSource, country, dateTime) {

    return request({
        url: 'GET /advertisingAnalysis/adRecycleByCampaign?appId=' + appId + '&mediaSource=' + mediaSource + '&country=' + country + '&dateTime=' + dateTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}


//查询市场投放数据  MediaSource级别 
export function findLaunchMediaSource(appId, country, partner, dateTime, pageIndex, pageSize) {

    return request({
        url: '/advertisingAnalysis/advertisementInjectingByMediaSource?appId=' + appId + '&country=' + country + '&partner=' + partner + '&dateTime=' + dateTime +
            '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}


//查询市场投放回收数据  MediaSource级别 
export function findAdRecycleByMediaSource(appId, country, dateTime) {

    return request({
        url: '/advertisingAnalysis/adRecycleByMediaSource?appId=' + appId + '&country=' + country + '&dateTime=' + dateTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}


//查询市场投放数据  代理级别 
export function findLaunchAgent(appId, country, dateTime, pageIndex, pageSize) {

    return request({
        url: '/advertisingAnalysis/advertisementInjectingByPartner?appId=' + appId + '&country=' + country + '&dateTime=' + dateTime +
            '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

//查询广告收益
export function findAdEarnings(beginTime, endTime, pageIndex, pageSize) {

    return request({
        url: '/advertisingAnalysis/adEarnings?beginTime=' + beginTime + '&endTime=' + endTime +
            '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

//查询广告预估
export function findAdForecast(appId, dateTime) {
    return request({
        url: '/advertisingAnalysis/adForecast?appId=' + appId + '&dateTime=' + dateTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}



//查询市场投放回收数据 --adset级别
export function findAdRecycleByAdSet(appId, mediaSource, campaign, country, dateTime) {
    return request({
        url: '/advertisingAnalysis/adRecycleByAdSet?appId=' + appId + '&mediaSource=' + mediaSource + '&campaign=' + campaign + '&country=' + country + '&dateTime=' + dateTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}


//查询市场投放留存数据 --adset级别
export function findRemainAdset(appId, mediaSource, campaign, country, dateTime) {
    return request({
        url: '/advertisingAnalysis/adRemainByAdSet?appId=' + appId + '&mediaSource=' + mediaSource + '&campaign=' + campaign + '&country=' + country + '&dateTime=' + dateTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

//查询市场投放留存数据 --app级别
export function findRemainApp(appId, country, beginTime, endTime) {
    return request({
        url: '/advertisingAnalysis/adRemainByApp?appId=' + appId + '&country=' + country + '&beginTime=' + beginTime + '&endTime=' + endTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

//查询市场留存数据  campaign级别 
export function findRemainCampaign(appId, mediaSource, country, dateTime) {

    return request({
        url: '/advertisingAnalysis/adRemainByCampaign?appId=' + appId + '&mediaSource=' + mediaSource + '&country=' + country + '&dateTime=' + dateTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

//查询市场留存数据  Mediasource级别 
export function findRemainMediasource(appId, country, dateTime) {

    return request({
        url: '/advertisingAnalysis/adRemainByMediaSource?appId=' + appId + '&country=' + country + '&dateTime=' + dateTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}


//查询广告总收益
export function findAdTotal(appId, dateTime) {

    return request({
        url: '/advertisingAnalysis/adRevenueTotal?appId=' + appId + '&dateTime=' + dateTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}


//校正ECPM
export function addECPM(data) {
    return request({
        url: '/advertisingAnalysis/reviseAdEcpm',
        method: 'post',
        data
    })
}


//更新广告收益
export function findUpdateAdRevenue(dateTime) {
    return request({
        url: '/advertisingAnalysis/updateAdRevenueTotal?dateTime=' + dateTime,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}