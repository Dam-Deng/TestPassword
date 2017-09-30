import DB from '@/store/db'

// const SecurityData = function (name, account, password, host, url, remark) {
//     this.name = name;
//     this.account = account;
//     this.password = password;
//     this.host = host;
//     this.url = url;
//     this.remark = remark;
//     this.icon = 'http://www.baidu.com/favicon.ico'
// };

const SecurityData = function (data) {
    this.name = data.name;
    this.account = data.account;
    this.password = data.password;
    this.host = data.host;
    this.url = data.url;
    this.remark = data.remark;
    this.icon = data.icon;
};

const state = {
    list: [
        // new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', ''),
        // new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', ''),
    ]
};

const getters = {
    GET_SECURITY_LIST(state) {
        return state.list;
    }
};

const mutations = {
    SAVE_SECURITY_DATA(state, data) {
        state.list.push(data);
    },
    DELETE_SECURITY_DATA(state, _id) {
        let index = state.list.findIndex(item => item._id === _id);
        state.list.splice(index, 1);
    },
    SAVE_SECURITY_LIST(state, list) {
        state.list = list;
    },
};

const actions = {
    GET_SECURITY_LIST(context) {
        // do something async
        // context.commit('SAVE_SECURITY_DATA');
    },
    SAVE_SECURITY_DATA(context, arg) {
        if (arg.url) {
            let element = document.createElement('a');
            element.href = arg.url;
            arg.host = element.origin;
            // arg.icon = element.origin + '/favicon.ico';
        }

        let item = new SecurityData(arg);
        DB.insert(item, function (data) {
            context.commit('SAVE_SECURITY_DATA', data);
        })
    },
    DELETE_SECURITY_DATA(context, arg) {
        if (arg._id) {
            DB.remove(arg._id,
                (numRemoved) => {
                    context.commit('DELETE_SECURITY_DATA', arg._id);
                });
        } else {
            alert('删除失败');
        }

    },
    SYNC_SECURITY_DATA(context) {
        DB.findAll(function (list) {
            context.commit('SAVE_SECURITY_LIST', list);
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};
