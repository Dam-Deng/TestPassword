<template>
    <section class="login-section">
        <div class="row">
            <div class="input-field col s12">
                <input
                        id="password"
                        ref="password"
                        type="password"
                        class="validate"
                        v-model="password"
                        v-on:keyup.enter="submit">
                <label for="password" :class="password ? 'active': ''">Main Password</label>
            </div>
        </div>
    </section>
</template>

<script>
    import router from '@/router/index';

    export default {
        data: function () {
            return {
                password: ''
            }
        },
        mounted: function () {
            this.$refs.password.focus();
        },
        methods: {
            submit: function () {
                if(this.password === ''){
                    return ;
                }

                let key = localStorage.getItem('test-password-login-key');
                if(key === null){
                    localStorage.setItem('test-password-login-key', this.password);
                    router.push('Home');
                }else if (this.password === key) {
                    router.push('Home');
                }else{
                    alert('密码错误');
                }
            }
        }
    }
</script>

<style lang="scss">
    .login-section {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
        > .row {
            width: 80%;
        }
    }
</style>