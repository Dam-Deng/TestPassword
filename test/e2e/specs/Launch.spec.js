import utils from '../utils';

describe('Launch', function () {
    beforeEach(utils.beforeEach);
    afterEach(utils.afterEach);

    it('窗口基本情况', async function () {
        const win = this.app.browserWindow;
        let client = this.app.client;

        expect(await client.getWindowCount()).to.equal(1);
        expect(await win.isMinimized()).to.equal(false);
        expect(await win.isDevToolsOpened()).to.equal(false);
        expect(await win.isVisible()).to.equal(true);

        const {width, height} = await win.getBounds();
        expect(width).to.above(0);
        expect(height).to.above(0);

        expect(await client.getTitle()).to.equal('test-password');
    });

    it('项目流程', async function () {
        // 设置测试的超时时间，并且浏览窗口要顶置
        this.timeout(150000);

        let client = this.app.client;
        // 登入流程
        expect(await client.getUrl()).to.equal(utils.indexPath);
        await client.setValue('#password', '123456');
        await this.app.webContents.sendInputEvent({type: 'keyUp', keyCode: 'Return'});
        await expect(await client.getUrl()).to.equal(utils.indexPath + 'home');

        // 创建流程
        await client.waitForExist('#addBtn');
        await client.click('#addBtn');
        await expect(await client.getUrl()).to.equal(utils.indexPath + 'security-form');

        await client.waitForExist('#formTitle');
        expect(await client.getText('#formTitle')).to.equal('新增');

        await client.setValue('#name', '测试名称');
        await client.setValue('#account', 'my_account');
        await client.click('#genPassword');
        await client.click('#confirmGenPassword');
        await client.setValue('#url', 'http://www.baidu.com');
        await client.setValue('#remark', '测试数据');
        await client.click('#secrurityFormSubmitBtn');
        await expect(await client.getUrl()).to.equal(utils.indexPath + 'home');

        await client.waitForExist('#addBtn');
        expect(await client.getText('#securityList')).to.be.contain('测试名称');

    });
});
