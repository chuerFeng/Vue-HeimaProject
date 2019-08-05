<template>
  <div class="goodsinfo-container">
    
     <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
  
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
          <p>购买数量: <goodsinfoNum :max='goodsInfo.stock_quantity' @getcount='getSelectCount'></goodsinfoNum></p>
          <p>
            <mt-button type='primary' size='small'>立即购买</mt-button>            
            <mt-button  type='danger'  size='small'  @click="addToShopCar">加入购物车</mt-button>
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
import goodsinfoNum from '../subcomponents/goodsinfo_numbox.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: [],
      goodsInfo: [],
      selectCound: 1,
      ballFlag: false
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
    },
    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;

      var goodsinfo = { 
        id: this.id, 
        count: this.selectCound, 
        price: this.goodsInfo.sell_price, 
        selected: true
      }
      
      this.$store.commit('addToCar', goodsinfo)
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectCount(countNum){
      this.selectCound = countNum
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

.ball {
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  z-index: 99;
  top: 390px;
  left: 146px;
}

</style>


