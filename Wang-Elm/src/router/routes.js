/**
 * Created by intern on 2017/9/7.
 */
//路由懒加载
const WangElm = () =>import('@/wangElm');
const Msite = () =>import('pages/msite/msite');
const Discover = ()=>import('pages/discover/discover');
const Order = ()=>import('pages/order/order');
const Profile = ()=>import('pages/profile/profile');
const shop = ()=> import('pages/shop/shop');
//路由对象
export default [
    {
        path: '/',
        component: WangElm,
        redirect: '/msite',
        children: [
            {
                path: '/msite',
                component: Msite
            },
            {
                path: '/discover',
                component: Discover
            },
            {
                path: '/order',
                component: Order
            },
            {
                path: '/profile',
                component: Profile
            },
            {
                path:'/shop',
                component: shop
            }
        ]
    }
];
