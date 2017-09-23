<template>
    <div id="order">
        <h3>这是订单页面</h3>
        <div class="box">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
        <button @click = "$router.push({path:'/profile',query:{id:1234567,name:'tom'}})">hello</button>
        <span>adf</span>
        <!--$route是一个只读的属性-->
        <h1>{{$route.query.name}}</h1>
        <wang-footer></wang-footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import wangFooter from '@/components/footer';

    export default{
        name: 'order',
        components: {
            wangFooter
        },
        methods:{
            hello(){
                alert('hello');
            }
        },
        mounted(){
          console.log('order mounted');
        },
        beforeCreate(){
            console.log('order before create');
        },
        created(){
            console.log('order created');
        },
        beforeMount(){
            console.log('order beforeMount');
        },
        beforeUpdate(){
            console.log('order beforeUpdate');
        },
        updated(){
            console.log('order updated');
        },
        activated(){
            console.log('order activated');
        },
        activated(){
            console.log('order activated');
        },
        beforeDestroy(){
            console.log('order beforeDestory');
        },
        destroyed(){
            console.log('order destroyed');
        },
//        beforeRouteEnter(){
//            console.log("order beforeRouteEnter");
//        },
//        beforeRouteUpdate(){
//            console.log('order beforeRouteUpdate');
//        },
//        beforeRouteUpdate(){
//            console.log("order beforeRouteUpdate");
//        }

    }
</script>

<style lang="scss">
    .box {
        width: 200px;
        height: 200px;
        border: 1px solid red;

        display: flex;
    }

</style>