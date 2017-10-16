import Vue from 'vue';
import Page from '@/pages/SecurityFormPage';
import router from '@/router';

describe('SecurityFormPage.vue', () => {
    it('初始化信息', () => {
        expect(Page.data).to.be.a('function');
        const defaultData = Page.data();
        expect(defaultData.name).to.be.equal('');
        expect(defaultData.account).to.be.equal('');
        expect(defaultData.password).to.be.equal('');
        expect(defaultData.url).to.be.equal('');
        expect(defaultData.remark).to.be.equal('');
        expect(Page.computed.canSubmit()).to.be.equal('disabled');
    });

    it('render 页面', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            router,
            render: h => h(Page)
        }).$mount();

        expect(vm.$el.textContent).to.be.contain('账号');
        expect(vm.$el.textContent).to.be.contain('密码');
    });
});
