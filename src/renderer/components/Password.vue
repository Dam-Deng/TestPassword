<template>
    <div>
        <input ref="password" id="password" :type="inputType" :value="value" @input="input"/>
        <label for="password">密码</label>
        <i class="material-icons password-visibility-icon" @click="togglePasswordType">{{passwordIcon}}</i>
        <button class="waves-effect waves-light btn absolute-btn" type="button" @click="openDialog">生成密码
        </button>

        <section class="model-section" :class="modalClass">
            <div ref="modal1" class="modal">
                <div class="modal-content">
                    <div class="row" style="margin-bottom: 0">
                        <div class="input-field col s10">
                            <p class=" range-field">
                                <input name="passwordLength" type="range" min="0" max="100" v-model="passwordLength" />
                            </p>
                        </div>
                        <div class="input-field col s2">
                            <input id="passwordLengthText" type="number" v-model="passwordLength"/>
                            <label for="passwordLengthText">长度</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="modal-action modal-close waves-effect waves-red btn-flat" type="button" @click="closeModal">取消</button>
                    <button class="modal-action modal-close waves-effect waves-green btn-flat" type="button" @click="genNewPassword">确定</button>
                </div>
            </div>
            <div class="model-bg" @click="closeModal"></div>
        </section>
    </div>
</template>


<script>
    export default {
        data: function () {
            return {
                inputType: 'password',
                passwordIcon: 'visibility_off',
                modalClass: 'modal-close',
                modalBGClass: 'hidden',
                passwordLength: 12
            }
        },
        props: {
            value: {
                type: String
            }
        },
        computed: {},
        methods: {
            input: function (e) {
                this.$emit('input', e.target.value);
            },
            togglePasswordType: function () {
                if (this.inputType === 'text') {
                    this.inputType = 'password';
                    this.passwordIcon = 'visibility_off';
                } else {
                    this.inputType = 'text';
                    this.passwordIcon = 'visibility';
                }
            },
            openDialog: function (ref) {
//                this.$refs[ref].open();
                this.modalClass = 'modal-open';
            },
            closeModal: function () {
                this.modalClass = '';
            },
            genNewPassword: function () {
                let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; //去除易混淆的字符
                let length = this.passwordLength || 12;
                let password = '';
                for (let i = 0; i < length; i++){
                    password += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                this.$emit('input', password);
                this.$refs.password.focus();
                this.closeModal();
            }
        }
    }
</script>

<style lang="scss">
    .model-section{
        display: none;
        z-index: 100;
    }
    .modal-open{
        display: block;
    }

    .modal {
        display: block;
        z-index: 200;
        transform: translateY(-20px);
    }

    .model-bg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 150;
        background-color: rgba(0, 0, 0, 0.5);
    }

    #passwordLengthText{
        border-bottom: 0;
    }
</style>