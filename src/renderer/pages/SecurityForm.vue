<template>
    <section class="security-form-section">
        <nav>
            <div class="nav-wrapper">
                <router-link :to="{name: 'Home'}"><i class="material-icons back-icon">arrow_back</i></router-link>
                <span class="nav-header-title">新增</span>
            </div>
        </nav>
        <form class="" @submit.stop.prevent="onSubmit">
            <div class="row">
                <div class="input-field col s12">
                    <input id="name" type="text" v-model="name"/>
                    <label for="name">名称</label>
                </div>
                <div class="input-field col s12">
                    <input id="account" type="text" v-model="account"/>
                    <label for="account">账号</label>
                </div>
                <div class="input-field col s12">
                    <Password v-model="password"></Password>
                </div>
                <div class="input-field col s12">
                    <input id="url" type="url" v-model="url" class="validate"/>
                    <label for="url">网址</label>
                    <!--<button class="waves-effect waves-light btn absolute-btn" type="button">抓取数据</button>-->
                </div>
                <div class="input-field col s12">
                    <input id="remark" type="text" v-model="remark"/>
                    <label for="remark">备注</label>
                </div>
                <!--<div class="collapse">-->
                <!--<div class="input-field col s12">-->
                <!--<input id="host" type="url" v-model="host"/>-->
                <!--<label for="host">主网站</label>-->
                <!--</div>-->
                <!--<div class="input-field col s12">-->
                <!--<textarea id="keyword" class="materialize-textarea" v-model="keyword"></textarea>-->
                <!--<label for="keyword">关键字</label>-->
                <!--</div>-->
                <!--</div>-->
                <div class="center clearfix">
                    <button class="waves-effect waves-light btn-floating btn-large" :class="canSubmit" type="submit">
                        OK
                    </button>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import Password from '@/components/Password.vue';
    import store from '@/store/index';
    import router from '@/router/index';

    export default {
        data: function () {
            return {
                name: '百度网盘',
                account: '240242398@qq.com',
                password: 'baidu441732703',
                url: 'https://pan.baidu.com/',
                remark: '',
            }
        },
        computed: {
            canSubmit: function () {
                if (this.account && this.password && this.name) {
                    return 'pulse';
                } else {
                    return 'disabled';
                }
            }
        },
        components: {
            Password
        },
        methods: {
            reset: function () {
                this.name = '';
                this.account = '';
                this.password = '';
                this.url = '';
                this.remark = '';
            },
            onSubmit: function () {
                store.dispatch('SAVE_SECURITY_DATA', {
                    name: this.name,
                    account: this.account,
                    password: this.password,
                    url: this.url,
                    remark: this.remark
                });
                this.reset();
                router.replace({name: 'Home'});
            }
        }
    }
</script>


<style lang="scss">
    .input-field {
        /*po*/
        .absolute-btn {
            position: absolute;
            right: 10px;
            top: 6px;
            padding: 0 12px;
            font-size: 0.8rem;
        }
        .password-visibility-icon {
            position: absolute;
            right: 90px;
            top: 12px;
            cursor: pointer;
            /*padding: 0 12px;*/
            /*font-size: 0.8rem;*/
        }
    }

    nav {
        background-color: black;
    }

    nav i.back-icon {
        display: inline-block;
        padding: 0 12px;
    }

    form {
        margin-top: 15px;
    }

    .nav-header-title {
        font-size: 1.8rem;
    }
</style>