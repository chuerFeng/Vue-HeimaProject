<template>
  <div class="goodsinfo-container">
    
    <div class="ball"></div>
  
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <!-- <div class="mui-card-header">页眉</div> -->
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper class="swiper_wrap" :lunbotuList='lunbotuList' :isfull="false"></swiper>
        </div>
      </div>
    </div>



    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{goodsInfo.market_price}}</del>  销售价: <span class="now_price">￥{{goodsInfo.sell_price}}</span>
          </p>
          <p>购买数量: <goodsinfoNum></goodsinfoNum>
            <!-- <transition
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter">
              <div class="ball" v-show="ballFlag" ref="ball"></div>
            </transition> -->
          </p>
          <p>
            <mt-button type='primary' size='small'>立即购买</mt-button>            
            <mt-button type='danger' size='small'>加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    


    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no }}</p>
          <p>库存情况：<span>{{ goodsInfo.stock_quantity }}</span>件</p>
          <p>上架时间：<span>{{ goodsInfo.add_time | dateFormat }}</span></p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type='primary' plain size='large' @click="getDesc(id)">图文介绍</mt-button>        
        <mt-button type='danger' plain size='large' @click="getComment(id)">商品评论</mt-button>  
      </div>      
    </div>
  
  </div>

</template>

<script>
import { Toast } from "mint-ui";
import swiper from '../subcomponents/swiper.vue'
import goodsinfoNum from '../subcomponents/goodsinfo_num.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: [],
      goodsInfo: []
    }
  },
  created() {
    this.getLunbotu(),
    this.getgoodsInfo()
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
    },
    getgoodsInfo() {
      this.axios.get('goods/getinfo/'+ this.id)
      .then( (res) => {
        if (res.data.status === 0) {          
          this.goodsInfo = res.data.message[0]
          console.log(this.goodsInfo);                
        }else{
          Toast('数据加载失败')
        }
      })
      .catch( (err) => {
        Toast('数据加载失败')
      })
    },
    getDesc(id) {
      // 点击使用编程师导航 跳转到 图文介绍页面
      this.$router.push({name: 'goodsDesc', params: {id}})
    },
    getComment(id){
      // 点击跳转到评论页面
      this.$router.push({name: 'goodsComment', params: {id}})
    }
  },
  components: {
    swiper,
    goodsinfoNum
  }

}
</script>


<style lang="scss" scoped>
.goodsinfo-container{
  background-color: whitesmoke;
  overflow: hidden;
}

.swiper_wrap{
  text-align: center;
}

.mui-card{

  .price{
    color: #333;
    del{
      color: #9c9c9c;
    }
  }
  .now_price{ color: red; }

  .mui-card-footer{
    display: block;

    .mint-button{
      margin-bottom: 10px;
    }
  }  
}

.ball{
  position: absolute;    
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  z-index: 99;
}

</style>


