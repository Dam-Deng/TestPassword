<template>
    <section class="home-section">
        <nav>
            <div class="nav-wrapper">
                <div class="input-field">
                    <input id="search" type="search">
                    <label class="label-icon search-label-btn" for="search"><i class="material-icons">search</i></label>
                    <i class="material-icons">close</i>
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
            <li v-for="(item, index) in securityList" :key="index" class="security-item">
                <img v-if="item.icon" class="material-icons" :src="item.icon" alt="">
                <i v-else class="material-icons">vpn_key</i>
                <div class="item-content">
                    <h6>{{item.name}}</h6>
                    <p>
                        <span class="span-link" @click="open(item.host)">{{item.host}}</span>
                    </p>
                </div>
            </li>
        </ul>

    </section>
</template>

<script>
    import store from '@/store/index';

    export default {
        data: function () {
            return {
                isPulse: false
            }
        },
        computed: {
            securityList: function () {
                return store.getters.GET_SECURITY_LIST;
            }
        },
        mounted: function () {
            setTimeout(() => {
                if (this.securityList.length === 0) {
                    this.isPulse = true;
                }
            }, 200);
        },
        methods: {
            open(link) {
                this.$electron.shell.openExternal(link);
                return false;
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

            margin-bottom: 0;
            border-bottom: 1px solid #ddd;
            transition: .15s;
            &:hover {
                border-left: 5px solid #000;
                background-color: rgba(220, 220, 220, 0.6);
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
        .span-link {
            cursor: pointer;
            transition: 0.2s;
            &:hover {
                color: #039be5;
            }
        }
    }
</style>