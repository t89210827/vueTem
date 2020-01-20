<template>
  <div>
    <nav-header :title="title" />
    <div class="bg"></div>
    <div
      style="margin-top: -20px;"
      class="wid padding-tb-20 flex flex-center bg-fff border-radius-10"
    >
      <div class="font-size-13 color-686461">伴你币</div>
      <div class="padding-t-5 font-size-24">{{ wallet }}</div>
      <div class="font-size-13 color-686461 flex-center" @click="goPage('recharge')">
        充值明细
        <img class="next" src="../../static/images/next.png" />
      </div>
    </div>
    <div class="wid margin-t-10 padding-tb-20 flex flex-center bg-fff border-radius-10">
      <div class="font-size-13 color-686461">伴你币</div>
      <div class="padding-t-5 font-size-24">{{ income }}</div>
      <div class="btn-box">
        <div class="left" @click="goPage('presentation')">提现明细</div>
        <div class="right">提现</div>
      </div>
      <div class="font-size-13 color-686461 flex-center" @click="goPage('income')">
        收入明细
        <img class="next" src="../../static/images/next.png" />
      </div>
    </div>
  </div>
</template>

<script>
import navHeader from "@c/header";
export default {
  components: {
    navHeader
  },
  data() {
    return {
      title: "我的钱包",
      wallet: 123.45, //伴你币
      income: 99999.99 //伴你收入
    };
  },
  beforeMount() {
    this.getWalletForOfficial();
  },
  methods: {
    getWalletForOfficial() {
      //公众号钱包页面聚合接口
      _api.page_getWalletForOfficial({}).then(res => {});
    },
    goPage(name) {
      this.$toView(name);
    }
  }
};
</script>

<style lang="less" scoped>
.next {
  width: 12px;
  height: 12px;
}
.left {
  width: 100px;
  height: 30px;
  border: 1px solid rgba(252, 158, 104, 1);
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  color: #fc9e68;
}
.right {
  width: 100px;
  height: 30px;
  background: linear-gradient(
    80deg,
    rgba(233, 46, 72, 1),
    rgba(255, 174, 109, 1)
  );
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  color: #fff;
}
.btn-box {
  width: 65%;
  margin: 10px auto 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bg {
  width: 100%;
  height: 200px;
  background: url("../../static/images/walletbg.png") no-repeat;
  background-size: 100% 100%;
}
</style>
