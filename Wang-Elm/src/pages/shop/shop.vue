<template>
    <div id="shop">

        <!--TODO 1.头部-->
        <div class="header" :style="{backgroundImage:bi,backgroundSize:'100% 200%'}">
            <!--返回的按钮-->
            <div class="return-button">
                <!--TODO 1.2 返回上一页 $router-->
                <i class="fa fa-angle-left" @click="$router.go(-1)"></i>
            </div>


            <!--中间部分-->
            <div class="content" v-if="shopHeader">
                <!--TODO 写v-if是判断在模板加载的时候,是否编译这个元素,如果在编译模板的时候,数据没有回来,而直接调用这个变量的化,会报编译错误undefined,这样,下面的模板都不会编译了,这是个很大的问题,所以,写v-if是为了,有数据的时候就编译模板,没有的时候就不去编译模板,不加载数据 -->
                <img :src="getPath(shopHeader.image_path,'130x130')" alt="">
                <div>
                    <p>{{shopHeader.name}}</p>
                    <p><span>商家配送/</span><span>{{shopHeader.order_lead_time}}分钟送达/</span><span>{{shopHeader.piecewise_agent_fee.description}}</span>
                    </p>
                    <p>公告:&nbsp; &nbsp;{{shopHeader.promotion_info}}</p>
                </div>
            </div>


            <!--活动-->
            <div class="activities" v-if="shopHeader">
                <span>
                    <!--TODO ########:style查看教程 计算属性和方法的区别 #####-->
                    <!--TODO 在这里使用计算属性的原因,是因为计算属性基于值(shopHeader)的依赖进行缓存,当shopHeader没有改变的时候,一直会返回以前的值,不会重新执行方法,相比之下方法属性没有缓存,每次调用他都会重新执行方法,效率就会低得多-->
                    <span :style="{backgroundColor:'#'+shopHeader.activities[0].icon_color}">{{shopHeader.activities[0].icon_name}}</span>
                    <span>{{shopHeader.activities[0].description}}</span>
                </span>
                <span @click="showActivity">{{shopHeader.activities.length}}个活动</span>
            </div>

        </div>
        <!--TODO 1.头部结束-->


        <!--TODO 点击头部活动跳出来的整个屏幕的弹框-->

        <!--TODO 优化  这个结构原本在应该在头部里面的,结果我写在头部的外边,所以,把这个功能块粘贴到头部的div里面-->

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

        <!--TODO 点击头部活动跳出来的整个屏幕的弹框结束-->


        <!--TODO 2.商品 评价 店铺的三个界面的切换div-->
        <!--商品 评价 店铺-->
        <div class="re-good-shop">
            <span @click="changThreeState" data-number="1" :class="{goodShopActice: goodState}">商品</span>
            <span @click="changThreeState" data-number="2" :class="{goodShopActice: evaluationState}">评价</span>
            <span @click="changThreeState" data-number="3" :class="{goodShopActice: shopState}">店铺</span>
        </div>

        <!--TODO 2.商品 评价 店铺的三个界面的切换div结束-->



        <!--TODO 3.商品详情界面-->

        <!--商品界面-->
        <div class="good" v-if="goodState">

            <div class="good-list">

                <!--商品左边的列表-->
                <ul class="good-list-left">

                    <li class="list-style" :class="{shopListActive:isShopListActive == index}"
                        v-for="(list, index) in goodList" :key="index" @click="shopListAcive" :data-number="index">

                        <img :src="getPath(list.icon_url,'18x24')" alt="" v-if="list.icon_url !== ''">
                        <span>{{list.name}}</span>
                        <span v-if="leftArr[index] > 0" style="color: red;">{{leftArr[index]}}</span>
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

                            <li v-for="(list_item, index2) in list.foods" :key="index2" class="list-li">

                                <img :src="getPath(list_item.image_path,'130x130')" alt="">
                                <div>
                                    <h3>{{list_item.name}}</h3>

                                    <p v-if="list_item.description">{{list_item.description}}</p>

                                    <p>月售{{list_item.month_sales}} &nbsp;&nbsp; 好评率{{list_item.satisfy_rate
                                        }}%</p>

                                    <div style="position: relative">
                                        <span>￥{{list_item.specfoods[0].price}}起</span>

                                        <div @click="chooseSpecifications(index,index2)" v-if="list_item.specifications.length" class="specifications">选规格</div>

                                        <div v-else>
                                            <div class="minus" v-if="rightArr[index][index2] > 0" @click="minus(index, index2,list_item.specfoods[0].food_id,$event)">-</div>
                                            <div v-if="rightArr[index][index2] > 0" class="number">{{rightArr[index][index2]}}</div>

                                            <div @click="plus(index,index2,list_item.specfoods[0].food_id, list_item.specfoods[0].name,list_item.specfoods[0].original_price,list_item.specfoods[0].price,list_item.specfoods[0].spec,$event)" class="plus">+</div>

                                        </div>
                                    </div>
                                    <!--选规格的界面, 这个界面是隐藏的-->

                                    <transition name="zoom">
                                        <div class="chooseSpecifications" v-if="specification == index2 && specificationTwo == index">
                                            <div class="center">
                                                <div>
                                                    <span>熏肉大饼一套半</span>
                                                    <span @click="chooseSpecifications(1,1)">X</span>
                                                </div>

                                                <div>
                                                    <span>甜面酱</span>
                                                    <span>甜面酱</span>
                                                </div>

                                                <div>
                                                    <span>￥21</span>
                                                    <span>选好了</span>
                                                </div>
                                            </div>
                                        </div>
                                    </transition>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="good-content">

            </div>
        </div>

        <!--TODO 3.商品详情界面结束-->


        <!--评价界面-->
        <div class="evaluation" v-if="evaluationState">
            <h1>评价页面</h1>
        </div>


        <!--店铺界面-->
        <div class="shop" v-if="shopState">
            <h1>店铺页面</h1>
        </div>

        <!--TODO 4.底部购物车-->
        <!--底部购物车的-->
        <div class="shopCart" v-if="goodState" @click="isCarList=!isCarList && shopMount > 0">

            <div class="cart-left">
                <div class="shopCart-icon" :class="{'car-icon-animation':isAnimation}" @animationend="removeAnimation">
                    <i class="fa fa-shopping-cart"></i>
                    <div class="car-mount-count" v-if="shopMount > 0">{{shopMount}}</div>
                </div>
                <div class="shopCart-count">
                    <p>￥{{shopCarCount}}</p>
                    <p>配送费￥5</p>
                </div>
            </div>
            <button class="cart-right" @click="jumpToOrder">去结算</button>

            <!-- 动画 小球 -->
            <div class="ball-container">

                <transition-group name="drop" tag="div"
                            v-on:before-enter="beforeEnter"
                            v-on:enter="enter"
                            v-on:after-enter="afterEnter">

                    <div class="ball"  v-for="(ball,index) in balls"    v-show="ball.show" :key="index">
                        <div class="inner inner-hook" ref="innerHook"></div>
                    </div>
                </transition-group>

            </div>

            <!-- 购物车列表 -->
            <transition name="push">
                <div class="car" v-show="isCarList">
                    <!-- 购物车标题 -->
                    <div class="car-header">
                        <span class="car-title">购物车</span>
                        <span class="clear-car">
              <i class="fa fa-trash-o"></i>
              <span @click="clearCart">清空</span>
          </span>
                    </div>
                    <!-- 购物车标题 结束-->

                    <!-- 购物车商品列表 -->
                    <ul class="car-list">

                        <li v-for="(food, foodId) in shopCarList" :key="foodId" class="car-list-item">

                            <!-- 商品名称 规格 -->
                            <div class="food-message">
                                <p class="food-name">{{food.name}}</p>
                                <p class="food-spec" v-if="food.spec">{{food.spec[0].name}}</p>
                            </div>

                            <!-- 商品价格 -->
                            <div class="food-price">
                                <span class="original-price">{{food.original_price}}</span>
                                <span class="price">{{food.price}}</span>
                            </div>
                            <div @click="minus(food.index, food.index2,foodId,$event)">-</div>
                            <!-- 商品购买数量 -->
                            <div >{{food.count}}</div>

                            <div @click="plus(food.index,food.index2,foodId,food.name,food.original_price,food.price,food.spec,$event)">+</div>
                        </li>

                    </ul>
                    <!-- 购物车商品列表 结束 -->
                </div>
            </transition>

            <!-- 购物车列表 -->

        </div>
        <!--TODO 4.底部购物车结束-->



    </div>

</template>

<!--TODO JS  *******************************************-->

<script type="text/ecmascript-6">

    //TODO VUE IMPORT
    import {
            getShopHeader,
            getShopGoodList
    }from "@/data/getData";

    import {
            getImgPath,
            getShopViewImg
    } from '@/config/until';

    import {mapState, mapMutations} from 'vuex';

    export default{
        name: 'shop',
        //TODO VUE DATA
        data(){
            return {
                shopHeader: null,  //TODO 保存获取回来的商家的信息头部

                backgroudImage: null,

                changeState: false,//改变商品活动的开关
                goodState: true,//改变商品界面的开关
                evaluationState: false,//改变评价的开关
                shopState: false,//改变店铺页面的开关
                goodList: null,//商家里面的商品列表信息
                isShopListActive: 0,

                specification : -1, //判断规格的开关
                specificationTwo: -1,

                minus1 : -1,
                minus2: -1,

                orderNumber : 0,

                rightArr: [],//存储右边的数组的数字

                leftArr: [],//存储左边的数字

                ballPlus: null,
                isAnimation: false,

                balls: [
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                ],
                dropBalls: [],

                isCarList: false,

                shopId : this.$route.query.id,

            }
        },


        //TODO VUE COMPUTED
        //拼接的backgroundImage的字符串
        computed: {

            bi(){   //TODO 拼接background-Image 后面的url
                return 'url(' + this.backgroudImage + ')';
            },

            location(){   //TODO 获得路由过来的定位的值
                return this.$store.state.location;
            },

            ...mapState(['location','carList']),

            shopCarList(){
                console.log('carList');
                console.log(this.carList[this.shopId]);


                console.log(this.carList);
                return this.carList[this.shopId];
            },

            shopCarCount(){

                var price = 0;

                if(this.shopCarList){
                    Object.values(this.shopCarList).forEach(function (food) {
                      price += food.count * Math.round(food.price * 100);
                    })
                }
                price = price / 100;
                return price;
            },
            shopMount(){

                var count = 0;

                if(this.shopCarList){
                    Object.values(this.shopCarList).forEach(function (food) {
                        count += food.count;
                    });
                }
                return count;
            }
        },

        //TODO VUE METHOD
        methods: {

            //TODO METHOD getPAth 获取图片的路径
            getPath: getImgPath,

            //TODO METHOD getShopImg 获取商家头部图片的路径
            getShopImg: getShopViewImg,

            //TODO METHOD showActivity
            //切换活动的方法
            showActivity(){
                this.changeState = this.changeState ? false : true;
            },
            //
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


                var rightIndex = ul.childNodes;

                var height = 0;


                for (var i = 0; i < rightIndex.length; i++) {

                    if (ul.scrollTop >= height) {

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

            },

            minus(index, index2,foodId,event){



                console.log("foodId in minux" + foodId);

                let arr = this.rightArr[index];

                arr[index2] -= 1;


                this.leftArr[index] -= 1;

                this.$set(this.leftArr, index, this.leftArr[index]);


                //$set属性,是为了更新vue的属性的方法

                this.$set(this.rightArr, index, arr);

                console.log(foodId);


                this.reduceFood(foodId);
                event.stopPropagation();
            },

            removeAnimation () {
                this.isAnimation = false;
            },

            plus(index, index2, foodId,name,original_price,price,spec,event){

                this.ballPlus = event.currentTarget;

                this.drop(event.currentTarget);

                let arr = this.rightArr[index];

                arr[index2] += 1;

                this.leftArr[index] += 1;

                this.$set(this.leftArr, index, this.leftArr[index]);

                this.$set(this.rightArr, index, arr);

                //添加购物车的对象的数据
                this.addFood(foodId,name,original_price,price,spec,index,index2);

                event.stopPropagation();

            },

            //选规格的切换函数
            chooseSpecifications(index1,index2){
                this.specificationTwo = this.specificationTwo == -1 ? index1 : -1;
                this.specification = this.specification == -1 ? index2 : -1;

            },

            initArr(response){


                var leftArr = new Array();

                var  rightArr = new Array();

                for (var j = 0; j < response.length; j++){
                    leftArr[j] = 0;
                 }

                for (var i = 0; i < response.length; i++){

                    rightArr[i] = new Array();

                    for (var j =0; j < response[i].foods.length; j++){
                        rightArr[i][j] = 0;
                    }
                }

                this.leftArr = leftArr;

                this.rightArr = rightArr;
            },

            drop(el){

                console.log("drop");
              for (let i = 0; i < this.balls.length; i++){

                  let ball = this.balls[i];
                  if (!ball.show){
                      ball.show = true;
                      ball.el = el;
                      this.dropBalls.push(ball);
                      return;
                  }
              }
            },

            beforeEnter(el){

                console.log("beforeEnter");


                let count = this.balls.length;

                while (count--){
                    let ball = this.balls[count];

                    if (ball.show){
                        let rect = ball.el.getBoundingClientRect();
                        console.log(rect);

                        let x = rect.left - 74;
                        let y = -(window.innerHeight -rect.top - 141);


                        // 外层元素控制y轴方向的过渡
                        el.style.webkitTransform = 'translate3d(0, ' +y+'px, 0)';
                        el.style.transform = 'translate3d(0, ' +y+'px, 0)';

                        // 获取里层元素
                        let inner = el.getElementsByClassName('inner-hook')[0];

                        // 里层元素控制x轴方向的过渡
                        inner.style.webkitTransform = 'translate3d('+x+'px, 0, 0)';
                        inner.style.transform = 'translate3d('+x+'px, 0, 0)';

                    }
                }


            },
            enter(el){

                console.log('enter');

                let rel = el.offsetHeight;

                this.$nextTick(function () {

                    el.style.webkitTransform = 'translate3d(0, 0, 0)';
                    el.style.transform = 'translate3d(0, 0, 0)';

                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0, 0, 0)';
                    inner.style.transform = 'translate3d(0, 0, 0)';

                });

            },
            afterEnter(){

                let ball = this.dropBalls.shift();

                if (ball) {
                    ball.show = false;
                }
                this.isAnimation = true;
            },

            ...mapMutations(['ADD_CAR','REDUCE_CAR']),

            addFood(foodId,name,original_price,price,spec,index,index2){
                this.ADD_CAR({shopId:this.shopId,foodId,name,original_price,price,spec,index,index2});
            },
            reduceFood(foodId){
                this.REDUCE_CAR({shopId: this.shopId,foodId});
            },
            clearCart(){

                this.carList[this.shopId] = {};

                console.log(this.leftArr.length);

                this.initArr(this.goodList)


            },
            jumpToOrder(){
                this.$router.push({
                    path: '/order'
                });

            }

        },

        //TODO VUE MOUNTED
        mounted(){
            //获取商品头部的信息

            //TODO 1.1 获取商家数据
            getShopHeader(this.$route.query.latitude, this.$route.query.longitude, this.$route.query.id).then(response=> {
                //TODO this.shopHeader = response 会调用beforeCreate Created 生命周期钩子函数,重新编译模板,加载数据
                this.shopHeader = response;
                this.backgroudImage = this.getShopImg(this.shopHeader.image_path, "40", "50x40");
            }).catch(error=> {
                console.log(error);
            });

            //获取商品列表的信息
            getShopGoodList(this.$route.query.id).then(response=> {

                this.goodList = response;
                this.initArr(response);

            }).catch(error=> {
                console.log(error);
            });
        }
    }
</script>


<!--TODO CSS     -->
<style lang="scss" type="text/scss">

    /** TODO scss是css的预处理器.使用scss就可以在css代码中使用变量 **/

    /** TODO lang="scss"作用:使用scss语法,项目编译时,可以使用scss处理器将scss处理成浏览器可以识别的css代码.(实际上是解释变量,方法,以及嵌套函数) **/

    /* TODO 不写lang="scss" 会报没有找到相关的依赖包 */

    /* TODO 在vue中使用scss,需要下载相关的依赖包,在package.json里面的devDependencies里面写引用的代码,添相关的依赖包 */

    /* TODO type="text/scss" 让编译器识别scss语法,而不会报语法错误,但是不影响实际项目的使用 */

    /*TODO 导入scss的其他文件 @import是scss的语法,可以使用该文件里面的方法,混合器等等*/
    @import "../../scss/mixin.scss";


    #shop {

        /*TODO 1头部*/
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

    /*TODO 头部结束*/

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


        /*TODO 2商品详情*/

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
                                    div{

                                    @include flex-content(center,flex-end);

                                        color: white;

                                        width: 258px;
                                        .plus{
                                            text-align: center;
                                            vertical-align: middle;
                                            background-color: #0089dc;
                                            font-size: pxToRem(40px);
                                            height: pxToRem(40px);
                                            width: pxToRem(40px);
                                            margin-right: pxToRem(20px);
                                            border-radius: 40px;

                                        }
                                        .minus{
                                            background-color: #0089dc;
                                            font-size: pxToRem(40px);
                                            height: pxToRem(40px);
                                            width: pxToRem(40px);
                                            border-radius: 40px;
                                            margin-right: pxToRem(40px);
                                        }
                                        .number{
                                            height: pxToRem(40px);
                                            width: pxToRem(40px);
                                            color:red;
                                            margin-right: pxToRem(40px);
                                        }

                                    }

                            }
                            .chooseSpecifications{
                                width: pxToRem(750px);
                                height: pxToRem(2200px);
                                /*opacity: 0.6;*/

                                background-color: rgba(0, 0, 0, 0.5);

                                position: absolute;
                                left: 50%;
                                top: 50%;

                                transform: translate(-50%,-50%);

                                .center{
                                    background-color: rgb(255,255,255);
                                    /*opacity: 1;*/

                                    width: pxToRem(600px);
                                    height: pxToRem(412px);
                                    color: white;
                                    display: block;

                                    position: fixed;
                                    left: 50%;
                                    top: 50%;
                                    transform: translate(-50%,-50%);
                                }
                            }

                            /*选规格的淡入淡出的效果类*/
                            .zoom-enter-active, .zoom-leave-active {
                                transition: all .3s ease-in-out;
                            }
                            .zoom-enter, .zoom-leave-to {
                                transform: translate(-50%, -50%) scale(0);
                            }

                            .zoom-enter-to, .zoom-leave {
                                transform: translate(-50%, -50%) scale(1);
                            }
                        }
                    }

                }
            }
        }
    /*TODO 商品详情结束*/


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


        /*TODO 3底部购物车*/

        /*底部购物车的样式*/

        .shopCart{

            /*background-color: #0089dc;*/
            position: fixed;

            bottom: 0;
            left: 0;

            z-index: 110;


            height: pxToRem(90px);
            width: 100%;

            @include flex-content(center, space-between);

            .cart-left{

                background-color: silver;
                height: pxToRem(91px);
                width: pxToRem(540px);
                @include flex-content(center, flex-end);

                .shopCart-icon{
                    padding-top: pxToRem(6px);
                    line-height: pxToRem(60px);
                    text-align: center;
                    width: pxToRem(80px);
                    height: pxToRem(80px);

                    font-size: pxToRem(55px);
                    border-radius: 80px;
                    background-color: #0089dc;

                    position: absolute;

                    left: 50px;
                    bottom: 20px;


                    .car-mount-count{
                        text-align: center;
                        position: absolute;

                        line-height: pxToRem(30px);

                        top: 0;
                        right: 0;
                        width: pxToRem(30px);
                        height: pxToRem(30px);
                        font-size: pxToRem(20px);
                        color: white;

                        border-radius: 30px;

                        background-color: red;

                    }
                }
                .shopCart-count{
                    width: pxToRem(382px);
                }
            }
            .cart-right{
                color: #fff;

                font-size: pxToRem(29px);

                background-color: #4cd964;

                width: pxToRem(210px);
                height: pxToRem(90px);
            }


            /* 动画 小球 */
            .ball-container {

            /* 小球 */
                .ball {
                    /* 固定定位 */
                    position: fixed;

                    left: 60px;
                    bottom: 85px;
                    z-index: 1300;

                    &.drop-enter-active {

                        transition: all .5s cubic-bezier(.62, -0.5, .89, .76);

                        .inner {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            background-color: red;
                            transition: all .5s linear;

                         }
                    }

                }
            }
            .car-icon-animation {
                animation: drop-car 0.5s;
            }

            @keyframes drop-car {
                0%   { transform: scale(1) }
                25%  { transform: scale(.8) }
                50%  { transform: scale(1.1) }
                75%  { transform: scale(.9) }
                100% { transform: scale(1) }
            }





    /* 购物车列表 */
    .car {
        position: absolute;
        width: 100%;
        bottom: 90px;
        left: 0;
        z-index: 10;

        background-color: #fff;
        width: 100%;
    .car-header {
        padding: pxToRem(0px, 25px);
        line-height: pxToRem(80px);
        background-color: #eceff1;
        border-bottom: 1px solid #ddd;
        color: #666;
    .car-title {
        padding-left: pxToRem(10px);
        border-left: pxToRem(7px) solid #3190e8;
        font-size: pxToRem(32px);
    }

    .clear-car {
        float: right;
        font-size: pxToRem(26px);
    }


    }

    .car-list {
        max-height: pxToRem(600px);
        overflow-y: scroll;

        .car-list-item {
            padding: pxToRem(15px, 25px, 15px, 0px);
            margin-left: pxToRem(25px);
            border-bottom: 1px solid #eee;
            @include flex-content(flex-start,space-around);

            .food-message {
                .food-name {
                    max-width: pxToRem(350px);
                    font-size: pxToRem(32px);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }


        }
    }

    }




    /* 购物车列表 过渡 */
    .push-enter-active, .push-leave-active {
        transition: all .3s ease;
    }
    .push-enter, .push-leave-to {
        transform: translateY(100%);
    }

    .push-enter-to, .push-leave {
        transform: translateY(0);
    }

    }

    /*TODO 底部购物车*/

    }

</style>