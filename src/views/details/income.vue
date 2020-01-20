<template>
  <div>
    <nav-header :title="title" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list">
          <div class="content" v-for="(item, index) in list" :key="index">
            <div>
              <div class="serial">订单{{ item.trade_no }}</div>
              <div class="time">{{ item.pay_at }}</div>
            </div>
            <div class="price">+{{ item.player_b_value }}</div>
          </div>
        </div>
        <no-data v-if="list.length == 0"></no-data>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import navHeader from '@c/header';
import noData from '@c/noData';
export default {
  components: {
    navHeader,
    noData
  },
  data() {
    return {
      title: '收入明细',
      list: [],
      loading: false, //List 组件通过loading和finished两个变量控制加载状态，当组件滚动到底部时，会触发load事件并将loading设置成true。
      finished: false, //此时可以发起异步操作并更新数据，数据更新完毕后，将loading设置成false即可。若数据已全部加载完毕，则直接将finished设置成true即可。
      isLoading: false, //下拉刷新时会触发 refresh 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成。
      page:0 //分页参数
    };
  },
  beforeMount() {
    this.getListByCon()
  },
  methods: {
    //根据配置获取充值记录列表
    getListByCon(){
      _api.gameOrder_getListByCon({page:this.page}).then(res=>{
        this.list=this.list.concat(res.data)
        if(res.data.length<15){
          // 数据全部加载完成
          this.finished = true;
          setTimeout(()=>{
            this.finished = false;
          },600)
        }
        this.loading = false; // 加载状态结束
        this.isLoading = false;
      })
    },
    // 上拉加载数据
    onLoad() {
      this.page++
      this.getListByCon()
    },
    //下拉刷新
    onRefresh() {
      this.page=0
      this.list=[]
      this.getListByCon()
    }
  }
};
</script>

<style>
.more {
  display: flex;
  justify-content: center;
  padding: 5px;
  color: #888;
  font-size: 14px;
}
.time {
  color: #989490;
  font-size: 10px;
}
.serial {
  color: #323030;
  font-size: 14px;
}
.price {
  color: #e92e48;
  font-size: 14px;
}
.content {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 0px 0px rgba(242, 243, 246, 1);
  padding: 9px 0;
}
.list {
  width: 92%;
  margin: 10px auto;
  background: #ffffff;
  min-height: calc(100vh - 70px);
}
</style>
