<template>
    <div>
        <input id="password" :type="inputType" :value="value" @input="input"/>
        <label for="password">密码</label>
        <i class="material-icons password-visibility-icon" @click="togglePasswordType">{{passwordIcon}}</i>
        <button class="waves-effect waves-light btn absolute-btn" type="button">生成密码</button>
    </div>
</template>


<script>
    export default {
        data: function () {
            return {
                inputType: 'password',
                passwordIcon: 'visibility_off',
            }
        },
        props: {
            value: {
                type: String
            }
        },
        computed: {
        },
        methods: {
            input: function (e) {
                this.$emit('input', e.target.value);
            },
            togglePasswordType: function () {
                if (this.inputType === 'text') {
                    this.inputType = 'password';
                    this.passwordIcon = 'visibility_off';
                }else{
                    this.inputType = 'text';
                    this.passwordIcon = 'visibility';
                }
            }
        }
    }
</script>