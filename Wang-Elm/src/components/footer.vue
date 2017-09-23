<template>
    <div id="footer">
        <router-link to="/msite" :class="{active:isMsite}"><i class="fa fa-edge"></i><p>外卖</p></router-link>
        <router-link to="/order" :class="{active:isOrder}" ><i class="fa fa-safari"></i><p>订单</p></router-link>
        <router-link to="/discover" :class="{active:isDiscover}"><i class="fa fa-file-text-o"></i><p>发现</p></router-link>
        <router-link to="/profile" :class="{active:isProfile}"><i class="fa fa-user-o"></i><p>我的</p></router-link>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name : 'footer',
        data(){
            return{
                isMsite : false,
                isDiscover : false,
                isOrder : false,
                isProfile: false
            }
        },
        created(){
            switch (this.$route.path){
                case '/msete':
                    this.isMsite = true;
                    break;
                case "/discover":
                    this.isDiscover = true;
                    break;
                case "/order":
                    this.isOrder = true;
                    break;
                case '/profile' :
                    this.isProfile = true;
                    break;
                default :
                    this.isMsite = true;
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    @import "../scss/mixin.scss";
    #footer{
        width: 100%;
        height: pxToRem(100px);
        background-color: white;

        font-size: pxToRem(26px);

        position: fixed;

        bottom: 0px;

    @include flex-content(center,space-around);

    a{
        width: pxToRem(94px);
        height: pxToRem(37px);
        display: inline-block;

    &.active{

         color: #0089dc;
     }
    i{
        padding-left: 8px;
    }
    }

    }
</style>