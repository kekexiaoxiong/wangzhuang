import { login, logout, getInfo, getList, getList2 } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

import { asyncRouterMap, constantRoutes, aRouter } from '@/router';

function hasPermission(menus, route) {

    if (route.path) {
        return menus.indexOf(route.path) > -1

    } else {
        return true
    }
}


const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        menuList: '',
        menuList2: '',





        accessedRouters: '',
        routers: constantRoutes,
        addRouters: [],
        userNo: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_MEUNLIST: (state, menuList) => {
        state.menuList = menuList
    },

    SET_MEUNLIST2: (state, menuList2) => {
        state.menuList2 = menuList2
    },
    // SET_ROUTERS: (state, accessedRouters) => {
    //     state.accessedRouters = accessedRouters
    // },

    SET_ROUTERS: (state, routers) => {
        state.addRouters = routers;
        state.routers = constantRoutes.concat(routers);

    },
    SET_USERNO: (state, userNo) => {
        state.userNo = userNo
    }
}




function filterAsyncRouter(asyncRouterMap, menus) {
    console.log(asyncRouterMap)
    const accessedRouters = asyncRouterMap.filter(route => {
        //filter,js语法里数组的过滤筛选方法

        if (hasPermission(menus, route)) {
            if (route.children && route.children.length) {
                //如果这个路由下面还有下一级的话,就递归调用
                route.children = filterAsyncRouter(route.children, menus)
                    //如果过滤一圈后,没有子元素了,这个父级菜单就也不显示了
                return (route.children && route.children.length)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ accountNo: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                const { userName, accountNo, userNo } = data
                commit('SET_NAME', userName)
                commit('SET_AVATAR', accountNo)
                commit('SET_USERNO', userNo)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },


    GenerateRoutes({ commit }, data) {
        return new Promise(resolve => {

            let newRouterMap = asyncRouterMap
            for (let item of data) {
                newRouterMap.push(item)
            }
            console.log(newRouterMap)


            let accessedRouters
                //   accessedRouters = asyncRouterMap
                //    "菜单管理", "用户管理", "角色管理", "菜单管理页", "角色管理页", "哈哈哈", "bbb"

            let menuList = []
                // for (let item of newRouterMap) {
                //     menuList.push(item.path)
                //     if (item.children) {
                //         for (let index of item.children) {
                //             menuList.push(index.path)
                //         }
                //     }
                // }



            for (let item in data) {
                if (data[item].menuRouter) {
                    menuList.push(data[item].menuRouter);
                }

                if (data[item].children) {
                    for (let i of data[item].children) {
                        menuList.push(i.menuRouter);
                    }
                }
            }



            accessedRouters = menuList

            accessedRouters = filterAsyncRouter(asyncRouterMap, menuList)

            // const accessedRouters = asyncRouterMap.filter(v => {
            //     // if (roles.indexOf('admin') >= 0) return true;
            //     if (hasPermission(data, v)) {

            //         if (v.children && v.children.length > 0) {
            //             v.children = v.children.filter(child => {
            //                 if (hasPermission(data.children, child)) {
            //                     return child
            //                 }
            //                 return false;
            //             });
            //             return v
            //         } else {
            //             return v
            //         }
            //     }
            //     return false;
            // });
            commit('SET_ROUTERS', accessedRouters);
            resolve();
        })
    },


    getList({ commit }) {
        return new Promise((resolve, reject) => {
            getList().then(response => {
                const { data } = response;
                const menuList = data;

                // if (!data) {
                //     return reject('Verification failed, please Login again.')
                // }
                // const { name } = data
                // const { data } = data
                commit('SET_MEUNLIST', menuList)
                    //  commit('SET_NAME', name)
                resolve(menuList)
            }).catch(error => {
                reject(error)
            })

        })
    },


    getList2({ commit }) {
        return new Promise((resolve, reject) => {
            getList2().then(response => {

                const { data } = response;
                const menuList2 = data;

                // if (!data) {
                //     return reject('Verification failed, please Login again.')
                // }
                // const { name } = data
                // const { data } = data
                commit('SET_MEUNLIST2', menuList2)
                    //  commit('SET_NAME', name)

                resolve(menuList2)
            }).catch(error => {
                reject(error)
            })

        })
    },







    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}