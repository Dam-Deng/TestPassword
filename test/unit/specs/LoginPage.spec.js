import Vue from 'vue';
import Page from '@/pages/LoginPage';

describe('LoginPage.vue', () => {
    it('初始化信息', () => {
        expect(Page.data).to.be.a('function');
        const defaultData = Page.data();
        expect(defaultData.password).to.be.equal('');
    });

    it('render 页面', () => {
        const Ctor = Vue.extend(Page);
        const vm = new Ctor().$mount();
        expect(vm.$el.textContent).to.be.contain('Main Password');
    });
});
