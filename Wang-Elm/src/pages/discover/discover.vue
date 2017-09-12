<template>
    <div id="discover">
        <h3>我是发现页面</h3>
        <div>{{entries}}</div>
        <wang-footer></wang-footer>
    </div>
</template>
<script>
    import wangFooter from '@/components/footer';
    import {
            getEntries
    }from '@/data/getData';
    export default {
        name: 'discover',
        components : {
            wangFooter
        },
        data: function () {
          return{
              entries:{}
          }
        },
        async mounted(){
            try {
                getEntries(38.953351,121.525461,'main_template').then(res=>{
                    this.entries = res;
                    console.log(this.entries)
                }).catch(error=>{
                    console.log(error);
                })
            }catch(error){
                console.log(error);
            }
        }
    }
</script>
<style>

</style>