<template>
    <section class="home-section">
        <nav>
            <div class="nav-wrapper">
                <div class="input-field">
                    <input id="search" type="search" v-model="searchKey">
                    <label class="label-icon search-label-btn" for="search"><i class="material-icons">search</i></label>
                    <i class="material-icons" @click="cheanSearchKey">close</i>
                </div>
            </div>
        </nav>
        <div class="add-btn">
            <router-link
                    class="btn-floating btn-large waves-effect waves-light black"
                    :class="isPulse ? 'pulse' : ''"
                    @mouseover.native="mouseoverBtn"
                    @mouseout.native="mouseoutBtn"

                    :to="{name: 'SecurityForm'}">
                <i class="material-icons">add</i>
            </router-link>
        </div>

        <!--<router-link to="Login">Login</router-link>-->
        <ul class="security-list">
            <li
                    v-for="(item, index) in securityList"
                    :key="index"
                    class="security-item"
                    @click="openDialog(item)"
            >
                <img v-if="item.icon" class="material-icons" :src="item.icon" alt="">
                <i v-else class="material-icons">vpn_key</i>
                <div class="item-content">
                    <h6>{{item.name}}</h6>
                    <p>
                        <span class="span-link" @click="open(item.host)">{{item.host}}</span>
                    </p>
                </div>
                <i class="material-icons hover-icon" @click.stop="editItem(item)">edit</i>
                <i class="material-icons hover-icon" @click.stop="deleteItem(item)">delete</i>
            </li>
        </ul>

        <MUDialog ref="dialog">
            <div class="container security-detail">
                <h5><span class="span-link" @click="open(securityItem.url)">{{securityItem.name}}</span></h5>
                <hr>
                <div class="row">
                    <div class="col s3 right-align">账号</div>
                    <div class="col s9">
                        <span class="copy-item" @click="copy(securityItem.account)">
                            {{securityItem.account}}
                            <span class="copy-btn">复制</span>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col s3 right-align">密码</div>
                    <div class="col s9">
                        <span class="copy-item" @click="copy(securityItem.password)">
                            {{'*'.repeat(securityItem.password.length)}}
                            <span class="copy-btn">复制</span>
                        </span>
                    </div>
                </div>
            </div>
        </MUDialog>


        <MUDialog ref="deleteDialog">
            <div class="container">
                <h5>警告!</h5>
            </div>
        </MUDialog>
    </section>
</template>

<script>
    import store from '@/store/index';
    import router from '@/router/index';
    import MUDialog from '@/components/MUDialog.vue'
    import {clipboard} from 'electron';

    export default {
        data: function () {
            return {
                securityItem: {
                    name: '',
                    account: '',
                    password: '',
                    url: '',
                },
                searchKey: '',
                isPulse: false
            }
        },
        computed: {
            securityList: function () {
                return store.getters.SEARCH_SECURITY_LIST(this.searchKey);
            }
        },
        components: {
            MUDialog
        },
        mounted: function () {
            setTimeout(() => {
                if (this.securityList.length === 0) {
                    this.isPulse = true;
                }
            }, 500);
        },
        methods: {
            copy(content) {
                clipboard.writeText(content, 'selection');
            },
            open(link) {
                this.$electron.shell.openExternal(link);
                return false;
            },
            openDialog(item) {
                this.securityItem = item;
                this.$refs.dialog.open();
            },
            editItem(item) {
                router.push({name: 'SecurityFormEdit', params: {_id: item._id}});
            },
            deleteItem(item) {
                if(confirm('你确定要删除 '+item.name +' 这条记录?')){
                    store.dispatch('DELETE_SECURITY_DATA', {_id: item._id});
                }
            },
            cheanSearchKey() {
                this.searchKey = '';
            },
            mouseoverBtn() {
                this.isPulse = true;
            },
            mouseoutBtn() {
                this.isPulse = false;
            }
        }
    }
</script>

<style scoped>
    h6{
        font-size: 1.2rem;
    }
</style>

<style lang="scss">
    .input-field .search-label-btn {
        transform: none;
    }

    nav {
        background-color: black;
    }

    .add-btn {
        position: absolute;
        right: 16px;
        bottom: 16px;
    }

    .security-list {
        margin: 0;
        height: calc(100vh - 56px);
        overflow: auto;
        .security-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-flow: row wrap;

            padding: 8px 0;
            margin-bottom: 0;
            border-bottom: 1px solid #ddd;
            transition: .15s;
            &:hover {
                border-left: 5px solid #000;
                background-color: rgba(220, 220, 220, 0.6);
                .hover-icon{
                    display: block;
                }
            }
            .item-content{
                flex-grow: 1;
            }
            .hover-icon{
                display: none;
                cursor: pointer;
                &:hover{
                    color: #039be5;
                }
            }
            .material-icons {
                padding: 0 16px;
                flex-basis: 28px;
            }
            h5 {
                margin: 0 0 20px 0;
            }
            p {
                margin: 0;
            }
        }
    }

    .span-link {
        cursor: pointer;
        transition: 0.2s;
        &:hover {
            color: #039be5;
        }
    }

    .security-detail {
        width: 360px;
        .copy-item {
            display: inline-block;
            border: 1px dashed transparent;
            border-radius: 4px;
            padding-left: 3px;
            cursor: pointer;

            &:hover {
                border: 1px dashed;
                .copy-btn {
                    visibility: visible;
                }
            }
            &:active {
                .copy-btn {
                    background: #676767;
                }
            }
            .copy-btn {
                display: inline-block;
                padding: 0 3px;
                background: #000;
                color: #fff;
                visibility: hidden;

            }
        }
    }
</style>