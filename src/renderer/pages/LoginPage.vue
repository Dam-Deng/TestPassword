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
                <label for="password">Main Password</label>
            </div>
        </div>
    </section>
</template>

<script>
    import router from '@/router/index';

    export default {
        data: function () {
            return {
                password: '123456'
            }
        },
        mounted: function () {
            this.$refs.password.focus();
        },
        methods: {
            submit: function () {
                if (this.password === '123456') {
                    router.push('Home');
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