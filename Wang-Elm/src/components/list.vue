<template>
    <div id="list">

        <div class="shop-list" v-for="(a,index) in shopList" :key="index">
            <span to="/shop" class="jump" @click="jump">

                <div class="list-left">
                    <img :src="getPath(a.image_path,'130x130')" alt="">
                </div>
                <div class="list-right">
                    <div class="list-right-top">
                        <p>{{a.name}}</p>
                        <p>
                            <span>
                                <div style="position: relative;width: 111.5px;">
                                <i class="fa fa-star" v-for="n in 5"></i>
                                <span :style="{position:'absolute',top:0,left:0,overflow:'hidden',whiteSpace:'nowrap',width:level(a.rating),}">
                                    <i class="fa fa-star" v-for="n in 5" style="color: yellow;"></i>
                                </span>

                        </div>
                            {{a.rating}}&nbsp;月售{{a.recent_order_num}}单
                            </span>
                            <span v-if="a.delivery_mode">{{a.delivery_mode.text}}</span>
                        </p>
                        <p><span>${{a.float_minimum_order_amount}}起送|&nbsp;&nbsp;配送费{{a.piecewise_agent_fee.description}}</span><span>{{mToKm(a.distance)}}|{{a.order_lead_time}}分钟</span>
                        </p>
                    </div>
                    <div class="list-right-bottom">
                        <p v-for="(ativity, index) in a.activities" :key='index' v-if="index < 2">
                             <span>
                                   <span :style="{color:'#'+ativity.icon_color}">{{ativity.icon_name}}</span>{{ativity.description}}
                             </span>
                            <span v-if="index == 0">
                                <span v-if="a.activities.length > 2"
                                      @click="activityCount">{{a.activities.length}}个活动</span>
                            </span>
                        </p>
                        <p class="active" v-for="(ativity, index) in a.activities" :key='index' v-if="index >= 2">
                          <span>
                            <span :style="{color:'#'+ativity.icon_color}">{{ativity.icon_name}}</span>{{ativity.description}}
                        </span>
                        </p>
                    </div>
                    <div>

                    </div>
                </div>
            </span>
        </div>

        <div class="aa">
            <i class="fa fa-spinner fa-spin"></i>正在加载
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    import {getShopList} from "@/data/getData";
    import {
            getImgPath
    } from '@/config/until';

    export default{
        name: 'list',
        props: ['latitude', 'longitude'],
        data(){
            return {
                shopList: null,
                isButton: true
            }
        },
        mounted() {
            console.log('list initdata');
            this.loadShopList(this.latitude, this.longitude);
        },
        methods: {
            getPath: getImgPath,
            //米和千米的转换
            mToKm(m){
                var distance;
                if (m > 1000) {
                    m = m / 1000;
                    m = m.toFixed(2);
                    distance = m + "km";
                } else {
                    distance = m + 'm';
                }
                return distance;
            },
            level:function (level) {
                return level * 20 +'%';
            },

            //判断是有加载下一页的商家列表
            loadShopList(latitude, longitude, number = 0){
                console.log('loadShopList');

                console.log(number);
                getShopList(this.latitude, this.longitude, number).then(response=> {
                    this.shopList = response;
                    console.log(response);
                }).catch(error=> {
                    console.log(error);
                });


                var body = document.body;

                //正常的方法是谁调用,就是this就是谁
                //箭头函数是定义在哪里,this就是定义时的上下文
                //通过判断body的滚动值,和offset/height的值,然后加载下面的数据
                window.onscroll = () => {
                    console.log("scrollTop  " + body.scrollTop);
                    console.log("clientHeight  " + body.clientHeight);
                    console.log("offsetHeight  " + body.offsetHeight);
                    console.log("scrollHeight  " + body.scrollHeight);

                    if (body.scrollTop + body.offsetHeight == body.scrollHeight) {
                        number += 20;
                        console.log(number);

                        getShopList(latitude, longitude, number).then(response=> {

                            this.shopList = this.shopList.concat(response);

                        }).catch(error=> {
                            console.log(error);
                        });
                    }
                };
            },
            activityCount(e){

                e = e || window.event;

                e.stopPropagation();


                var active = e.currentTarget.parentNode.parentNode.parentNode.children;

                console.log(active);

                for (var i = 2; i < active.length; i++) {
                    active[i].style.display = (active[i].style.display === "none") ? "block" : "none";
                }
            },
            jump(){
                location.href = "/#/shop";
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    @import "../scss/mixin.scss";

    .aa {
        font-size: pxToRem(48px);
        padding-bottom: 100px;
        text-align: center;
    }

    .shop-list {
        width: 100%;
        background-color: white;
        /*margin-top: pxToRem(20px);*/
        padding-top: pxToRem(20px);
        padding-bottom:pxToRem(20px);
        border-bottom: 1px solid silver;

    /*height: pxToRem(282px);*/

    span {

    @include flex-content(center, flex-start);

    .list-left {
        /*height: 100%;*/
        width: pxToRem(130px);

    /*padding-top : pxToRem(10px);*/
    img {
        width: pxToRem(130px);
        height: pxToRem(130px);
    }

    }
    .list-right {
        width: pxToRem(590px);
        padding-left: pxToRem(15px);

    .list-right-top {
        flex-grow: 1;

        border-bottom: 1px solid silver;

    p {
    @include flex-content(center, space-between);
        color: #666;
    }

    p:first-child {
        font-size: pxToRem(30px);
        color: #000;
    }

    p:nth-child(2) {
        margin-top: pxToRem(10px);
        margin-bottom: pxToRem(10px);
    }

    }
    .list-right-bottom {

    .active {
        display: none;
    }

    p:first-child {
    @include flex-content(center, space-between);
    }

    }
    }
    }

    }
</style>