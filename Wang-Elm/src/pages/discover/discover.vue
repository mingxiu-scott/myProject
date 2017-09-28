<template>
    <div id="discover">
        <button @click="$router.push({path:'/order',query:{id:234567,name:'tom'}})">aaaa</button>
        <wang-footer></wang-footer>
    </div>
</template>
<script>
    import wangFooter from '@/components/footer';
    import child from "@/components/child";
    import {
            getEntries
    }from '@/data/getData';
    export default {
        name: 'discover',
        components : {
            wangFooter,
            child
        },
        data: function () {
          return{
              entries:{},
              bindValue: 'dd',
              rawHtml: '<p>我是p元素</p>',
              number: 1,
              ok: 'yes',
              message: 'hello world',
              firstName: 'Foo',
              lastName: 'Bar',
//              classObject:{
//                  isActive : true,
//                  hasError: true
//              }
              isActive : true,
              hasError: "text-danger",
              activeClass: 'active'
          }
        },
        computed:{
            reverseMessage(){
                return this.message.split('').reverse().join('');
            },
            now(){
                return Date.now();
            },
            fullName(){
                return this.firstName + " " + this.lastName;
            },

        },

    }
</script>
<style>

</style>