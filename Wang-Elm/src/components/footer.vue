<template>
    <footer>
        <router-link class="item" to="/msite"><i class="fa fa-edge"></i><span>外卖</span></router-link>
        <router-link class="item" to="/discover"><i class="fa fa-safari"></i><span>发现</span></router-link>
        <router-link class="item" to="/order"><i class="fa fa-file-text-o"></i><span>订单</span></router-link>
        <router-link class="item" to="/profile"><i class="fa fa-user-o"></i><span>我的</span></router-link>
    </footer>
</template>

<script type="text/ecmascript-6">
    export default{
        name: 'footer'
    }
</script>
<style lang="scss">

    @import "../scss/mixin.scss";

    footer {
        position: fixed;
        bottom: 0px;

        font-size: 28px;

        height: 80px;
        width: 100%;

        @include flex-content(center,space-around);

        background-color: white;

    i {
        padding-left: 10px;
    }

    span {
        display: block;
    }

    .item {
    }

    }

</style>