const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    menuList: state => state.user.menuList,
    menuList2: state => state.user.menuList2,
    accessedRouters: state => state.user.accessedRouters,
    routers: state => state.user.routers,
    addRouters: state => state.user.addRouters,
    userNo: state => state.user.userNo,
}
export default getters