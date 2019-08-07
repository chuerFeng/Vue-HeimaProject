<template>
  <div class="shopcar-container">
    
    <div class="goods-list">

      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content"  >
					<div  class="mui-card-content-inner" >
						
            <mt-switch v-model="value"></mt-switch>
            <img :src='item.thumb_path'>
            <div class="info">
              <h1>{{ item.title  }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                <!-- $store.getters.getGoodsCount[item.id] -->
                <!-- 如何从购物车中获取商品的数量 -->
                <!-- 可以先创造一个空对象，然后循环购物车中所有的商品
                把商品的id设作为对象的属性名，把商品的数量设做为对象的属性值 -->
                <a href="#" @click="removeCart(item.id, i)">删除</a>
              </p>
            </div>

					</div>
				</div>
			</div>

    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red"></span> 件， 总价 <span class="red">￥</span></p>
          </div>
            <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import numbox from '../subcomponents/shopcart_number.vue'
// mui('.mui-switch')['switch']()

export default {
  data() {
    return {
      goodslist: [],
      ballFlag: false,
      value: false
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      var idArr = []
      this.$store.state.cart.forEach( item => {
        idArr.push(item.id)
      });
      if (idArr.length <= 0) {
        return   
      }
      this.axios.get('/goods/getshopcarlist/' + idArr.join(','))
        .then(res => {
          if (res.data.status === 0) {            
            this.goodslist = res.data.message            
          }
        })
    },
    removeCart(id, index){
      this.goodslist.splice(index, 1)
      this.$store.commit('deletCart', {'id':id})
    }


  },
  components:{
    numbox
  }
  
}
</script>


<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
 

      .mui-numbox {
        width: 100px;
        height: 30px;
        padding: 0 25px;

        button {
          width: 25px;
        }
      }

    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
