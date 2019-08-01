<template>
  <div class="goods-list">
    
    <router-link :to="'/home/goodsInfo/' + infos.id " tag="div" v-for="infos in goodsInfos" :key="infos.id" class="goods-item">
      <img :src="infos.img_url" :alt="infos.title">
      <h1 class="title">{{ infos.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ infos.market_price }}</span>
          <span class="old">￥{{ infos.sell_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ infos.stock_quantity }}件</span>
        </p>
      </div>
    </router-link>

    <mt-button type='danger' size='large' @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>


export default {
    data() {
      return {
        pageindex : 1,
        goodsInfos: []
      }
    },
    created() {
      this.getGoodList()
    },
    methods: {
      getGoodList() {
        this.axios.get('getgoods', {
          params: {
            pageindex: this.pageindex
          }
        })
        .then( res => {
          if (res.data.status === 0) {
            console.log(res.data.message)
            this.goodsInfos = this.goodsInfos.concat(res.data.message)
          }
        })
      },
      getMore(){
        this.pageindex++
        this.getGoodList()
      },
      getDetail(id){
        this.$router.push({ name: 'goodsinfo',  params: {id} })
      }
    }
}
</script>


<style lang="scss" scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img{
      width: 100%;
    }
    .title{
      font-size: 14px;
    }

    .info{
      background-color: #eee;
      p{
        margin: 0;
        padding: 5px;
      }
      .price{
        .now{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old{
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
