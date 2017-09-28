<template>
    <div id="shop">

        <div class="header" :style="{backgroundImage:bi,backgroundSize:'100% 200%'}">
            <!--返回的按钮-->
            <div class="return-button">
                <i class="fa fa-angle-left" @click="$router.go(-1)"></i>
            </div>
            <!--中间部分-->
            <div class="content">
                <img :src="getPath(shopHeader.image_path,'130x130')" alt="">
                <div>
                    <p>{{shopHeader.name}}</p>
                    <p><span>商家配送/</span><span>{{shopHeader.order_lead_time}}分钟送达/</span><span>{{shopHeader.piecewise_agent_fee.description}}</span>
                    </p>
                    <p>公告:&nbsp; &nbsp;{{shopHeader.promotion_info}}</p>
                </div>
            </div>


            <!--活动-->
            <div class="activities">
                <span>
                    <span :style="{backgroundColor:'#'+shopHeader.activities[0].icon_color}">{{shopHeader.activities[0].icon_name}}</span>
                    <span>{{shopHeader.activities[0].description}}</span>
                </span>
                <span @click="showActivity">{{shopHeader.activities.length}}个活动</span>
            </div>
        </div>


        <!--点击活动,出现的整个屏幕的div-->
        <div class="showActive" v-if="changeState">
            <!--名称,招牌-->
            <h1>{{shopHeader.name}}</h1>

            <!--星星,五个-->
            <div style="position: relative;width: 650px;">
                <i class="fa fa-star" v-for="n in 5"></i>
                <span :style="{position:'absolute',top:0,left:'25px',overflow:'hidden',whiteSpace:'nowrap',width:level(shopHeader.rating),}">
                        <i class="fa fa-star" v-for="n in 5" style="color: yellow;"></i>
                    </span>
            </div>


            <!--优惠信息-->
            <span class="rating-message">
                <span>优惠信息</span>
            </span>


            <!--活动详情-->
            <div class="wrap-active">
                <p class="active" v-for="(ativity, index) in shopHeader.activities" :key='index'>
                    <span>
                        <span :style="{color:'white',backgroundColor:'#'+ativity.icon_color}">{{ativity.icon_name}}</span>{{ativity.description}}
                    </span>
                </p>
            </div>


            <!--商家公告-->
            <span class="rating-message">
                <span>商家公告</span>
            </span>



            <!--商家公告的内容-->
            <div class="notice">
                <span>
                    {{shopHeader.promotion_info}}
                </span>
            </div>



            <!--返回的大X-->
            <div class="return-X" @click="showActivity">
                <span>X</span>
            </div>


        </div>

        <!--商品 评价 店铺-->
        <div class="re-good-shop">
            <!-- goodState: true,//改变商品界面的开关
                evaluationState: false,//改变评价的开关
                shopState: false,-->
            <span @click="changThreeState" data-number="1" :class="{goodShopActice: goodState}">商品</span>
            <span @click="changThreeState" data-number="2" :class="{goodShopActice: evaluationState}">评价</span>
            <span @click="changThreeState" data-number="3" :class="{goodShopActice: shopState}">店铺</span>
        </div>


        <!--商品界面-->
        <div class="good" v-if="goodState">

            <div class="good-list">

                <!--商品左边的列表-->
                <ul class="good-list-left">

                    <li class="list-style" :class="{shopListActive:isShopListActive == index}"
                        v-for="(list, index) in goodList" :key="index" @click="shopListAcive" :data-number="index">

                        <img :src="getPath(list.icon_url,'18x24')" alt="" v-if="list.icon_url !== ''">
                        <span>{{list.name}}</span>

                    </li>
                </ul>

                <!--商品右边的列表-->
                <!--写一个关于右边商品div滑动,整个body的元素也想上滑动的监听-->
                <ul class="good-list-right" @scroll="listenScoll">
                    <li v-for="(list, index) in goodList" :key="index" :data-number="index" class="good-list-right-li">
                        <ul>
                            <div class="list-part">
                                <span>{{list.name}}:&nbsp;&nbsp;{{list.description}}</span><span>...</span>
                            </div>
                            <li v-for="(list_item, index) in list.foods" :key="index" class="list-li">

                                <img :src="getPath(list_item.image_path,'130x130')" alt="">
                                <div>
                                    <h3>{{list_item.name}}</h3>
                                    <p v-if="list_item.description">{{list_item.description}}</p>
                                    <p>月售{{list_item.month_sales}} &nbsp;&nbsp; 好评率{{list_item.satisfy_rate
                                        }}%</p>

                                    <div>
                                        <span>￥{{list_item.specfoods[0].price}}起</span>
                                        <div v-if="list_item.specifications.length" class="specifications">选规格</div>
                                        <div  class="plus" v-else>+</div>
                                    </div>

                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="good-content">

            </div>
        </div>

        <!--评价界面-->
        <div class="evaluation" v-if="evaluationState">
            <h1>评价页面</h1>
        </div>

        <!--店铺界面-->
        <div class="shop" v-if="shopState">
            <h1>店铺页面</h1>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import {
            getShopHeader,
            getShopGoodList
    }from "@/data/getData";

    import {
            getImgPath,
            getShopViewImg
    } from '@/config/until';

    export default{
        name: 'shop',
        data(){
            return {
                shopHeader: null,
                backgroudImage: null,

                changeState: false,//改变商品活动的开关
                goodState: true,//改变商品界面的开关
                evaluationState: false,//改变评价的开关
                shopState: false,//改变店铺页面的开关

                goodList: null,//商家里面的商品列表信息

                isShopListActive: 0,

                plusAdd: true
            }
        },

        //拼接的backgroundImage的字符串
        computed: {
            bi(){
                return 'url(' + this.backgroudImage + ')';
            },
            location(){
                return this.$store.state.location;
            }
        },
        methods: {
            getPath: getImgPath,
            getShopImg: getShopViewImg,

            //切换活动的方法
            showActivity(){
                this.changeState = this.changeState ? false : true;
            },
            level: function (level) {
                return level * 20 + '%';
            },

            //商品 评价 店铺的切换类
            changThreeState(e){

                var currentNode = e.currentTarget;

                var number = currentNode.getAttribute('data-number');

                if (number == 1) {
                    this.goodState = true;
                    this.evaluationState = false;
                    this.shopState = false;
                } else if (number == 2) {
                    this.goodState = false;
                    this.evaluationState = true;
                    this.shopState = false
                } else {
                    this.goodState = false;
                    this.evaluationState = false;
                    this.shopState = true;
                }
            },
            listenScoll(e){
                //其实联动的也很好写,就是判断让body.scollTop等于你拖动的元素的scrollTop

                var ul = e.currentTarget;

                document.documentElement.scrollTop = ul.scrollTop;



                console.log("body ScrollTop" + document.body.scrollTop);

                var rightIndex = ul.childNodes;

                var height = 0;

                var leftIndex = document.getElementsByClassName("list-style");

                for (var i = 0; i < rightIndex.length; i++) {

                    if (ul.scrollTop >= height) {

                        console.log(height);

                        this.isShopListActive = i;
                    }
                    height += rightIndex[i].offsetHeight;
                }

            },

            //1.切换一个真的 2.把原来真的改成假的

            //给商品左边的列表添加的点击事件
            shopListAcive(e){

                var index = e.currentTarget.getAttribute('data-number');

                this.isShopListActive = index;

                var ulGoodList = document.getElementsByClassName("good-list-right")[0];

                var rightLis = document.getElementsByClassName("good-list-right-li");

                var height = 0;

                for (var i = 0; i < rightLis.length; i++) {

                    if (rightLis[i].getAttribute("data-number") == index) {
                        var rightIndex = rightLis[i];
                        break;
                    }

                    //元素的高度
                    height += rightLis[i].offsetHeight;
                }
                //获得右边的的每一个的list的值,和对应上来
//                console.log(rightIndex);
//                console.log(rightIndex.offsetHeight);

                //滚轴滚动框的高度
                ulGoodList.scrollTop = height;

            }
        },

        mounted(){
            //获取商品头部的信息
            getShopHeader(this.$route.query.latitude, this.$route.query.longitude, this.$route.query.id).then(response=> {
                this.shopHeader = response;
                this.backgroudImage = this.getShopImg(this.shopHeader.image_path, "40", "50x40");
            }).catch(error=> {
                console.log(error);
            });

            //获取商品列表的信息
            getShopGoodList(this.$route.query.id).then(response=> {
                this.goodList = response;
                console.log(this.goodList);
            }).catch(error=> {
                console.log(error);
            });
        }
    }
</script>

<style lang="scss" type="text/scss">

    @import "../../scss/mixin.scss";


    #shop {
        .header {

            padding-left: pxToRem(20px);
            padding-right: pxToRem(20px);

            height: pxToRem(265px);

        /*头部的返回按钮*/
            .return-button {

                    font-size: pxToRem(60px);
                    color: white;
            }

        /*中间的内容*/
            .content {
                @include flex-content(center, flex-start);

                /*图片的内容*/

                img {
                    width: pxToRem(130px);
                    height: pxToRem(130px);
                    margin-right: pxToRem(20px);
                }

                div {

                     /*店名*/
                    p:first-child {
                        font-size: pxToRem(32px);
                        color: white;
                        margin-bottom: pxToRem(10px);
                    }

                    /*商家配送*/
                    p {
                        font-size: pxToRem(22px);
                        color: seashell;
                        letter-spacing: 3px;
                        margin-bottom: pxToRem(10px);
                    }

                    /*公告的样式*/
                    p:nth-child(3) {

                        width: pxToRem(550px);

                        /*这三句话,形成一个...,包含里面的内容*/
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
            }

        }
        /*活动的部分*/
        .activities {
            @include flex-content(center, space-between);
                font-size: pxToRem(22px);
                color: seashell;
                margin-top: pxToRem(10px);
            }

        }

        /*<!--点击活动,出现的整个屏幕的div的样式-->*/

        /*  vh 表示和手机屏幕一样的高 */

        .showActive {
            /*display: none;*/
            color: white;
            width: 100%;
            text-align: center;

            background-color: #333;

            position: absolute;
            top: 0;
            left: 0;

            padding: pxToRem(60px);

            height: pxToRem(1334px);

            /*background-color: silver;*/

            div {
                text-align: center;
                font-size: pxToRem(36px);
                margin-top: 20px;
                margin-bottom: pxToRem(40px);
            }

            /*优惠信息样式*/
            .rating-message {
                font-size: pxToRem(24px);
                /*border-radius: ;*/
                border: 1px solid white;
                border-radius: 30px;
                padding: 15px;

                margin-top: pxToRem(20px);
                margin-bottom: pxToRem(20px);
                display: inline-block;
            }

            /*中间优惠信息*/
            .wrap-active {
                margin-top: pxToRem(20px);

            .active {
                text-align: start;
                font-size: pxToRem(20px);
                margin-top: pxToRem(20px);
            }

            }
            /*商家公告的样式*/
            .notice {
                text-align: start;
                font-size: pxToRem(20px);
            }

            .return-X {
                /*返回的大X的样式*/
                text-align: center;
                font-size: pxToRem(60px);
                color: white;
                line-height: pxToRem(120px);
                display: inline-block;
                position: absolute;
                bottom: 0;
                left: pxToRem(320px);
                border: 1px solid white;
                margin-bottom: pxToRem(20px);

                width: pxToRem(120px);
                height: pxToRem(120px);

                border-radius: 90px;
            }

        }

        /*商品,评价,店铺的样式*/
        .re-good-shop {
            font-size: pxToRem(32px);
            margin-top: pxToRem(20px);
        @include flex-content(center, space-around);
            background-color: white;

            padding: 10px 0 10px 0;
        }

        /*商品列表的样式*/
        .good {

            .good-list {

                @include flex-content(flex-start, space-around);

                .good-list-left {
                    background-color: #eeeeee;

                    overflow: auto;
                    height: pxToRem(1280px);

                    .list-style {
                        text-align: center;
                        width: pxToRem(170px);
                        height: pxToRem(120px);
                        padding: pxToRem(30px) pxToRem(15px);

                        img {
                            width: pxToRem(18px);
                            height: pxToRem(24px);
                        }

                    }
                }
                .good-list-right {
                    height: pxToRem(1280px);
                    overflow: auto;
                    width: pxToRem(540px);
                    padding-bottom: pxToRem(200px);


                    .list-part {
                    @include flex-content(center, space-between);
                        height: pxToRem(55px);
                        background-color: silver;
                        line-height: 48px;
                        overflow: hidden;
                    }

                    .list-li {

                        width: 100%;
                        margin-top: pxToRem(10px);

                        background-color: white;
                        @include flex-content(center,space-between);

                        img {
                            width: pxToRem(150px);
                            height: pxToRem(150px);
                        }

                        div{

                            width: pxToRem(358px);
                            padding:pxToRem(15px) pxToRem(5px);
                            p{
                                margin-top: pxToRem(10px);
                                font-size: pxToRem(20px);
                                color: #999;
                            }
                            p:nth-child(3){
                                color: #666666;
                            }
                            div{
                                @include flex-content(center,space-between);
                                span{
                                    color: red;
                                }
                                .specifications{
                                    padding-left: pxToRem(15px);
                                    color: white;
                                    background-color: #0089dc;
                                    width: pxToRem(100px);
                                    height: pxToRem(50px);

                                    border-radius: 100px;

                                    margin-right: pxToRem(20px);
                                }
                                .plus{
                                    text-align: center;
                                    vertical-align: middle;
                                    color: white;
                                    background-color: #0089dc;
                                    font-size: pxToRem(40px);
                                    height: pxToRem(40px);
                                    width: pxToRem(40px);
                                    margin-right: pxToRem(20px);
                                    border-radius: 40px;
                                }
                            }
                        }

                    }

                }
            }
        }

        /*给商品 评价 店铺 绑定的样式类*/
            .goodShopActice {

                color: #3e90e8;
                border-bottom: 3px #3e90e8 solid;
                padding-bottom: 5px;
            }

            /*商品左边的列表切换的样式类*/
            .shopListActive {
                background-color: white;
                border-left: 3px #3e90e8 solid;
            }

    }



</style>