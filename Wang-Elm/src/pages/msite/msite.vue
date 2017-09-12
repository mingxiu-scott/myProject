<template>
    <div id="msite">
        <h3>这是外卖页面</h3>
        <h4>{{address.name}}</h4>
        <h4>{{weather.temperature}}{{weather.description}}</h4>
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
                location : null
            }
        },
        //检测location这个属性
        //可监测data里面的所有属性
        watch:{
            //获取来的数据
            location : function (newValue, oldValue) {
                    //如果定位坐标改变,则重新获取数据
                this.initData();
            }
        },
        //给vue实列添加方法
        methods : {
            initData(){
                getAddress(this.location.latitude,this.location.longitude).then(response=>{
                    this.address = response;
                }).catch(error=>{
                    console.log('没有获取到定位');
                    console.log(error);
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

                setStorage('location',this.location);


                //后面加的获取天气的方法

                getWeather(38.953351,121.525461).then(res=>{
                    this.weather = res;
                }).catch(error => {
                    console.log(error);
                });

//                getAddress(position.coords.latitude, position.coords.longitude).then(response => {
//                    this.address = response;
//
//                }).catch(error => {
//                    console.log('没有获取到地址');
//                    console.log(error);
//                });


            } catch (error) {
                this.location = getStorage('location');
                console.log(error);
            }
        }
        //相当于上面的data
//        created(){

        //异步操作的一种状态
//            var pro = new Promise(function (resolve, reject) {
//                return navigator.geolocation.getCurrentPosition(resolve, reject);
//            });
//
//            异步操作
//            pro.then(position => {
//                普通函数的this是undefined的,箭头函数的this代表的是整个组件的信息
//                console.log(position.coords.latitude);
//                console.log(position.coords.longitude);
//            }, function (error) {
//                console.log(error);
//            });
//
//            fetch('/bgs/weather/current?latitude=38.953351&longitude=121.525461', {method: "GET"}).then(function (res) {
//                console.log(res.json());
//                return res.json();
//
//            }).then(function (data) {
//                console.log(data);
//            }).catch(function (error) {
//                console.log(error);
//            });

//            navigator.geolocation.getCurrentPosition(function (position) {
//                console.log(position.coords.latitude);
//                console.log(position.coords.longitude);
//            },function (error) {
//                console.log(error);
//            });
//        }
    }
</script>

<style>

</style>