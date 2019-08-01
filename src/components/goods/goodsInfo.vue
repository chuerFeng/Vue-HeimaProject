<template>
  <div class="goodsinfo-container">
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <!-- <div class="mui-card-header">页眉</div> -->
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList='lunbotuList' :isfull="false"></swiper>
        </div>
      </div>
      <!-- <div class="mui-card-footer">页脚</div> -->            
    </div>



    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品购买区域</p>
        </div>
      </div>
      <div class="mui-card-footer">页脚</div>      
    </div>
    


    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品参数</p>
        </div>
      </div>
      <div class="mui-card-footer">页脚</div>      
    </div>
  
  </div>

</template>

<script>
import { Toast } from "mint-ui";
import swiper from '../subcomponents/swiper.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: []
    }
  },
  created() {
    this.getLunbotu()
  },
  methods: {
    getLunbotu() {
      // 获取轮播图数据的方法
      this.axios.get('/getthumimages/'+ this.id)
        .then( (res) => {                 
          if (res.data.status === 0) {
            //  成功了          
            this.lunbotuList = res.data.message;
            this.lunbotuList.forEach((v) => {
              v.img = v.src
            });          
          }else{
            // 失败的
            Toast("加载轮播图失败。。。");
          }          
        })  
    }
  },
  components: {
    swiper
  }

}
</script>


<style lang="scss" scoped>
.goodsinfo-container{
  background-color: whitesmoke;
  overflow: hidden;
}

</style>


