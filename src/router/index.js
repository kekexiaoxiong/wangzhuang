import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },

    // 404 page must be placed at the end !!!
    // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

//异步挂载的路由
//动态需要根据权限加载的路由表





export let asyncRouterMap = [{
        path: "/menu_list",
        component: Layout,
        // redirect: '/caidan/',
        name: '系统管理',
        alwaysShow: true,
        meta: { title: "系统管理", icon: "tree" },
        // userNo:sessionStorage.getItem("userNo"),
        children: [{
                path: "/menu_list",
                name: "菜单管理",
                meta: { title: "菜单管理", icon: "tree" },
                component: () =>
                    import ('@/views/meun/index')
            },
            {
                path: "/user_list",
                name: "用户管理",
                meta: { title: "用户管理", icon: "tree" },
                component: () =>
                    import ('@/views/users/index')
            },
            {
                path: "/role_list",
                name: "角色管理",
                meta: { title: "角色管理", icon: "tree" },
                component: () =>
                    import ('@/views/role/index')
            },
            // {
            //     path: "/view/role",
            //     name: "部门角色",
            //     meta: { title: "部门角色", icon: "tree" },
            //     component: () =>
            //         import ('@/views/role/meunRole')
            // },
            {
                path: "/view/depart",
                name: "部门管理",
                meta: { title: "部门管理", icon: "tree" },
                component: () =>
                    import ('@/views/department/index')
            },
            {
                path: "/view/user",
                name: "部门用户",
                meta: { title: "部门用户", icon: "tree" },
                component: () =>
                    import ('@/views/departUser/index')
            },
            {
                path: "/view/api/index",
                name: "系统api",
                meta: { title: "api管理", icon: "tree" },
                component: () =>
                    import ('@/views/api/index')
            },

            {
                path: "index",
                name: "哈哈哈",
                meta: { title: "api", icon: "tree" },
                component: () =>
                    import ('@/views/api/index')
            },
        ]
    },
    {
        path: "/views/general",
        component: Layout,
        // redirect: '/caidan/',
        name: '游戏概况',
        alwaysShow: true,
        meta: { title: "游戏概况", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
            path: "/views/general/details",
            name: "游戏概述",
            meta: { title: "游戏概述", icon: "tree" },
            component: () =>
                import ('@/views/general/details')
        }]
    },

    // {
    //     path: "/view/gameData",
    //     component: Layout,
    //     // redirect: '/caidan/',
    //     name: '游戏数据',
    //     alwaysShow: true,
    //     meta: { title: "游戏数据", icon: "caidan" },
    //     // component: () =>
    //     //     import ('@/views/role/index'),
    //     //userNo: sessionStorage.getItem("userNo"),
    //     children: [{
    //             path: "/gameData/checkPointMonitoring",
    //             name: "分页查询关卡监控",
    //             meta: { title: "分页查询关卡监控", icon: "tree" },
    //             component: () =>
    //                 import ('@/views/checkPointMonitoring/index')
    //         },


    //     ]
    // },
    {
        path: "/view/operational",
        component: Layout,
        // redirect: '/caidan/',
        name: '运营数据',
        alwaysShow: true,
        meta: { title: "运营数据", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
                path: "/views/operationalData/playRetainData",
                name: "玩家留存",
                meta: { title: "玩家留存", icon: "tree" },
                component: () =>
                    import ('@/views/operationalData/playRetainData')
            },
            {
                path: "/views/operationalData/achievement",
                name: "成就系统",
                meta: { title: "成就系统", icon: "tree" },
                component: () =>
                    import ('@/views/operationalData/achievement')
            },
            {
                path: "/views/operationalData/chargeRank",
                name: "充值排行",
                meta: { title: "充值排行", icon: "tree" },
                component: () =>
                    import ('@/views/operationalData/chargeRank')
            },
            {
                path: "/views/operationalData/chargeRecord",
                name: "实时收入",
                meta: { title: "实时收入", icon: "tree" },
                component: () =>
                    import ('@/views/operationalData/chargeRecord')
            },
            // {
            //     path: "/views/operationalData/chargeRecordCount",
            //     name: "合计数据",
            //     meta: { title: "收入合计数据", icon: "tree" },
            //     component: () =>
            //         import ('@/views/operationalData/chargeRecordCount')
            // },

            {
                path: "/views/operationalData/extendChannel",
                name: "推广渠道",
                meta: { title: "推广渠道", icon: "tree" },
                component: () =>
                    import ('@/views/operationalData/extendChannel')
            },

            {
                path: "/views/operationalData/incomeSurvey",
                name: "收入概况",
                meta: { title: "收入概况", icon: "tree" },
                component: () =>
                    import ('@/views/operationalData/incomeSurvey')
            },

            // {
            //     path: "/views/operationalData/loginData",
            //     name: "当日登录用户",
            //     meta: { title: "当日登录用户", icon: "tree" },
            //     component: () =>
            //         import ('@/views/operationalData/loginData')
            // },
            // {
            //     path: "/views/operationalData/onlineData",
            //     name: "登录账号折线图",
            //     meta: { title: "登录账号折线图", icon: "tree" },
            //     component: () =>
            //         import ('@/views/operationalData/onlineData')
            // },
            {
                path: "/views/operationalData/playerPayData",
                name: "新老玩家付费情况",
                meta: { title: "新老玩家付费情况", icon: "tree" },
                component: () =>
                    import ('@/views/operationalData/playerPayData')
            },
            // {
            //     path: "/views/operationalData/registerData",
            //     name: "注册账号折线图",
            //     meta: { title: "注册账号折线图", icon: "tree" },
            //     component: () =>
            //         import ('@/views/operationalData/registerData')
            // },

            // {
            //     path: "/views/operationalData/signlnlnfoList",
            //     name: "分页查询签到详情",
            //     meta: { title: "签到详情", icon: "tree" },
            //     component: () =>
            //         import ('@/views/operationalData/signlnlnfoList')
            // },
            {
                path: "/views/operationalData/signlnList",
                name: "签到系统",
                meta: { title: "签到系统", icon: "tree" },
                component: () =>
                    import ('@/views/operationalData/signlnList')
            },
            {
                path: "/views/operationalData/vipList",
                name: "vip系统",
                meta: { title: "vip系统", icon: "tree" },
                component: () =>
                    import ('@/views/operationalData/vipList')
            },
            {
                path: "/views/operationalData/wholeDataPageList",
                name: "整体数据",
                meta: { title: "整体数据", icon: "tree" },
                component: () =>
                    import ('@/views/operationalData/wholeDataPageList')
            },
        ]
    },
    {
        path: "/view/gameData",
        component: Layout,
        // redirect: '/caidan/',
        name: '游戏数据',
        alwaysShow: true,
        meta: { title: "游戏数据", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
                path: "/views/gameData/checkPointMonitoring",
                name: "关卡监控",
                meta: { title: "关卡监控", icon: "tree" },
                component: () =>
                    import ('@/views/gameData/checkPointMonitoring')
            },
            // {
            //     path: "/views/gameData/economicSituation",
            //     name: "经济概况",
            //     meta: { title: "经济概况", icon: "tree" },
            //     component: () =>
            //         import ('@/views/gameData/economicSituation')
            // },
            {
                path: "/views/gameData/playerMonitoring",
                name: "玩家监控",
                meta: { title: "玩家监控", icon: "tree" },
                component: () =>
                    import ('@/views/gameData/playerMonitoring')
            },
            {
                path: "/views/gameData/goldCoinMonitoring",
                name: "定时金币监控",
                meta: { title: "定时金币监控", icon: "tree" },
                component: () =>
                    import ('@/views/gameData/goldCoinMonitoring')
            },
            // {
            //     path: "/views/gameData/activityMonitoring",
            //     name: "活动监控",
            //     meta: { title: "活动监控", icon: "tree" },
            //     component: () =>
            //         import ('@/views/gameData/activityMonitoring')
            // },
            {
                path: "/views/gameData/playerManagementCardMonitoring",
                name: "玩家关卡监控",
                meta: { title: "玩家关卡监控", icon: "tree" },
                component: () =>
                    import ('@/views/gameData/playerManagementCardMonitoring')
            },
            {
                path: "/views/gameData/playerLoginLog",
                name: "玩家登录日志",
                meta: { title: "玩家登录日志", icon: "tree" },
                component: () =>
                    import ('@/views/gameData/playerLoginLog')
            },
            // {
            //     path: "/views/gameData/inventoryChanges",
            //     name: "库存变化",
            //     meta: { title: "库存变化", icon: "tree" },
            //     component: () =>
            //         import ('@/views/gameData/inventoryChanges')
            // },
            {
                path: "/views/gameData/dayEconomicSituation",
                name: "玩家当日经济概况",
                meta: { title: "玩家当日经济概况", icon: "tree" },
                component: () =>
                    import ('@/views/gameData/dayEconomicSituation')
            },
        ]
    },

    {
        path: "/views/configManage",
        component: Layout,
        // redirect: '/caidan/',
        name: '配置管理',
        alwaysShow: true,
        meta: { title: "配置管理", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
                path: "/views/configManage/actconfig",
                name: "广播配置",
                meta: { title: "广播配置", icon: "tree" },
                component: () =>
                    import ('@/views/configManage/actconfig')
            },
            {
                path: "/views/configManage/gameActivitconfig",
                name: "游戏活动配置",
                meta: { title: "游戏活动配置", icon: "tree" },
                component: () =>
                    import ('@/views/configManage/gameActivitconfig')
            },
            {
                path: "/views/configManage/tokenConfig",
                name: "代币配置",
                meta: { title: "代币配置", icon: "tree" },
                component: () =>
                    import ('@/views/configManage/tokenConfig')
            },
        ]
    },

    {
        path: "/views/playerGames",
        component: Layout,
        // redirect: '/caidan/',
        name: '游戏玩家',
        alwaysShow: true,
        meta: { title: "游戏玩家", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
                path: "/views/playerGames/newPlayer",
                name: "新增玩家",
                meta: { title: "新增玩家", icon: "tree" },
                component: () =>
                    import ('@/views/playerGames/newPlayer')
            },
            {
                path: "/views/playerGames/activePlayer",
                name: "活跃玩家",
                meta: { title: "活跃玩家", icon: "tree" },
                component: () =>
                    import ('@/views/playerGames/activePlayer')
            },
            {
                path: "/views/playerGames/remainPlayer",
                name: "玩家留存",
                meta: { title: "玩家留存", icon: "tree" },
                component: () =>
                    import ('@/views/playerGames/remainPlayer')
            },
            {
                path: "/views/playerGames/payInto",
                name: "付费玩家",
                meta: { title: "付费玩家", icon: "tree" },
                component: () =>
                    import ('@/views/playerGames/payInto')
            },
            {
                path: "/views/playerGames/returnPlayer",
                name: "玩家流失",
                meta: { title: "玩家流失", icon: "tree" },
                component: () =>
                    import ('@/views/playerGames/returnPlayer')
            },
            // {
            //     path: "/views/playerGames/habitPlayer",
            //     name: "游戏习惯",
            //     meta: { title: "游戏习惯", icon: "tree" },
            //     component: () =>
            //         import ('@/views/playerGames/habitPlayer')
            // },
        ]
    },

    {
        path: "/views/gmCenter",
        component: Layout,
        // redirect: '/caidan/',
        name: 'GM中心',
        alwaysShow: true,
        meta: { title: "GM中心", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
                path: "/views/gmCenter/mailSend",
                name: "普通邮件",
                meta: { title: "普通邮件", icon: "tree" },
                component: () =>
                    import ('@/views/gmCenter/mailSend')
            },
            {
                path: "/views/gmCenter/infomanage",
                name: "账号信息及管理",
                meta: { title: "账号信息及管理", icon: "tree" },
                component: () =>
                    import ('@/views/gmCenter/infomanage')
            },
            {
                path: "/views/gmCenter/seniormail",
                name: "高级邮件",
                meta: { title: "高级邮件", icon: "tree" },
                component: () =>
                    import ('@/views/gmCenter/seniormail')
            },
            {
                path: "/views/gmCenter/senniorinfo",
                name: "高级账号信息及管理",
                meta: { title: "高级账号信息及管理", icon: "tree" },
                component: () =>
                    import ('@/views/gmCenter/senniorinfo')
            },
            {
                path: "/views/gmCenter/gmmailReceiveList",
                name: "邮件接收列表",
                meta: { title: "邮件接收列表", icon: "tree" },
                component: () =>
                    import ('@/views/gmCenter/gmmailReceiveList')
            },
            {
                path: "/views/gmCenter/whileList",
                name: "白名单",
                meta: { title: "白名单", icon: "tree" },
                component: () =>
                    import ('@/views/gmCenter/whileList')
            },

            {
                path: "/views/gmCenter/accountBind",
                name: "账号绑定",
                meta: { title: "账号绑定", icon: "tree" },
                component: () =>
                    import ('@/views/gmCenter/accountBind')
            },
            {
                path: "/views/gmCenter/playerMail",
                name: "玩家邮件",
                meta: { title: "玩家邮件", icon: "tree" },
                component: () =>
                    import ('@/views/gmCenter/playerMail')
            },
            {
                path: "/views/gmCenter/playeWinControl",
                name: "单点控制",
                meta: { title: "单点控制", icon: "tree" },
                component: () =>
                    import ('@/views/gmCenter/playeWinControl')
            },
            {
                path: "/views/gmCenter/testPlayer",
                name: "测试玩家",
                meta: { title: "测试玩家", icon: "tree" },
                component: () =>
                    import ('@/views/gmCenter/testPlayer')
            },
        ]
    },

    {
        path: "/views/buryingPoint",
        component: Layout,
        // redirect: '/caidan/',
        name: '埋点',
        alwaysShow: true,
        meta: { title: "埋点", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [
            // {
            //     path: "/views/gmCenter/mailSend",
            //     name: "普通邮件",
            //     meta: { title: "普通邮件", icon: "tree" },
            //     component: () =>
            //         import ('@/views/gmCenter/mailSend')
            // },
            // {
            //     path: "/views/gmCenter/infomanage",
            //     name: "账号信息及管理",
            //     meta: { title: "账号信息及管理", icon: "tree" },
            //     component: () =>
            //         import ('@/views/gmCenter/infomanage')
            // },
            {
                path: "/views/buryingPoint/checkpointRemainList",
                name: "机台详情",
                meta: { title: "机台详情", icon: "tree" },
                component: () =>
                    import ('@/views/buryingPoint/checkpointRemainList')
            },
            {
                path: "/views/buryingPoint/buriedlevelRemain",
                name: "等级留存",
                meta: { title: "等级留存", icon: "tree" },
                component: () =>
                    import ('@/views/buryingPoint/buriedlevelRemain')
            },
            {
                path: "/views/buryingPoint/systemButton",
                name: "系统点击使用率",
                meta: { title: "系统点击使用率", icon: "tree" },
                component: () =>
                    import ('@/views/buryingPoint/systemButton')
            },

            {
                path: "/views/buryingPoint/freeCoinFlopReset",
                name: "免费金币",
                meta: { title: "免费金币", icon: "tree" },
                component: () =>
                    import ('@/views/buryingPoint/freeCoinFlopReset')
            },

            {
                path: "/views/buryingPoint/feedBack",
                name: "客服反馈",
                meta: { title: "客服反馈", icon: "tree" },
                component: () =>
                    import ('@/views/buryingPoint/feedBack')
            },
            {
                path: "/views/buryingPoint/loginLoss",
                name: "登录流失表",
                meta: { title: "登录流失表", icon: "tree" },
                component: () =>
                    import ('@/views/buryingPoint/loginLoss')
            },
            {
                path: "/views/buryingPoint/questData",
                name: "成就任务统计",
                meta: { title: "成就任务统计", icon: "tree" },
                component: () =>
                    import ('@/views/buryingPoint/questData')
            },

            {
                path: "/views/buryingPoint/checkpointGoBroke",
                name: "管卡破产统计",
                meta: { title: "管卡破产统计", icon: "tree" },
                component: () =>
                    import ('@/views/buryingPoint/checkpointGoBroke')
            },

            {
                path: "/views/buryingPoint/buriedCheckData",
                name: "数据校验",
                meta: { title: "数据校验", icon: "tree" },
                component: () =>
                    import ('@/views/buryingPoint/buriedCheckData')
            },

            {
                path: "/views/buryingPoint/playerBehaviourAnalysis",
                name: "玩家行为记录",
                meta: { title: "玩家行为记录", icon: "tree" },
                component: () =>
                    import ('@/views/buryingPoint/playerBehaviourAnalysis')
            },
        ]
    },



    {
        path: "/views/advertisingAnalysis",
        component: Layout,
        // redirect: '/caidan/',
        name: '广告分析',
        alwaysShow: true,
        meta: { title: "广告分析", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
                path: "/views/advertisingAnalysis/mopubAdIncome",
                name: "广告收益",
                meta: { title: "广告收益", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/mopubAdIncome')
            },
            {
                path: "/views/advertisingAnalysis/adPlace",
                name: "广告位置",
                meta: { title: "广告位置", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adPlace')
            },
            {
                path: "/views/advertisingAnalysis/adForecast",
                name: "预估收益",
                meta: { title: "预估收益", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adForecast')
            },

            {
                path: "/views/advertisingAnalysis/adRevenueTotal",
                name: "广告总收益",
                meta: { title: "广告总收益", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adRevenueTotal')
            },

            {
                path: "/views/advertisingAnalysis/adRecycleByAdSet",
                name: "市场投放回收-adSet级别",
                meta: { title: "市场投放回收-adSet级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adRecycleByAdSet')
            },
            {
                path: "/views/advertisingAnalysis/adRecycleByApp",
                name: "市场投放回收-app级别",
                meta: { title: "市场投放回收-app级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adRecycleByApp')
            },

            {
                path: "/views/advertisingAnalysis/adRecycleByCampaign",
                name: "市场投放回收-campaign级别",
                meta: { title: "市场投放回收-campaign级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adRecycleByCampaign')
            },

            {
                path: "/views/advertisingAnalysis/adRecycleByMediaSource",
                name: "市场投放回收-mediaSource级别",
                meta: { title: "市场投放回收-mediaSource级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adRecycleByMediaSource')
            },

            {
                path: "/views/advertisingAnalysis/adRemainByAdSet",
                name: "市场投放留存-adSet级别",
                meta: { title: "市场投放留存-adSet级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adRemainByAdSet')
            },

            {
                path: "/views/advertisingAnalysis/adRemainByApp",
                name: "市场投放留存-app级别",
                meta: { title: "市场投放留存-app级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adRemainByApp')
            },

            {
                path: "/views/advertisingAnalysis/adRemainByCampaign",
                name: "市场投放留存-campaign级别",
                meta: { title: "市场投放留存-campaign级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adRemainByCampaign')
            },

            {
                path: "/views/advertisingAnalysis/adRemainByMediaSource",
                name: "市场投放留存-mediasource级别",
                meta: { title: "市场投放留存-mediasource级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/adRemainByMediaSource')
            },

            {
                path: "/views/advertisingAnalysis/advertisementInjectingByApp",
                name: "市场投放-app级别",
                meta: { title: "市场投放-app级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/advertisementInjectingByApp')
            },

            {
                path: "/views/advertisingAnalysis/advertisementInjectingByCampaign",
                name: "市场投放-campaign级别",
                meta: { title: "市场投放-campaign级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/advertisementInjectingByCampaign')
            },

            {
                path: "/views/advertisingAnalysis/advertisementInjectingByMediaSource",
                name: "市场投放-mediaSource级别",
                meta: { title: "市场投放-mediaSource级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/advertisementInjectingByMediaSource')
            },

            {
                path: "/views/advertisingAnalysis/advertisementInjectingByPartner",
                name: "市场投放-代理级别",
                meta: { title: "市场投放-代理级别", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/advertisementInjectingByPartner')
            },

            {
                path: "/views/advertisingAnalysis/reviseAdEcpm",
                name: "校正ECPM",
                meta: { title: "校正ECPM", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/reviseAdEcpm')
            },

            {
                path: "/views/advertisingAnalysis/updateAdRevenueTotal",
                name: "更新广告收益",
                meta: { title: "更新广告收益", icon: "tree" },
                component: () =>
                    import ('@/views/advertisingAnalysis/updateAdRevenueTotal')
            },
        ]
    },

    {
        path: "/views/taiwanData",
        component: Layout,
        // redirect: '/caidan/',
        name: '台湾数据',
        alwaysShow: true,
        meta: { title: "台湾数据", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
                path: "/views/taiwanData/coreData",
                name: "核心数据",
                meta: { title: "核心数据", icon: "tree" },
                component: () =>
                    import ('@/views/taiwanData/coreData')
            },
            {
                path: "/views/taiwanData/reportData",
                name: "数据报表",
                meta: { title: "数据报表", icon: "tree" },
                component: () =>
                    import ('@/views/taiwanData/reportData')
            }
        ]
    },






    {
        path: "/views/onlineAnalysis",
        component: Layout,
        // redirect: '/caidan/',
        name: '在线分析',
        alwaysShow: true,
        meta: { title: "在线分析", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
            path: "/views/onlineAnalysis/onlineAnalysis",
            name: "在线分析",
            meta: { title: "在线分析", icon: "tree" },
            component: () =>
                import ('@/views/onlineAnalysis/onlineAnalysis')
        }]
    },

    {
        path: "/views/incomeAnalysis",
        component: Layout,
        // redirect: '/caidan/',
        name: '收入分析',
        alwaysShow: true,
        meta: { title: "收入分析", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
                path: "/views/incomeAnalysis/incomeData",
                name: "收入数据",
                meta: { title: "收入数据", icon: "tree" },
                component: () =>
                    import ('@/views/incomeAnalysis/incomeData')
            },

            {
                path: "/views/incomeAnalysis/payPenetration",
                name: "付费渗透",
                meta: { title: "付费渗透", icon: "tree" },
                component: () =>
                    import ('@/views/incomeAnalysis/payPenetration')
            },
            {
                path: "/views/incomeAnalysis/newPlayerValue",
                name: "新玩家价值",
                meta: { title: "新玩家价值", icon: "tree" },
                component: () =>
                    import ('@/views/incomeAnalysis/newPlayerValue')
            },
            {
                path: "/views/incomeAnalysis/payingHabits",
                name: "付费习惯",
                meta: { title: "付费习惯", icon: "tree" },
                component: () =>
                    import ('@/views/incomeAnalysis/payingHabits')
            },
        ]
    },

    {
        path: "/views/levelAnalysis",
        component: Layout,
        // redirect: '/caidan/',
        name: '等级分析',
        alwaysShow: true,
        meta: { title: "等级分析", icon: "caidan" },
        // component: () =>
        //     import ('@/views/role/index'),
        //userNo: sessionStorage.getItem("userNo"),
        children: [{
                path: "/views/levelAnalysis/levelDetail",
                name: "等级详情",
                meta: { title: "等级详情", icon: "tree" },
                component: () =>
                    import ('@/views/levelAnalysis/levelDetail')
            },

            {
                path: "/views/levelAnalysis/levelSpread",
                name: "等级分布",
                meta: { title: "等级分布", icon: "tree" },
                component: () =>
                    import ('@/views/levelAnalysis/levelSpread')
            },
            {
                path: "/views/levelAnalysis/newPlayerProgress",
                name: "新玩家进度",
                meta: { title: "新玩家进度", icon: "tree" },
                component: () =>
                    import ('@/views/levelAnalysis/newPlayerProgress')
            },



        ]
    },



    // {
    //     path: "/user_list",
    //     component: Layout,
    //     // redirect: '/caidan/',
    //     name: '用户管理',
    //     alwaysShow: true,
    //     meta: { title: "用户管理", icon: "caidan" },
    //     // userNo:sessionStorage.getItem("userNo"),
    //     children: [{
    //             path: "/user_list",
    //             name: "用户管理",
    //             meta: { title: "用户管理", icon: "tree" },
    //             component: () =>
    //                 import ('@/views/users/index')
    //         },


    //     ]
    // },

    // {
    //     path: "string",
    //     component: Layout,
    //     // redirect: '/caidan/',
    //     name: '角色管理',
    //     alwaysShow: true,
    //     meta: { title: "角色管理", icon: "caidan" },
    //     // component: () =>
    //     //     import ('@/views/role/index'),
    //     //  userNo: sessionStorage.getItem("userNo"),
    //     children: [{
    //             path: "/role_list",
    //             name: "角色管理",
    //             meta: { title: "角色管理页", icon: "tree" },
    //             component: () =>
    //                 import ('@/views/role/index')
    //         },
    //         {
    //             path: "/view/role",
    //             name: "部门角色",
    //             meta: { title: "部门角色", icon: "tree" },
    //             component: () =>
    //                 import ('@/views/role/meunRole')
    //         },
    //     ]
    // },
    // {
    //     path: "/view/department",
    //     component: Layout,
    //     // redirect: '/caidan/',
    //     name: '部门管理',
    //     alwaysShow: true,
    //     meta: { title: "部门管理", icon: "caidan" },
    //     // component: () =>
    //     //     import ('@/views/role/index'),
    //     //userNo: sessionStorage.getItem("userNo"),
    //     children: [{
    //             path: "/view/depart",
    //             name: "部门管理",
    //             meta: { title: "部门管理", icon: "tree" },
    //             component: () =>
    //                 import ('@/views/department/index')
    //         },
    //         {
    //             path: "/view/user",
    //             name: "部门用户",
    //             meta: { title: "部门用户", icon: "tree" },
    //             component: () =>
    //                 import ('@/views/departUser/index')
    //         },

    //     ]
    // },
    // {
    //     path: "/view/api",
    //     component: Layout,
    //     // redirect: '/caidan/',
    //     name: '系统api管理',
    //     alwaysShow: true,
    //     meta: { title: "系统api管理", icon: "caidan" },
    //     // component: () =>
    //     //     import ('@/views/role/index'),
    //     //userNo: sessionStorage.getItem("userNo"),
    //     children: [{
    //             path: "/view/api/index",
    //             name: "系统api",
    //             meta: { title: "api管理", icon: "tree" },
    //             component: () =>
    //                 import ('@/views/api/index')
    //         },


    //     ]
    // },

    // { path: '*', redirect: '/404', hidden: true }
]

export default router
// export default new Router({
//   routes: asyncRouterMap
// })