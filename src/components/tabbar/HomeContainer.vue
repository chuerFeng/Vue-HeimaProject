<template>
  <div>

    <mt-swipe :auto='4000'>
      <mt-swipe-item v-for="item in lunboList" :key="item.url">
        <img src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>


    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-home"></span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
          <div class="mui-media-body">Email</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">Chat</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">location</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">Search</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">Phone</div>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
  import {
    Toast
  } from "mint-ui";

  export default {
    data() {
      return {
        lunboList: []
      }
    },
    created() {
      // this.getLunboList()
    },
    methods: {
      getLunboList() {
        this.$http.get('api/getlunbo').then(function (request) {
          if (request.body.state === 0) {
            this.lunboList = request.body.message
          } else {
            Toast('图片加载失败')
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      &:nth-child(1) {
        background-color: skyblue;
      }

      &:nth-child(2) {
        background-color: pink;
      }

      &:nth-child(3) {
        background-color: palevioletred;
      }
    }
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: 0;
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
</style>