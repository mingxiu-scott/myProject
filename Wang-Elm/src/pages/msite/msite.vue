<template>
    <div id="msite">
                <!--地理位置,天气的代码-->
                <div id="location">
                    <div>
                        <i class="fa fa-map-marker"></i>
                        <span v-if="address">{{address.name}}</span>
                    </div>
                    <div v-if="weather">
                        <div style="display: inline">
                            <p>{{temperature}}度</p>
                            <p>{{description}}</p>
                        </div>
                        <div style="display: inline">
                            <img :src="getPath(weather.image_hash,'69x69')" alt="">
                        </div>
                    </div>
                </div>
                <!--中间搜索商家的html代码-->
                <a href="">
                    <div id="search">
                        <i class="fa fa-search"></i><span>搜索商家,商品名称</span>
                    </div>
                </a>
                <!--关键字搜索的代码段-->
                <div id="keyword">
                    <router-link to="" v-for="(a, index) in hotSearchWords" :key="index" >{{a.word}}</router-link>
        </div>

        <div id="entries">
            <div>
                <!--第一页-->
                <div class="entris-first" @touchstart="start" @touchmove="move" @touchend="end">
                    <router-link to="" v-for="(a, index) in entries" :key="index" v-if="index < 8">
                        <div>
                            <img :src="getPath(a.image_hash,'90x90')" alt="">
                        </div>
                        <span>{{a.name}}</span>
                    </router-link>
                </div>
                <div class="entries-second">
                    <router-link to="" v-for="(a, index) in entries" :key="index" v-if="index >= 8">
                        <div>
                            <img :src="getPath(a.image_hash,'90x90')" alt="">
                        </div>
                        <span>{{a.name}}</span>
                    </router-link>
                </div>
            </div>

            <!--小圆圈-->
            <div class="circle">
                <div></div>
                <div></div>
            </div>
            <!--第二页-->
        </div>

        <div class="index-shop-title">推荐商家</div>
             <list :latitude="location.latitude" :longitude="location.longitude" v-if="location"></list>
        <wang-footer></wang-footer>

    </div>
</template>

<script type="text/ecmascript-6">
    import wangFooter from '@/components/footer';
    import list from "@/components/list";

    import {
            getImgPath
    } from '@/config/until'

    import {
            getPosition,
            getAddress,
            getWeather,
            getHotSearchWords,
            getEntries
    }from '@/data/getData';


    import {
            getStorage,
            setStorage
    }from '@/config/LocalStorage';


    export default{
        name: 'msite',
        components: {
            wangFooter,
            list
        },

        //这里必须是个函数
        data: function () {
            return {
                address: null,
                weather: null,
                location: null,
                temperature: null,
                description: null,
                hotSearchWords: [], // 热门搜索词汇
                entries: [], //首页分类
                addressName: '获取地址中...',// 地址名称
            }
        },
        //检测location这个属性
        //可监测data里面的所有属性
        watch: {
            //获取来的数据
            location: function (newValue, oldValue) {
                //如果定位坐标改变,则重新获取数据
                this.initData();
            }
        },
        //给vue实列添加方法
        methods: {
            initData(){
                //最后是转化为vue实列的对象
                getAddress(this.location.latitude, this.location.longitude).then(response=> {
                    this.address = response;
                }).catch(error=> {
                    console.log('没有获取到定位');
                });

                // 获取天气信息
                getWeather(this.location.latitude, this.location.longitude).then(response => {
                    this.weather = response;
                    this.temperature = response.temperature;
                    this.description = response.description;
                }).catch(reject => {
                    console.log(reject);
                });

                // 获取热门搜索词汇
                getHotSearchWords(this.location.latitude, this.location.longitude).then(response => {
                    this.hotSearchWords = response;
                });

                // 获取首页分类
                getEntries(this.location.latitude, this.location.longitude).then(response => {
                    this.entries = response;
                    this.entries = this.entries[0].entries;
                    console.log(this.entries);
                });
            },
            getPath: getImgPath,
            start(event){
                console.log(event);
                console.log('start');
            },
            move(event){
                console.log(event);
                console.log('move');
            },
            end(event){
                console.log(event);
                console.log('end');
            }

        },
        async mounted (){

            console.log("msite mounted");

            try {
                let position = await getPosition();

                //存储本地

                this.location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                setStorage('location', this.location);

                //后面加的获取天气的方法

                getWeather(38.953351, 121.525461).then(res=> {
                    this.weather = res;
                }).catch(error => {
                    console.log(error);
                });

            } catch (error) {
                this.location = getStorage('location');
                console.log(error);
            }
        },

        beforeCreate(){
            console.log('msite before create');
        },
        created(){
            console.log('msite created');
        },
        beforeMount(){
            console.log('msite beforeMount');
        },
        beforeUpdate(){
            console.log('msite beforeUpdate');
        },
        updated(){
            console.log('msite updated');
        },
        activated(){
            console.log('msite activated');
        },
        activated(){
            console.log('msite activated');
        },
        beforeDestroy(){
            console.log('msite beforeDestory');
        },
        destroyed(){
            console.log('msite destroyed');
        }
    }
</script>

<style lang="scss" type="text/scss">

    @import "../../scss/mixin.scss";

    #location {
        /*...的生成*/

        background-color: #0089dc;

        color: white;
        padding-top: pxToRem(34px);
        font-size: pxToRem(34px);
    @include flex-content(center, space-between);

    div:first-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        width: pxToRem(350px);
    }

    div:nth-child(2) {
        /*border: 1px solid red;*/
        text-align: right;
        font-size: pxToRem(24px);
        /*font-size: pxToRem(24px);*/
    @include flex-content(center, flex-end)
    }

    }
    #search {
        margin-top: pxToRem(20px);
        width: 100%;
        height: pxToRem(70px);
        background-color: white;
        text-align: center;
        line-height: pxToRem(70px);

        position: sticky;
        top:0;
        left: 0;
        z-index: 1000;
    }

    #keyword {
        background-color: #0089dc;

        padding-top: 10px;
        padding-bottom: 10px;

        white-space: nowrap;
        overflow: auto;
        width: 100%;
        margin-top: pxToRem(20px);
        font-size: pxToRem(25px);
        color: white;

    a {
        color: #fff;

    @include property-of-rem(margin-right, 30px);
    }

    }

    #entries {

        /*@include flex-content(center, space-between);*/

        width: 100%;
        height: pxToRem(350px);

    div:first-child {

    position : relative;
        z-index: 100;


    .entris-first{

        /*position: absolute;*/




        background-color: white;
        height: pxToRem(330px);
        width: 100%;

        flex-wrap: wrap;

        /*padding: pxToRem(10px);*/
    @include flex-content(center, space-around);

    a {
        text-align: center;
        display: block;
        width : pxToRem(187px);
        height : pxToRem(127px);

    div {
        width: pxToRem(90px);
        height: pxToRem(90px);

        margin-left: pxToRem(45px);
        margin-bottom: pxToRem(10px);

    }

    }
    }

    .entries-second{
        background-color: white;
        height: pxToRem(330px);
        width: 100%;

        flex-wrap: wrap;

        /*padding: pxToRem(10px);*/
    @include flex-content(center, flex-start);

    display: none;

    a {
        text-align: center;
        display: block;
        /*如果要显示,更改上面为block就行了*/
        width : pxToRem(187px);
        height : pxToRem(127px);


    div {
        width: pxToRem(90px);
        height: pxToRem(90px);
        margin-left: pxToRem(45px);
        margin-bottom: pxToRem(10px);

    }
    }
    }

    }

    .circle{
        background-color: white;

    @include flex-content(center, center);


    div{

            width: pxToRem(8px);
            height: pxToRem(8px);
            border: pxToRem(2px) solid olivedrab;
            border-radius: pxToRem(8px);

            margin: 5px;
        }
    }
    }

    .index-shop-title{
        background-color: white;
        width: 100%;
        height: pxToRem(80px);
        font-size: pxToRem(32px);

        padding-top: pxToRem(20px);

        margin-top: pxToRem(10px);

        color: #333;
    }

</style>