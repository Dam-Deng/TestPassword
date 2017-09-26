<template>
    <section class="security-form-section">
        <form class="">
            <div class="row">
                <div class="input-field col s12">
                    <input id="name" type="text" v-model="name" required/>
                    <label for="name">名称</label>
                </div>
                <div class="input-field col s12">
                    <input id="account" type="text" v-model="account" required/>
                    <label for="account">账号</label>
                </div>
                <div class="input-field col s12">
                    <input id="password" type="password" v-model="password" required/>
                    <label for="password">密码</label>
                    <i class="material-icons password-visibility-icon">visibility</i>
                    <button class="waves-effect waves-light btn absolute-btn" type="button">生成密码</button>
                </div>
                <div class="input-field col s12">
                    <input id="url" type="url" v-model="url"/>
                    <label for="url">网址</label>
                    <button class="waves-effect waves-light btn absolute-btn" type="button">抓取数据</button>
                </div>
                <div class="collapse">
                    <div class="input-field col s12">
                        <input id="host" type="url" v-model="host"/>
                        <label for="host">主网站</label>
                    </div>
                    <div class="input-field col s12">
                        <textarea id="keyword" class="materialize-textarea" v-model="keyword"></textarea>
                        <label for="keyword">关键字</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="remark" type="text" v-model="remark"/>
                        <label for="remark">备注</label>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>


<style lang="scss">
    .input-field{
        /*po*/
        .absolute-btn{
            position: absolute;
            right: 10px;
            top: 6px;
            padding: 0 12px;
            font-size: 0.8rem;
        }
        .password-visibility-icon{
            position: absolute;
            right: 90px;
            top: 12px;
            cursor: pointer;
            /*padding: 0 12px;*/
            /*font-size: 0.8rem;*/
        }
    }
</style>