const SecurityData = function (name, account, password, host, url, keyword, remark) {
    this.name = name;
    this.account = account;
    this.password = password;
    this.host = host;
    this.url = url;
    this.keyword = keyword;
    this.remark = remark;
    this.icon = 'http://www.baidu.com/favicon.ico'
};

const state = {
    list: [
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
        new SecurityData('百度网盘', '240242398@qq.com', 'baidu', 'https://pan.baidu.com', 'https://pan.baidu.com', '百度，网盘', ''),
        new SecurityData('微信公众平台', '240242398@qq.com', 'a', 'https://mp.weixin.qq.com', 'https://mp.weixin.qq.com', '微信公众平台', ''),
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
            data.keyword,
            data.remark);
        state.list.push(SecurityDataItem);
    },
};

const actions = {
    GET_SECURITY_LIST(context) {
        // do something async
        // context.commit('SAVE_SECURITY_DATA');
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
