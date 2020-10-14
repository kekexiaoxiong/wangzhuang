const filters = {
    //------------------------------------------状态翻译----------------------------------------------
    //账户状态翻译
    accountStateFormat(value) {
        if (value == 1) {
            return "正常"
        } else if (value == 2) {
            return "冻结"
        } else {
            return "未知"
        }
    },
    //在线状态
    onlineStateFormat(value) {
        if (value == 1) {
            return "在线"
        } else if (value == 2) {
            return "离线"
        }
    },
    //登录日志类型
    logTypeFormat(value) {
        if (value == 1) {
            return "登录"
        } else if (value == 2) {
            return "退出"
        }
    },
    //公司状态
    gameTypeFormat(value) {
        if (value == 0) {
            return "全部"
        } else if (value == 1) {
            return "九州鱼乐"
        } else if (value == 2) {
            return "台湾"
        } else {
            return "未知"
        }
    },
    //平台状态
    platformTypeFormat(value) {
        if (value == 2) {
            return "VISITOR"
        } else if (value == 3) {
            return "GOOGLE_PLAY"
        } else if (value == 4) {
            return "FACEBOOK"
        } else if (value == 5) {
            return "APPLE_ID"
        } else if (value == 11) {
            return "EMAIL"
        } else if (value == 0) {
            return "全部"
        } else {
            return "未知"
        }
    },
    //设备类型
    deviceTypeFormat(value) {
        if (value == 1) {
            return "PC"
        } else if (value == 2) {
            return "ANDROID"
        } else if (value == 3) {
            return "IOS"
        } else if (value == 4) {
            return "Other  "
        } else if (value == 5) {
            return "Editor"
        } else if (value == 0) {
            return "全部"
        } else {
            return "未知"
        }
    },
    //渠道翻译
    chanelFormat(value) {
        if (value == 0) {
            return "全部"
        } else if (value == 1) {
            return "LEYOU_IOS"
        } else if (value == 2) {
            return "LEYOU_GOOGLEPLAY"
        } else if (value == 3) {
            return "TAIWAN_IOS"
        } else if (value == 4) {
            return "TAIWAN_GOOGLEPLAY"
        } else {
            return "未知渠道"
        }
    },
    //支付方式
    payTypeFormat(value) {
        if (value == 1) {
            return "ios充值"
        } else if (value == 2) {
            return "微信支付"
        } else if (value == 3) {
            return "谷歌应用商店"
        } else if (value == 4) {
            return "支付宝"
        } else if (value == 0) {
            return "全部"
        } else if (value == undefined) {
            return ""
        } else {
            return "其他"
        }
    },
    //商品类型
    buyTypeFormat(value) {
        if (value == 1) {
            return "普通"
        } else if (value == 2) {
            return "限时活动"
        } else if (value == 3) {
            return "商店购买"
        } else if (value == 4) {
            return "苹果内购"
        } else if (value == 5) {
            return "购买金猪"
        } else if (value == 6) {
            return "好友礼物"
        } else if (value == 7) {
            return "每日登录"
        } else if (value == 8) {
            return "商城buff"
        } else {
            return "未知"
        }
    },
    //Boss状态
    bossTypeFormat(value) {
        if (value == 1) {
            return "扣血"
        } else if (value == 2) {
            return "涨进度";
        }
    },
    //Pve活动状态
    pveStateFormat(value) {
        if (value == 1) {
            return "未读取"
        } else if (value == 2) {
            return "读取中"
        } else if (value == 3) {
            return "已读取"
        } else {
            return "未知"
        }
    },
    //角色选择方式
    avatarTypeFormat(value) {
        if (value == 1) {
            return "自动"
        } else if (value == 2) {
            return "手动"
        }
    },
    //跑马灯开启状态
    isOpenFormat(value) {
        if (value == 1) {
            return '开启'
        } else {
            return "关闭"
        }
    },
    //跑马灯总类型
    playerTypeFormat(value) {
        if (value == 1) {
            return "通用"
        } else if (value == 2) {
            return "个人"
        }
    },
    //跑马灯消息类型
    msgTypeFormat(value) {
        if (value == 1) {
            return "奖池"
        } else if (value == 2) {
            return "普通"
        }
    },
    //框体类型
    frameTypeFormat(value) {
        if (value == 1) {
            return "普通"
        } else if (value == 2) {
            return "特效框"
        } else if (value == -1) {
            return "不限"
        }
    },
    //跑马灯类型
    rollTypeFormat(value) {
        if (value == 1) {
            return "MINIJACKPOT"
        } else if (value == 2) {
            return "MINORJACKPOT"
        } else if (value == 3) {
            return "MAJORJACKPOT"
        } else if (value == 4) {
            return "MEGAJACKPOT"
        } else if (value == 5) {
            return "JACKPOT"
        } else if (value == 6) {
            return "BIGWIM"
        } else if (value == 7) {
            return "SUPERWIN"
        } else if (value == 8) {
            return "MEGAWIN"
        } else {
            return "未知"
        }
    },
    //跑马灯播放地点
    placeFormat(value) {
        if (value == 1) {
            return "大厅"
        } else if (value == 2) {
            return "关卡"
        } else {
            return "未知"
        }
    },
    //跑马灯限制翻译
    rollAstrict(value) {
        if (value == -1) {
            return "不限"
        } else {
            return value
        }
    },

    //国家翻译（用于处理中国和中国台湾歧义）
    countryFormat(value) {
        if (value == "中国台湾省") {
            return "台湾"
        } else {
            return value;
        }
    },
    //单点控制是否开启
    openFormat(value) {
        if (value) {
            return "是"
        } else {
            return "否"
        }
    },
    //邮件发送类型
    inboxSendTypeFormat(value) {
        if (value == 1) {
            return "单人邮件"
        } else if (value == 2) {
            return "全服邮件"
        } else {
            return "未知类型"
        }
    },
    //限时活动开启状态
    timeLimitStateFormat(value) {
        if (value == true) {
            return "开启"
        } else if (value == false) {
            return "关闭"
        } else {
            return "未知"
        }
    },
    /**
     *   <el-option label="所有" value=""></el-option>
     <el-option label="广告" value="1"></el-option>
     <el-option label="赛季排行榜中获奖信息" value="2"></el-option>
     <el-option label="战力排行榜中获奖信息" value="3"></el-option>
     <el-option label="PVP排行榜中获奖信息" value="4"></el-option>
     <el-option label="PVE排行榜中获奖信息" value="5"></el-option>
     <el-option label="活动信息" value="6"></el-option>
     <el-option label="促销信息" value="7"></el-option>
     <el-option label="关卡解锁信息" value="8"></el-option>
     <el-option label="好友礼物" value="9"></el-option>
     <el-option label="补偿信息" value="10"></el-option>
     <el-option label="公告信息" value="11"></el-option>
     <el-option label="周期任务" value="12"></el-option>
     * @param value
     */
    //邮件类型
    mailMsgTypeFormat(value) {
        if (value == "1") {
            return "观看广告获得金币";
        } else if (value == "2") {
            return "赛季排行榜中获奖信息";
        } else if (value == "3") {
            return "战力排行榜中获奖信息";
        } else if (value == "4") {
            return "PVP排行榜中获奖信息";
        } else if (value == "5") {
            return "PVE排行榜中获奖信息";
        } else if (value == "6") {
            return "PVE排行榜中获奖信息";
        } else if (value == "7") {
            return "促销信息";
        } else if (value == "8") {
            return "关卡解锁信息";
        } else if (value == "9") {
            return "好友礼物";
        } else if (value == "10") {
            return "gm补偿信息";
        } else if (value == "11") {
            return "周期任务"
        } else if (value == "12") {
            return "公告消息";
        } else if (value == "13") {
            return "停服公告"
        } else {
            return "未知类型";
        }
    },
    //邮件领取状态
    receiveTypeFormat(value) {
        if (value == 2) {
            return "已领取"
        } else if (value == 0) {
            return "未领取"
        } else if (value == 1) {
            return "已删除"
        } else {
            return "未知状态"
        }
    },
    //Gm邮件禁用状态
    gmMailStateFormat(value) {
        if (value == 0) {
            return "已发送"
        } else if (value == 1) {
            return "已删除"
        } else {
            return "未知状态"
        }
    },

    //后台用户操作日志
    operationTypeFormat(value) {
        if (value == 1) {
            return "封号"
        } else if (value == 2) {
            return "解封"
        } else if (value == 3) {
            return "强制下线"
        } else if (value == 4) {
            return "修改昵称"
        } else if (value == 5) {
            return "普通邮件发送"
        } else if (value == 6) {
            return "新增公告"
        } else if (value == 7) {
            return "邮件删除"
        } else if (value == 8) {
            return "邮件禁用"
        } else if (value == 9) {
            return "邮件启用"
        } else if (value == 10) {
            return "高级邮件发送"
        } else if (value == 11) {
            return "新增跑马灯配置"
        } else if (value == 12) {
            return "修改跑马灯配置"
        } else if (value == 13) {
            return "删除跑马灯配置"
        } else if (value == 14) {
            return "删除公告配置"
        } else if (value == 15) {
            return "修改公告配置"
        } else if (value == 16) {
            return "新增PVP配置"
        } else if (value == 17) {
            return "修改PVP配置"
        } else if (value == 18) {
            return "删除PVP配置"
        } else if (value == 19) {
            return "新增PVE配置"
        } else if (value == 20) {
            return "修改VE配置"
        } else if (value == 21) {
            return "删除PVE配置"
        } else if (value == 22) {
            return "新增系统活动公告配置"
        } else if (value == 23) {
            return "修改系统活动公告配置"
        } else if (value == 24) {
            return "删除系统活动公告配置"
        } else if (value == 25) {
            return "新增系统活动公告配置"
        } else if (value == 26) {
            return "修改系统活动公告配置"
        } else if (value == 27) {
            return "删除系统活动公告配置"
        } else if (value == 28) {
            return "强制玩家下线"
        } else if (value == 29) {
            return "清空玩家金币"
        } else if (value == 30) {
            return "清空玩家钻石"
        } else if (value == 31) {
            return "清空玩家代币"
        } else if (value == 32) {
            return "新增代币配置"
        } else if (value == 33) {
            return "修改代币配置"
        } else if (value == 34) {
            return "删除代币配置"
        } else if (value == 35) {
            return "新增白名单"
        } else if (value == 36) {
            return "删除白名单"
        } else if (value == 37) {
            return "绑定账号"
        } else if (value == 38) {
            return "修改公告"
        } else if (value == 39) {
            return "删除公告"
        } else if (value == 40) {
            return "添加单点控制"
        } else if (value == 41) {
            return "删除单点控制"
        } else if (value == 42) {
            return "修改限时活动"
        } else if (value == 1000) {
            return "新增后台用户"
        } else if (value == 1001) {
            return "修改后台用户"
        } else if (value == 1002) {
            return "删除后台用户"
        } else if (value == 1003) {
            return "新增权限模板"
        } else if (value == 1004) {
            return "修改权限模板"
        } else if (value == 1005) {
            return "删除权限模板"
        } else if (value == 1006) {
            return "新增部门权限"
        } else if (value == 1007) {
            return "修改部门权限"
        } else if (value == 1008) {
            return "删除部门权限"
        } else if (value == 1009) {
            return "修改子用户"
        } else if (value == 1010) {
            return "冻结子用户"
        } else {
            return "未知类型"
        }
    },
    //小喇叭区域翻译
    hornStateFormat(value) {
        if (value == 0) {
            return ""
        } else if (value == 1) {
            return "大厅"
        } else {
            return "未知"
        }
    },
    //成就类型翻译
    achievementTypeFormat(value) {
        if (value == 1) {
            return "普通获得金币"
        } else if (value == 2) {
            return "免费获得金币"
        } else if (value == 3) {
            return "BONUS获得金币"
        } else if (value == 4) {
            return "LEVEL"
        } else if (value == 5) {
            return "五连次数"
        } else if (value == 6) {
            return "个人奖池次数"
        } else if (value == 7) {
            return "公共奖池次数"
        } else if (value == 8) {
            return "SPIN次数"
        } else if (value == 9) {
            return "SUPERWIN次数"
        } else if (value == 10) {
            return "LOGIN天数"
        } else {
            return '未知'
        }
    },
    //玩家反馈状态
    CollectFeedBackStateFormart(value) {
        if (value == 1) {
            return "待处理";
        } else if (value == 2) {
            return "已处理";
        } else {
            return "未知";
        }
    },
    //玩家反馈类型
    CollectFeedBackTypeFormat(value) {
        if (value == 1) {
            return "账号相关"
        } else if (value == 2) {
            return "充值相关"
        } else if (value == 3) {
            return "登陆相关"
        } else if (value == 4) {
            return "游戏内容"
        } else {
            return "未知"
        }
    },
  //限时免费岛屿翻译
  freeCheckpointFormat(value){
    if(value == 0){
      return "普通"
    }else if (value == 1){
      return "热门"
    }else if (value == 2){
      return "新增"
    }
  },
    //------------------------------------------工具类------------------------------------------------
    /**
     * 功能：将时间戳按照给定的 时间/日期 格式进行处理
     * @param {Number} date 时间戳
     * @param {String} fmtExp 时间格式 'hh:ss'
     * @returns {String} 规范后的 时间/日期 字符串
     */
    fmtDate(timestamp, fmt) {
        var date
        if (timestamp) {
            date = new Date(parseInt(timestamp));
        } else {
            return '';
        }
        var o = {
            "M+": date.getMonth() + 1, //月份

            "DD+": date.getDate(), //日

            "H+": date.getHours(), //小时

            "h+": date.getHours(),

            "m+": date.getMinutes(), //分

            "s+": date.getSeconds(), //秒

            "q+": Math.floor((date.getMonth() + 3) / 3), //季度

            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },

    /**
     * 功能：将时间戳按照给定的 时间/日期 格式进行处理
     * @param {Number} date 时间戳
     * @param {String} fmtExp 时间格式 'hh:ss'
     * @returns {String} 规范后的 时间/日期 字符串
     */
    fmtDate2(timestamp, fmt) {
        var date
        if (timestamp) {
            date = new Date(parseInt(timestamp));
            if (timestamp >= 1600423200000) {
                var localTime = date.getTime();
                var localOffset = date.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
                var utc = localTime + localOffset; //utc即GMT时间
                var offset = -8; //换算时区为0时区
                var america = utc + (3600000 * offset);
                date = new Date(america);
            } else if (timestamp >= 1596211200000 && timestamp <= 1600423200000) {
                var localTime = date.getTime();
                var localOffset = date.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
                var utc = localTime + localOffset; //utc即GMT时间
                var offset = 0; //换算时区为0时区
                var america = utc + (3600000 * offset);
                date = new Date(america);
            }
        } else {
            return '';
        }
        var o = {
            "M+": date.getMonth() + 1, //月份

            "DD+": date.getDate(), //日

            "H+": date.getHours(), //小时

            "h+": date.getHours(),

            "m+": date.getMinutes(), //分

            "s+": date.getSeconds(), //秒

            "q+": Math.floor((date.getMonth() + 3) / 3), //季度

            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    //获取时间间隔数组
    getDateArray(endDate, splitTime, count) {
        if (!endDate) {
            endDate = new Date();
        }
        if (!splitTime) {
            splitTime = 5 * 60 * 1000;
        }
        if (!count) {
            count = 12;
        }
        var endTime = endDate.getTime();
        var mod = endTime % splitTime;
        if (mod > 0) {
            endTime -= mod;
        }
        var dateArray = [];
        while (count-- > 0) {
            // var d = new Date();
            // d.setTime(endTime - count * splitTime);

            dateArray.push(this.fmtDate(endTime - count * splitTime, "hh:mm"));
        }
        return dateArray;
    },
    GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1)
        var d = (dd.getDate() < 10 ? '0' + (dd.getDate()) : dd.getDate())
        return y + "-" + m + "-" + d;
    },
    numFilter(value) {
        return parseFloat(value).toFixed(0);
    },
    rateSplit(value, num) {
        return parseFloat(value).toFixed(num);
    },
    getPlayerLocalTimeZone(addStr) {
        if (addStr.indexOf("中途") !== -1 || addStr.indexOf("纽埃") !== -1 || addStr.indexOf("美属萨摩亚") !== -1) {
            return -11
        } else if (addStr.indexOf("玻里尼西亚") !== -1 || addStr.indexOf("夏威夷群岛") !== -1 || addStr.indexOf("萨摩亚") !== -1 ||
            addStr.indexOf("汤加群岛") !== -1 || addStr.indexOf("约翰斯顿环礁") !== -1) {
            return -10
        } else if (addStr.indexOf("阿拉斯加") !== -1) {
            return -9
        } else if (addStr.indexOf("不列颠哥伦比亚省") !== -1 || addStr.indexOf("育空") !== -1 || addStr.indexOf("北巴哈加利福尼亚") !== -1 ||
            addStr.indexOf("美国加利福尼亚") !== -1 || addStr.indexOf("美国爱达荷") !== -1 || addStr.indexOf("美国内华达") !== -1 || addStr.indexOf("美国俄勒冈") !== -1 ||
            addStr.indexOf("美国华盛顿") !== -1) {
            return -8
        } else if (addStr.indexOf("埃尔伯塔") !== -1 || addStr.indexOf("加拿大西北地区") !== -1 || addStr.indexOf("加拿大努纳瓦特") !== -1 ||
            addStr.indexOf("美国亚利桑那") !== -1 || addStr.indexOf("美国科罗拉多") !== -1 || addStr.indexOf("美国蒙大拿") !== -1 ||
            addStr.indexOf("美国内布拉斯加") !== -1 || addStr.indexOf("美国新墨西哥") !== -1 || addStr.indexOf("美国北达科他") !== -1 |
            addStr.indexOf("美国南达科他") !== -1 || addStr.indexOf("美国犹他") !== -1 || addStr.indexOf("美国怀俄明") !== -1) {
            return -7
        } else if (addStr.indexOf("伯利兹") !== -1 || addStr.indexOf("加拿大马尼托巴") !== -1 || addStr.indexOf("加拿大安大略") !== -1 ||
            addStr.indexOf("加拿大萨斯喀彻温") !== -1 || addStr.indexOf("智利") !== -1 || addStr.indexOf("哥斯达黎加") !== -1 ||
            addStr.indexOf("科隆群岛") !== -1 || addStr.indexOf("萨尔瓦多") !== -1 || addStr.indexOf("危地马拉") !== -1 ||
            addStr.indexOf("洪都拉斯") !== -1 || addStr.indexOf("尼加拉瓜") !== -1 || addStr.indexOf("美国亚拉巴马") !== -1 ||
            addStr.indexOf("美国阿肯色") !== -1 || addStr.indexOf("美国伊利诺斯") !== -1 || addStr.indexOf("美国衣阿华") !== -1 ||
            addStr.indexOf("美国堪萨斯") !== -1 || addStr.indexOf("美国肯塔基") !== -1 || addStr.indexOf("美国路易斯安那") !== -1 ||
            addStr.indexOf("美国明尼苏达") !== -1 || addStr.indexOf("美国密西西比") !== -1 || addStr.indexOf("美国内布拉斯加") !== -1 ||
            addStr.indexOf("美国密苏里") !== -1 || addStr.indexOf("美国北达科他") !== -1 || addStr.indexOf("美国俄克拉何马") !== -1 ||
            addStr.indexOf("美国南达科他") !== -1 || addStr.indexOf("美国田纳西") !== -1 || addStr.indexOf("美国德克萨斯") !== -1 ||
            addStr.indexOf("美国威斯康星") !== -1) {
            return -6
        } else if (addStr.indexOf("Nunavut") !== -1 || addStr.indexOf("加拿大安大略") !== -1 || addStr.indexOf("加拿大魁北克") !== -1 ||
            addStr.indexOf("开曼群岛") !== -1 || addStr.indexOf("哥伦比亚") !== -1 || addStr.indexOf("古巴") !== -1 || addStr.indexOf("厄瓜多尔") !== -1 ||
            addStr.indexOf("海地") !== -1 || addStr.indexOf("牙买加") !== -1 || addStr.indexOf("巴拿马") !== -1 || addStr.indexOf("秘鲁") !== -1 ||
            addStr.indexOf("土克斯和开科斯群岛") !== -1 || addStr.indexOf("美国康涅狄格") !== -1 || addStr.indexOf("美国特拉华") !== -1 || addStr.indexOf("华盛顿特区") !== -1 ||
            addStr.indexOf("美国佛罗里达") !== -1 || addStr.indexOf("美国佐治亚") !== -1 || addStr.indexOf("美国印第安纳") !== -1 ||
            addStr.indexOf("美国缅因") !== -1 || addStr.indexOf("美国马里兰") !== -1 || addStr.indexOf("美国马萨诸塞") !== -1 ||
            addStr.indexOf("美国密执安") !== -1 || addStr.indexOf("美国新罕布什尔") !== -1 || addStr.indexOf("美国新泽西") !== -1 ||
            addStr.indexOf("美国纽约") !== -1 || addStr.indexOf("美国北卡罗来纳") !== -1 || addStr.indexOf("美国俄亥俄") !== -1 ||
            addStr.indexOf("美国宾夕法尼亚") !== -1 || addStr.indexOf("美国罗德艾兰") !== -1 || addStr.indexOf("美国南卡罗来纳") !== -1 ||
            addStr.indexOf("美国田纳西") !== -1 || addStr.indexOf("美国佛蒙特") !== -1 || addStr.indexOf("美国弗吉尼亚") !== -1 ||
            addStr.indexOf("美国西弗吉尼亚") !== -1) {
            return -5
        } else if (addStr.indexOf("安圭拉") !== -1 || addStr.indexOf("安提瓜和巴布达") !== -1 || addStr.indexOf("阿卢巴") !== -1 || addStr.indexOf("巴巴多斯") !== -1 ||
            addStr.indexOf("玻利维亚") !== -1 || addStr.indexOf("巴西") !== -1 || addStr.indexOf("加拿大拉布拉多") !== -1 || addStr.indexOf("加拿大纽奔驰域") !== -1 ||
            addStr.indexOf("加拿大诺华士高沙") !== -1 || addStr.indexOf("加拿大爱德华王子岛") !== -1 || addStr.indexOf("智利") !== -1 ||
            addStr.indexOf("多米尼加共和国") !== -1 || addStr.indexOf("福克兰群岛") !== -1 || addStr.indexOf("马尔维纳斯") !== -1 || addStr.indexOf("格林纳达") !== -1 ||
            addStr.indexOf("哥德普洛岛") !== -1 || addStr.indexOf("圭亚那") !== -1 || addStr.indexOf("马提尼克岛") !== -1 || addStr.indexOf("蒙特色纳") !== -1 ||
            addStr.indexOf("荷属安地列斯群岛") !== -1 || addStr.indexOf("巴拉圭") !== -1 || addStr.indexOf("波多黎各") !== -1 || addStr.indexOf("圣基茨和尼维斯") !== -1 ||
            addStr.indexOf("圣卢西亚") !== -1 || addStr.indexOf("圣文森特和格林纳丁斯") !== -1 || addStr.indexOf("特立尼达和多巴哥") !== -1 ||
            addStr.indexOf("委内瑞拉") !== -1 || addStr.indexOf("维尔京群岛") !== -1) {
            return -4
        } else if (addStr.indexOf("加拿大纽芬兰") !== -1) {
            return -3.5
        } else if (addStr.indexOf("阿根廷") !== -1 || addStr.indexOf("巴哈马") !== -1 || addStr.indexOf("巴西") !== -1 || addStr.indexOf("法属圭亚那") !== -1 ||
            addStr.indexOf("格陵兰") !== -1 || addStr.indexOf("圣皮耶和密克罗") !== -1 || addStr.indexOf("苏里南") !== -1 || addStr.indexOf("乌拉圭") !== -1) {
            return -3
        } else if (addStr.indexOf("百慕大群岛") !== -1 || addStr.indexOf("费尔南多") !== -1) {
            return -2
        } else if (addStr.indexOf("维德岛") !== -1 || addStr.indexOf("葡萄牙") !== -1) {
            return -1
        } else if (addStr.indexOf("布基纳法索") !== -1 || addStr.indexOf("科特迪瓦") !== -1 || addStr.indexOf("法罗群岛") !== -1 || addStr.indexOf("冈比亚") !== -1 ||
            addStr.indexOf("迦纳") !== -1 || addStr.indexOf("几内亚") !== -1 || addStr.indexOf("几内亚比绍共和国") !== -1 || addStr.indexOf("冰岛") !== -1 ||
            addStr.indexOf("爱尔兰") !== -1 || addStr.indexOf("利比里亚") !== -1 || addStr.indexOf("马里") !== -1 || addStr.indexOf("毛里塔尼亚") !== -1 ||
            addStr.indexOf("摩洛哥") !== -1 || addStr.indexOf("葡萄牙") !== -1 || addStr.indexOf("圣海伦娜") !== -1 || addStr.indexOf("圣多美和普林西比") !== -1 ||
            addStr.indexOf("塞内加尔") !== -1 || addStr.indexOf("塞拉利昂") !== -1 || addStr.indexOf("金丝雀岛") !== -1 || addStr.indexOf("多哥") !== -1 ||
            addStr.indexOf("英国") !== -1) {
            return 0
        } else if (addStr.indexOf("阿尔巴尼亚") !== -1 || addStr.indexOf("安道尔") !== -1 || addStr.indexOf("安哥拉") !== -1 || addStr.indexOf("奥地利") !== -1 ||
            addStr.indexOf("比利时") !== -1 || addStr.indexOf("贝宁") !== -1 || addStr.indexOf("波士尼亚赫塞哥维纳联邦") !== -1 ||
            addStr.indexOf("喀麦隆") !== -1 || addStr.indexOf("中非共和国") !== -1 || addStr.indexOf("乍得") !== -1 ||
            addStr.indexOf("刚果共和国") !== -1 || addStr.indexOf("刚果民主共和国") !== -1 || addStr.indexOf("克罗埃西亚") !== -1 ||
            addStr.indexOf("捷克") !== -1 || addStr.indexOf("丹麦") !== -1 || addStr.indexOf("赤道几内亚") !== -1 || addStr.indexOf("前南斯拉夫共和国") !== -1 ||
            addStr.indexOf("法国") !== -1 || addStr.indexOf("加彭") !== -1 || addStr.indexOf("德国") !== -1 || addStr.indexOf("直布罗陀") !== -1 ||
            addStr.indexOf("匈牙利") !== -1 || addStr.indexOf("意大利") !== -1 || addStr.indexOf("列支敦士登") !== -1 || addStr.indexOf("卢森堡") !== -1 ||
            addStr.indexOf("马其頓") !== -1 || addStr.indexOf("摩纳哥") !== -1 || addStr.indexOf("黑山") !== -1 || addStr.indexOf("納米比亚") !== -1 ||
            addStr.indexOf("荷兰") !== -1 || addStr.indexOf("尼日尔") !== -1 || addStr.indexOf("尼日利亚") !== -1 || addStr.indexOf("挪威") !== -1 ||
            addStr.indexOf("波兰") !== -1 || addStr.indexOf("圣马力诺") !== -1 || addStr.indexOf("塞尔维亚共和国") !== -1 || addStr.indexOf("斯洛伐克") !== -1 ||
            addStr.indexOf("斯洛文尼亚") !== -1 || addStr.indexOf("西班牙") !== -1 || addStr.indexOf("冷岸和央麦恩群岛") !== -1 ||
            addStr.indexOf("瑞典") !== -1 || addStr.indexOf("瑞士") !== -1 || addStr.indexOf("梵蒂冈") !== -1) {
            return 1
        } else if (addStr.indexOf("白俄罗斯") !== -1 || addStr.indexOf("博茨瓦纳") !== -1 || addStr.indexOf("保加利亚") !== -1 || addStr.indexOf("布隆迪") !== -1 ||
            addStr.indexOf("刚果民主共和国") !== -1 || addStr.indexOf("塞浦路斯") !== -1 || addStr.indexOf("埃及") !== -1 || addStr.indexOf("爱沙尼亚") !== -1 ||
            addStr.indexOf("芬兰") !== -1 || addStr.indexOf("希腊") !== -1 || addStr.indexOf("以色列") !== -1 || addStr.indexOf("约旦") !== -1 ||
            addStr.indexOf("拉脱维亚") !== -1 || addStr.indexOf("黎巴嫩") !== -1 || addStr.indexOf("莱索托") !== -1 || addStr.indexOf("利比亚") !== -1 ||
            addStr.indexOf("立陶宛") !== -1 || addStr.indexOf("马拉维") !== -1 || addStr.indexOf("摩尔多瓦") !== -1 || addStr.indexOf("莫桑比克") !== -1 ||
            addStr.indexOf("巴勒斯坦") !== -1 || addStr.indexOf("罗马尼亚") !== -1 || addStr.indexOf("俄罗斯") !== -1 || addStr.indexOf("卢旺达") !== -1 ||
            addStr.indexOf("南非") !== -1 || addStr.indexOf("斯威士兰") !== -1 || addStr.indexOf("叙利亚共和国") !== -1 || addStr.indexOf("土耳其") !== -1 ||
            addStr.indexOf("乌克兰") !== -1 || addStr.indexOf("赞比亚") !== -1 || addStr.indexOf("尚比亞") !== -1 || addStr.indexOf("津巴布韦") !== -1 ||
            addStr.indexOf("辛巴威") !== -1) {
            return 2
        } else if (addStr.indexOf("巴林") !== -1 || addStr.indexOf("科摩洛") !== -1 || addStr.indexOf("吉布地") !== -1 || addStr.indexOf("依利垂亚") !== -1 ||
            addStr.indexOf("埃塞俄比亚") !== -1 || addStr.indexOf("伊拉克") !== -1 || addStr.indexOf("肯尼亚") !== -1 || addStr.indexOf("科威特") !== -1 ||
            addStr.indexOf("马达加斯加") !== -1 || addStr.indexOf("马约特") !== -1 || addStr.indexOf("卡达") !== -1 || addStr.indexOf("沙特阿拉伯") !== -1 ||
            addStr.indexOf("索马里") !== -1 || addStr.indexOf("苏丹") !== -1 || addStr.indexOf("坦桑尼亚") !== -1 || addStr.indexOf("乌干达") !== -1 ||
            addStr.indexOf("也门") !== -1) {
            return 3
        } else if (addStr.indexOf("伊朗") !== -1) {
            return 3.5
        } else if (addStr.indexOf("格鲁吉亚") !== -1 || addStr.indexOf("哈萨克斯坦") !== -1 || addStr.indexOf("毛里求斯") !== -1 ||
            addStr.indexOf("阿曼") !== -1 || addStr.indexOf("塞舌尔群岛") !== -1 || addStr.indexOf("阿拉伯联合酋长国") !== -1) {
            return 4
        } else if (addStr.indexOf("阿富汗") !== -1) {
            return 4.5
        } else if (addStr.indexOf("亚美尼亚") !== -1 || addStr.indexOf("阿塞拜疆") !== -1 || addStr.indexOf("吉尔吉斯斯坦") !== -1 ||
            addStr.indexOf("马尔代夫") !== -1 || addStr.indexOf("巴基斯坦") !== -1 || addStr.indexOf("塔吉克斯坦") !== -1 || addStr.indexOf("土库曼斯坦") !== -1 ||
            addStr.indexOf("乌兹别克斯坦") !== -1) {
            return 5
        } else if (addStr.indexOf("印度") !== -1) {
            return 5.5
        } else if (addStr.indexOf("尼泊尔") !== -1) {
            return 5.75
        } else if (addStr.indexOf("孟加拉") !== -1 || addStr.indexOf("不丹") !== -1 || addStr.indexOf("哈萨克斯坦") !== -1 || addStr.indexOf("斯里兰卡") !== -1) {
            return 6
        } else if (addStr.indexOf("科科斯群岛") !== -1 || addStr.indexOf("缅甸") !== -1) {
            return 6.5
        } else if (addStr.indexOf("高棉") !== -1 || addStr.indexOf("圣诞节岛") !== -1 || addStr.indexOf("印尼") !== -1 || addStr.indexOf("老挝") !== -1 ||
            addStr.indexOf("泰国") !== -1 || addStr.indexOf("越南") !== -1) {
            return 7
        } else if (addStr.indexOf("西澳州") !== -1 || addStr.indexOf("文莱") !== -1 || addStr.indexOf("中国") !== -1 || addStr.indexOf("香港") !== -1 ||
            addStr.indexOf("澳门") !== -1 || addStr.indexOf("中部印尼") !== -1 || addStr.indexOf("马来西亚") !== -1 || addStr.indexOf("蒙古") !== -1 ||
            addStr.indexOf("菲律宾") !== -1 || addStr.indexOf("台湾") !== -1 || addStr.indexOf("新加坡") !== -1) {
            return 8
        } else if (addStr.indexOf("东帝汶") !== -1 || addStr.indexOf("日本") !== -1 || addStr.indexOf("朝鲜") !== -1 || addStr.indexOf("大韩民国") !== -1 ||
            addStr.indexOf("韩国") !== -1 || addStr.indexOf("帛琉") !== -1) {
            return 9
        } else if (addStr.indexOf("科克群岛") !== -1 || addStr.indexOf("关岛") !== -1 || addStr.indexOf("密克罗尼西亚联邦") !== -1 || addStr.indexOf("北马里亚纳群岛") !== -1 ||
            addStr.indexOf("巴布亚新几内亚") !== -1) {
            return 10
        } else if (addStr.indexOf("密克罗尼西亚联邦") !== -1 || addStr.indexOf("新喀里多尼亚") !== -1 || addStr.indexOf("所罗门群岛") !== -1 ||
            addStr.indexOf("瓦努阿图") !== -1) {
            return 11
        } else if (addStr.indexOf("诺福克岛") !== -1) {
            return 11.5
        } else if (addStr.indexOf("斐济") !== -1 || addStr.indexOf("吉尔巴斯") !== -1 || addStr.indexOf("吉柏特岛") !== -1 || addStr.indexOf("马绍尔群岛") !== -1 ||
            addStr.indexOf("瑙鲁") !== -1 || addStr.indexOf("新西兰") !== -1 || addStr.indexOf("图瓦卢") !== -1 || addStr.indexOf("威克岛") !== -1 ||
            addStr.indexOf("瓦利斯和富图纳群岛") !== -1) {
            return 12
        } else if (addStr.indexOf("新西兰") !== -1 || addStr.indexOf("查塔曼岛") !== -1) {
            return 12.75
        } else if (addStr.indexOf("凤凰城岛") !== -1 || addStr.indexOf("东加") !== -1) {
            return 13
        } else if (addStr.indexOf("线岛") !== -1) {
            return 14
        } else {
            return 99
        }
    },
    localDateTime(timestamp, addStr, fmt) {
        console.log(timestamp, addStr, fmt)
        if (addStr == null || addStr == undefined || addStr == "" || addStr == "未知") {
            return "未知"
        }
        if (timestamp <= 1596211200000) {
            return filters.fmtDate(timestamp, fmt)
        }
        var date
        if (timestamp) {
            date = new Date(parseInt(timestamp));
            var localTime = date.getTime();
            var localOffset = date.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
            var utc = localTime + localOffset; //utc即GMT时间
            var offset = filters.getPlayerLocalTimeZone(addStr);
            console.log(addStr, offset)
            if (offset === 99) {
                return filters.fmtDate(timestamp, fmt)
            }
            var america = utc + (3600000 * offset);
            date = new Date(america);
        } else {
            return '';
        }
        var o = {
            "M+": date.getMonth() + 1, //月份

            "DD+": date.getDate(), //日

            "H+": date.getHours(), //小时

            "h+": date.getHours(),

            "m+": date.getMinutes(), //分

            "s+": date.getSeconds(), //秒

            "q+": Math.floor((date.getMonth() + 3) / 3), //季度

            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },


}
export default (Vue) => {
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })
}
