<template>
  <div>
    <nav-header :title="title" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list">
          <div class="content" v-for="(item, index) in list" :key="index">
            <div class="flex-between align-items-center">
              <span class="font-size-13 color-323030">本次提现关联{{item.game_order_ids | num}}个订单</span>
              <img class="next" src="../../../static/images/next.png">
            </div>
            <div class="flex-between align-items-center padding-tb-5">
              <span class="font-size-12 color-989490">提现时间</span>
              <span class="font-size-10 color-989490">{{item.created_at}}</span>
            </div>
            <div class="flex-between align-items-center">
              <span class="font-size-12 color-989490">提现金额</span>
              <span class="font-size-12 color-e92e48">{{item.settle_fee}}元</span>
            </div>
          </div>
          <no-data v-if="list.length==0"></no-data>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import noData from '@c/noData'
  import navHeader from '@c/header';
  export default {
    components: {
      navHeader,
      noData
    },
    filters: {
      num: function(value) {
        return value.split(",").length;
      }
    },
    data() {
      return {
        title: '提现明细',
        list: [],
        loading: false, //List 组件通过loading和finished两个变量控制加载状态，当组件滚动到底部时，会触发load事件并将loading设置成true。
        finished: false, //此时可以发起异步操作并更新数据，数据更新完毕后，将loading设置成false即可。若数据已全部加载完毕，则直接将finished设置成true即可。
        isLoading: false, //下拉刷新时会触发 refresh 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成。
        page:1 //分页参数
      };
    },
    beforeMount() {
      this.getListByCon()
    },
    methods: {
      //根据配置获取充值记录列表
      getListByCon(){
        _api.playerSettleApply_getListByCon({page:this.page}).then(res=>{
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
        this.page=1
        this.list=[]
        this.getListByCon()
      }
    }
  };
</script>

<style>
  .next {
    width: 15px;
    height: 15px;
  }

  .content {
    width: 90%;
    margin: 0 auto;
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
