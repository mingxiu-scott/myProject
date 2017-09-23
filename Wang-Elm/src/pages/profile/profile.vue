<template>
    <div id="profile">
        <h3>我是我的页面{{a}}</h3>
        <h1>{{$route.query.id}}</h1>
        <h1>{{$route.query.name}}</h1>
        <button @click="$router.go(-1)">返回上页</button>
        <div>
            {{count}}
        </div>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <wang-footer></wang-footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import wangFooter from '@/components/footer';
    import '@/vuex-store/index.js';
    export default{
        name: 'profile',
        components: {
            wangFooter
        },
        methods: {
            increment(){
                this.$store.commit('increment');
            },
            decrement(){
               this.$store.commit('decrement');
            }
        },
        computed: {
            count(){
                return this.$store.state.count;
            }
        },
        data(){
            return {
                a: "HelloWord",
            }
        },
        beforeCreate: function () {
            console.log("创建前");
            console.log(this.a);
            console.log(this.$el)
        },
        created: function () {
            console.log("创建之后");
            console.log(this.a);
            console.log(this.$el)
        },
        beforeMount: function () {
            console.log("mount之前");
            console.log(this.a);
            console.log(this.$el);
        },
        mounted: function () {
            console.log("mount之后");
            console.log(this.a);
            console.log(this.$el)
        },
        beforeUpdate: function () {
            console.log("更新前");
            console.log(this.a);
        },
        updated: function () {
            console.log("更新完成");
            console.log(this.a);
        },
        beforeDestroy: function () {
            console.log("销毁前");
            console.log(this.a);
            console.log(this.$el)
        },
        destroyed: function () {
            console.log("已销毁");
            console.log(this.a);
            console.log(this.$el);
        }
    }
</script>

<style>

</style>