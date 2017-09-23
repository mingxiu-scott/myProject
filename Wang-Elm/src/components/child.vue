<template>
    <div id="child">

        <h1>我是child子组件</h1>
        <h1>显示child的数据</h1>
        <p>{{childMessage}}</p>
        <p>显示父组件传递的数据</p>
        <p>{{message}}</p>
        <p>{{bindValue}}</p>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name: 'child',
        data(){
            return{
                childMessage: 'child data'
            }
        },
        props:['message','bindValue']
    }
</script>

<style>

</style>