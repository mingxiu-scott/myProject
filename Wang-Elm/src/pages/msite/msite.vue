<template>
    <div id="msite">

        <div id="top">
           <div>
               <!--地理位置,天气的代码-->
               <div id="location">
                   <div>
                       <i class="fa fa-map-marker"></i>
                       <span>{{address.name}}</span>
                   </div>
                   <div>
                       
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
                   <a href="#">饺子</a>
                   <a href="#">土豆粉</a>
                   <a href="#">麦当劳</a>
                   <a href="#">汉堡王7折</a>
                   <a href="#">寿司</a>
                   <a href="#">鸡公煲</a>
                   <a href="#">凉皮</a>
                   <a href="#">凉皮</a>
                   <a href="#">凉皮</a>
               </div>
           </div>
        </div>



        <h4>{{address.name}}</h4>
        <i class="fa fa-glass"></i>

        <wang-footer></wang-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import wangFooter from '@/components/footer';

    import {
            getPosition,
            getAddress,
            getWeather
    }from '@/data/getData';


    import {
            getStorage,
            setStorage
    }from '@/config/LocalStorage';


    export default{
        name: 'msite',
        components: {
            wangFooter
        },

        //这里必须是个函数
        data: function () {
            return {
                address: {},
                weather: {},
                location: null
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
                getAddress(this.location.latitude, this.location.longitude).then(response=> {
                    this.address = response;
                }).catch(error=> {
                    console.log('没有获取到定位');
                });
            }

        },
        async mounted (){

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
        }
    }
</script>

<style lang="scss">

    @import "../../scss/mixin.scss";
    #top {
        width: 100%;
        height: pxToRem(225px);

        background-color: #0085ff;

        &>div{
            padding-left: pxToRem(10px);
              padding-right: pxToRem(10px);

             margin-top: pxToRem(20px);


             #location{
                 /*...的生成*/


                 color: white;
                   padding-top: pxToRem(34px);
                   font-size: pxToRem(34px);
                   @include flex-content(center, space-between);

                 div:first-child{
                     white-space: nowrap;
                     overflow: hidden;
                     text-overflow: ellipsis;

                     width: pxToRem(350px);
                 }
                 div:nth-child(2){



                 }


             }
             #search{
                 margin-top: pxToRem(20px);
                 width: 100%;
                 height: pxToRem(60px);
                 background-color: white;
                 text-align: center;
                 /*vertical-align: middle;*/
                 line-height: pxToRem(60px);
             }
             #keyword{
                 white-space: nowrap;
                 overflow: hidden;
                 text-overflow: ellipsis;
                 width: 100%;
                 margin-top: pxToRem(20px);
                 font-size: pxToRem(25px);
                 color: white;
                 a{
                     margin-right: 30px;
                 }
             }
         }
    }

</style>