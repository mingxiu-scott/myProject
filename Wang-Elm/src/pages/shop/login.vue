<template>
    <div id="login">
        <label for="username">请输入用户名:</label>
        <input type="text" id="username" v-model="username">
        <input type="submit" value="登录" @click="jumpToOrder">
    </div>
</template>

<script type="text/ecmascript-6">
    import {
            getStorage,
            setStorage
    }from '@/config/LocalStorage';
    export default{
        name : "login",
        data(){
            return {
                username: '',
            }
        },
        methods:{
            jumpToOrder(){

                setStorage('username',this.username);


                this.$router.push({
                    path: '/order'
                });
            }
        },

    }
</script>

<style>

</style>