<template>
    <div id="order">
        <h3>这是订单页面</h3>
        <div class="box">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
        <wang-footer></wang-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import wangFooter from '@/components/footer';

    export default{
        name: 'order',
        components: {
            wangFooter
        }
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