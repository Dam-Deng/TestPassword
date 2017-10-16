import Vue from 'vue';
import Page from '@/pages/HomePage';
import router from '@/router';

describe('HomePage.vue', () => {
    it('初始化信息', () => {
        expect(Page.data).to.be.a('function');
        const defaultData = Page.data();
        expect(defaultData.searchKey).to.be.equal('');
    });

    it('render 页面', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            router,
            render: h => h(Page)
        }).$mount();

        expect(vm.$el.querySelectorAll('.security-list').length).to.be.equal(1);
        expect(vm.$el.querySelectorAll('.security-list .security-item').length).to.be.equal(0);
        expect(vm.$el.textContent).to.be.contain('账号');
        expect(vm.$el.textContent).to.be.contain('密码');
    });
});
