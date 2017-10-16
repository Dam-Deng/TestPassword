import electron from 'electron'
import path from 'path';
import {Application} from 'spectron'

export default {
    indexPath: `file://${path.resolve(__dirname, '../../')}/dist/electron/index.html#/`,
    afterEach() {
        this.timeout(10000)

        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }
    },
    beforeEach() {
        this.timeout(10000)
        this.app = new Application({
            path: electron,
            args: ['dist/electron/main.js'],
            startTimeout: 10000,
            waitTimeout: 10000
        })

        return this.app.start()
    }
}
