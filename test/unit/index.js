import Vue from 'vue'
Vue.config.devtools = false
Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src/renderer', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)

// Statements: 语句覆盖率，执行到每个语句；
// Branches: 分支覆盖率，执行到每个if代码块；
// Functions: 函数覆盖率，调用到程式中的每一个函数；
// Lines: 行覆盖率, 执行到程序中的每一行。