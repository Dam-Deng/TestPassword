<template>
    <section class="security-form-section">
        <nav>
            <div class="nav-wrapper">
                <router-link :to="{name: 'Home'}"><i class="material-icons back-icon">arrow_back</i></router-link>
                <span class="nav-header-title">{{title}}</span>
            </div>
        </nav>
        <form class="" @submit.stop.prevent="onSubmit">
            <div class="row">
                <div class="input-field col s12">
                    <input id="name" type="text" v-model="name"/>
                    <label for="name" :class="name ? 'active': ''">名称</label>
                </div>
                <div class="input-field col s12">
                    <input id="account" type="text" v-model="account"/>
                    <label for="account" :class="account ? 'active': ''">账号</label>
                </div>
                <div class="input-field col s12">
                    <Password v-model="password"></Password>
                </div>
                <div class="input-field col s12">
                    <input id="url" type="url" v-model="url" class="validate"/>
                    <label for="url" :class="url ? 'active': ''">网址</label>
                    <!--<button class="waves-effect waves-light btn absolute-btn" type="button">抓取数据</button>-->
                </div>
                <div class="input-field col s12">
                    <input id="remark" type="text" v-model="remark"/>
                    <label for="remark" :class="remark ? 'active': ''">备注</label>
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
                    <button class="waves-effect waves-light btn-floating btn-large black" :class="canSubmit"
                            type="submit">
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
                password: '123456',
                url: 'https://pan.baidu.com/',
                remark: '',
                title: '新增'
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
        mounted: function () {
            if (this.$route.params._id) {
                this.title = '编辑';
                this.fetchData(this.$route.params._id);
            } else {
                this.reset();
            }
        },
//        watch: {
//            '$route' (to, from) {
//                console.log(to);
//                console.log(from);
//            }
//        },
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
                this.title = '新增'
            },
            fetchData: function (_id) {
                let item = store.getters.GET_SECURITY_ITEM(_id);
                this.name = item.name;
                this.account = item.account;
                this.password = item.password;
                this.url = item.url;
                this.remark = item.remark;
            },
            onSubmit: function () {
                if (this.account && this.password && this.name) {
                    if (this.$route.params._id) {
                        store.dispatch('UPDATE_SECURITY_DATA', {
                            _id: this.$route.params._id,
                            name: this.name,
                            account: this.account,
                            password: this.password,
                            url: this.url,
                            remark: this.remark
                        });
                    } else {
                        store.dispatch('SAVE_SECURITY_DATA', {
                            name: this.name,
                            account: this.account,
                            password: this.password,
                            url: this.url,
                            remark: this.remark
                        });
                    }
                    this.reset();
                    router.replace({name: 'Home'});
                }
            }
        }
    }
</script>


<style lang="scss">
    .security-form-section{
        height: 100vh;
    }
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