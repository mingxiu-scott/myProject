// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import './config/rem.js';
import './scss/index.scss';
import store from './vuex-store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#wang-elm',
  router,
  store
});
