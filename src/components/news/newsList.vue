<template>
  <div>
    
    <ul class="mui-table-view">
       <li class="mui-table-view-cell mui-media" v-for="(news) in newslist" :key="news.id" tag="li">
        <router-link :to="'/home/newsinfo/' + news.id">
          <img class="mui-media-object mui-pull-left" :src="news.img_url">
          <div class="mui-media-body">
            <h1>{{ news.title }}</h1> 
            <p class="mui-ellipsis">              
              <span>发表时间: {{ news.add_time | dateFormat }}</span>              
              <span>点击数: {{ news.click }} 次</span>              
            </p>
          </div>
        </router-link>
      </li>
    </ul>

  </div>
</template>
<script>

import { Toast } from "mint-ui";

export default {
  
  data() {
    return {
      newslist: [] // 保存轮播图的数组
    };
  },
  created() {
    this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.axios.get('/getnewslist')
        .then((res) => {
          console.log(res)

          if (res.data.status === 0) {
            this.newslist = res.data.message
          }else{
            Toast('没有更多资讯咯')
          }
        })
        .catch((err) => {
            Toast('资讯获取失败')
        })
    }
  }


}
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    .mui-pull-left{
      display: inline-block;
      width: 42px;
      height: 42px;
    }
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
