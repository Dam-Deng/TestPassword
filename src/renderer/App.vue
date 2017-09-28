<template>
    <div id="app">
        <!--<transition name="fade">-->
            <router-view></router-view>
        <!--</transition>-->
    </div>
</template>

<script>
    import store from '@/store/index';

    export default {
        name: 'test-password',
        created: function () {
            store.dispatch('SYNC_SECURITY_DATA');
        },
    };
</script>

<style lang="scss">
    #app {
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    .fade-enter-active {
        transition: opacity .5s
    }

    .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
