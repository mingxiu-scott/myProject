/**
 * Created by intern on 2017/9/7.
 */

const WangElm = () =>import('@/wangElm');
const Msite = () =>import('pages/msite/msite');
const Discover = ()=>import('pages/discover/discover');
const Order = ()=>import('pages/order/order');
const Profile = ()=>import('pages/profile/profile');

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
            }
        ]
    }
];
