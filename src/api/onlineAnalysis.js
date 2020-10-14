import request from '@/utils/request'

//在线分析 获取acu pcu数据
export function findAcuAndPcu(beginTime, endTime) {
    return request({
        url: '/onlineAnalysis/acuAndPcuData?beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//在线分析 获取acu pcu极限数据
export function findMaxAcuAndPcu(beginTime, endTime) {
    return request({
        url: '/onlineAnalysis/maxAcuAndPcuData?beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}

//在线分析 在线分析 在线玩家
export function findOnlinePlayer(beginTime, endTime) {
    return request({
        url: '/onlineAnalysis/onlinePlayerData?beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
    })
}