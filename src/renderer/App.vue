<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
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
        transition: all .3s ease-in-out;
    }

    .fade-leave-active {
        transition: all .3s ease-in-out;
    }

    .fade-enter, .fade-leave-active {
        transform: translateX(20px);
        opacity: 0
    }
</style>
