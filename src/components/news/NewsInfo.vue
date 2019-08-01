<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>

    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content">


    </div>     
    <img class="mui-media-object" :src="newsinfo.img_url">

    <!-- 评论子组件区域 -->
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
  // 导入评论子组件
  import commentCompents from "../subcomponents/comment.vue"

  export default {
    data() {
      return {
        id: this.$route.params.id,
        newsinfo: {}
      }
    },
    created() {
      this.getNewInfo()
    },
    methods: {
      getNewInfo() {
        this.axios.get('getnew/'+ this.id)
        .then((res) => {
          this.newsinfo = res.data.message[0]
          console.log( res );                    
        })
      }
    },
    components: {
      comment: commentCompents
    }

  }
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 10px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: #333;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
