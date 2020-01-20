<template>
  <div>
    <nav-header :title="title" />
    <div class="account">
      <div>伴你号</div>
      <input class="padding-l-10" type="tel" v-model="phone" @blur="phoneBlur" :disabled="is_readonly" maxlength="11"
        placeholder="请输入您的账号" />
      <div class="other_btn" @click="change">{{other_account}}</div>
    </div>
    <div class="box">
      <div class="invest">
        <div class="title">充值金额</div>
        <div class="point">{{num}}元={{price}}伴你币，购买伴你币后不可提现</div>
        <div class="select_box">
          <div @click="selectPrice(index)" class="select" :class="is_select==index?'active':''" v-for="(item,index) in list"
            :key="index">
            <div>{{item.show_price}}</div>
            <div>￥{{item.sale_price}}</div>
          </div>
        </div>
        <!-- 暂时不要可选数额 -->
        <!-- <div class="entry">
          <input class="padding-l-10" type="number" placeholder="请输入您要充值的金额" />
        </div> -->
        <div class="pay_type">支付方式：微信支付</div>
      </div>
    </div>
    <div class="btn" @click="goInvest">立即充值</div>
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
        title: "充值伴你币",
        other_account: '其他账号', ///other_account
        phone: '13050022537', //我的手机号
        is_readonly: false, //切换账号时只读限制
        num: 1, //充值金额换算提示 接人民币
        price: 1, //充值金额换算提示 接伴你币
        is_select: 0, //选择兑换金额
        list: [] ,//充值卡列表
        recharge_card_id:'' //充值卡ID
      };
    },
    beforeMount() {
      this.getListByCon()
    },
    methods: {
      getListByCon() { //获取充值卡列表
        _api.rechargeCard_getListByCon({}).then(res => {
          this.list = res;
          this.selectPrice(0) //设置默认 初始充值卡ID
        })
      },
      phoneBlur() {
        let reg = /^0?(1[0-9][0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
        if (this.phone.length != 11 || !reg.test(this.phone)) {
          this.$alert.toast('请输入正确的账号');
          return false;
        } else {
          return true;
        }
      },
      goInvest() { //充值卡充值
        if (!this.phoneBlur()) return //没填或错填账号禁止充值
        _api.rechargeOrder_payOrder({recharge_card_id:this.recharge_card_id,pay_channel:'1',pay_type:'1',phonenum:this.phone}).then(res=>{
          
        })
      },
      selectPrice(index) { //选择充值金额
        this.is_select = index;
        this.recharge_card_id=this.list[index].id
      },
      change() { //切换账号
        if (this.other_account == '其他账号') {
          this.other_account = '我的账号'
          this.phone = ''
        } else {
          this.other_account = '其他账号'
          this.phone = '13050022537'
        }
      }
    }
  };
</script>

<style>
  .pay_type {
    font-size: 13px;
    margin-top: 26px;
  }

  .entry {
    margin-top: 25px;
    width: 92%;
    height: 35px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(242, 243, 246, 1);
    border-radius: 20px;
    display: flex;
    align-items: center;
  }

  .select {
    width: 45%;
    height: 35px;
    border: 1px solid rgba(242, 243, 246, 1);
    border-radius: 20px;
    margin-top: 25px;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }

  .select>div {
    line-height: 35px;
  }

  .active {
    background: linear-gradient(80deg,
      rgba(249, 76, 90, 0.3),
      rgba(255, 174, 109, 0.3));
  }

  .select_box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .point {
    font-size: 10px;
    color: #989490;
  }

  .title {
    font-size: 15px;
  }

  .invest {
    width: 95%;
  }

  .box {
    border-radius: 10px;
    width: 92%;
    height: 300px;
    margin: 0 auto;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0 0 0;
  }

  .account {
    border-radius: 10px;
    width: 92%;
    background: #ffffff;
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 0;
  }

  .other_btn {
    width: 80px;
    height: 25px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(233, 46, 72, 1);
    border-radius: 15px;
    color: #e92e48;
    text-align: center;
    line-height: 25px;
  }

  .btn {
    width: 315px;
    height: 40px;
    margin: 50px auto;
  }
</style>
