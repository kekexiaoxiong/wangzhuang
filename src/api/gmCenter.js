import request from '@/utils/request'

//发送 查询 gm高级邮件
export function findSeniorMail(pageIndex, pageSize, msgType, beginTime, endTime) {

    return request({
        url: '/gm/seniorMail?pageIndex=' + pageIndex + '&pageSize=' +
            pageSize + '&msgType=' + msgType + '&beginTime=' + beginTime + '&endTime=' + endTime,
        method: 'get',
        // params: { token }
    })
}

//发送 gm 高级邮件
export function sendSeniorMail(data) {
    return request({
        url: '/gm/seniorMail',
        //  url: '/sysMenu/userMenuList',
        method: 'post',
        data
        // params: { token }
    })
}

//查询高级账号信息
export function findVipManager(nick, machineCode, lastIp, rid, pageIndex, pageSize) {
    return request({
        url: '/gm/accountVipManager?nick=' + nick + '&machineCode=' + machineCode +
            '&lastIp=' + lastIp + '&rid=' + rid + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        //  url: '/sysMenu/userMenuList',
        method: 'get',

        // params: { token }
    })
}

// 查询邮件接收列表
export function findMailRecList(rid, msgType, beginTime, endTime, pageIndex, pageSize) {

    return request({
        url: '/gm/gmMailReceive?rid=' + rid + '&msgType=' + msgType +
            '&beginTime=' + beginTime + '&endTime=' + endTime + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

// 查询白名单列表
export function findWhileList(rid) {
    return request({
        url: '/gm/whileList?rid=' + rid,
        //  url: '/sysMenu/userMenuList',
        method: 'get',
        // params: { token }
    })
}

// 新增白名单
export function addWhileList(data) {
    return request({
        url: '/gm/while',
        //  url: '/sysMenu/userMenuList',
        method: 'post',
        data
        // params: { token }
    })
}

//删除白名单
export function delWhileList(rid) {
    return request({
        url: `/gm/while/${rid}`,
        method: 'delete',
        // params: { token }
    })
}

// 查询玩家账号绑定信息
export function findAccountBindType(rid) {
    return request({
        url: `/gm/accountBindType?rid=` + rid,
        method: 'get',
        // params: { token }
    })
}


//账号绑定
export function addAccountBind(data) {
    return request({
        url: `/gm/accountBind`,
        method: 'post',
        data
        // params: { token }
    })
}

// 查询绑定账号
export function findAccountBind(rid) {
    return request({
        url: `/gm/accountBindType?rid=` + rid,
        method: 'get',
    })
}

//分页查询玩家邮件
export function findPlayerMail(rid, machineCode, beginTime, endTime, pageIndex, pageSize) {
    return request({
        url: '/gm/playerMail?rid=' + rid + '&machineCode=' + machineCode + '&beginTime=' + beginTime + '&endTime=' + endTime +
            '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        method: 'get',
    })
}

//分页查询玩家单点控制列表
export function findPlayerWinCtr(rid, nick, pageIndex, pageSize) {
    return request({
        url: '/gm/playerWinCtr?rid=' + rid + '&nick=' + nick + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        method: 'get',
    })
}


//绑定订单列表
export function findBindChargeLog(rid, nick, orderNo, channelId, pageIndex, pageSize) {
    return request({
        url: '/gm/bindChargeLog?rid=' + rid + '&nick=' + nick + '&orderNo=' + orderNo + '&channelId=' + channelId + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        method: 'get',
    })
}


//删除高级邮件
export function delHighEmail(id) {
    return request({
        url: `/gm/seniorMail/${id}`,
        method: 'delete',
        // params: { token }
    })
}


//提交玩家反馈邮件
export function addPlayerMail(data) {
    return request({
        url: '/gm/submitPlayerMail',
        //  url: '/sysMenu/userMenuList',
        method: 'post',
        data
        // params: { token }
    })
}


// 查询账号信息及管理
export function findAccountManager(nick, machineCode, lastIp, rid, pageIndex, pageSize) {
    return request({
        url: `/gm/accountManager?nick=` + nick + '&machineCode=' + machineCode + '&lastIp=' + lastIp + '&rid=' + rid + '&pageIndex= ' + pageIndex + '&pageSize' + pageSize,
        method: 'get',
    })
}


// 分页查询普通邮件
export function findOrdinaryMail(pageIndex, pageSize, msgType, beginTime, endTime) {
    return request({
        url: `/gm/ordinaryMail?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&msgType=' + msgType + '&beginTime=' + beginTime + '&endTime= ' + endTime,
        method: 'get',
    })
}

// 发送gm普通邮件
export function sendAccountManager(data) {
    return request({
        url: `/gm/ordinaryMail`,
        method: 'post',
        data
    })
}

// 删除gm普通邮件
export function delAccountManager(id) {
    return request({
        url: `/gm/ordinaryMail/${id}`,
        method: 'delete',

    })
}


// 分页查询测试玩家
export function findTestAccountr(rid, nick, pageIndex, pageSize) {
    return request({
        url: `/gm/testAccount?rid=` + rid + '&nick=' + nick + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        method: 'get',
    })
}

// 添加测试玩家
export function sendTestAccountr(data) {
    return request({
        url: `/gm/testAccount`,
        method: 'post',
        data
    })
}


// 删除测试玩家
export function delTestAccount(id) {
    return request({
        url: `/gm/testAccount/${id}`,
        method: 'delete',

    })
}