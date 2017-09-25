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
        <router-link to="Login">Login</router-link>
    </section>
</template>

<style lang="scss">
    .input-field .search-label-btn{
        transform: none;
    }
</style>