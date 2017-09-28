const SecurityData = function (name, account, password, host, url, remark) {
    this.name = name;
    this.account = account;
    this.password = password;
    this.host = host;
    this.url = url;
    this.remark = remark;
    this.icon = 'http://www.baidu.com/favicon.ico'
};

SecurityData.create = function (data) {
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
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', ''),
    ]
};

const getters = {
    GET_SECURITY_LIST(state) {
        return state.list;
    }
};

const mutations = {
    SAVE_SECURITY_DATA(state, data) {
        let SecurityDataItem = new SecurityData(
            data.name,
            data.account,
            data.password,
            data.host,
            data.url,
            data.remark);
        state.list.push(SecurityDataItem);
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
            arg.icon = element.origin + '/favicon.ico';
        }
        context.commit('SAVE_SECURITY_DATA', arg);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};
