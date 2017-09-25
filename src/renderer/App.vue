<template>
    <div id="app">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'test-password',
    };
</script>

<style lang="scss">
    #id {
        background: #f0f0f0;
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
