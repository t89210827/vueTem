<template>
  <div class="login">
    <nav-header :title="title" />
    <div class="box flex-center">
      <img class="logo" src="../../../static/images/lock.png" alt />
    </div>
    <div class="input_box">
      <img class="icon" src="../../../static/images/phone.png" alt />
      <input
        class="padding-l-10"
        @blur="phoneBlur"
        type="tel"
        maxlength="11"
        v-model="phone"
        placeholder="请输入手机号"
      />
    </div>
    <div class="margin-t-30 flex-between input_box">
      <div class="align-items-center">
        <img class="icon" src="../../../static/images/lock.png" alt />
        <input class="padding-l-10" v-model="code" type="number" placeholder="请输入验证码" />
      </div>
      <div class="code" @click="getCodeFn">{{ get_code }}</div>
    </div>
    <div class="btn" @click="bang">绑定</div>
  </div>
</template>

<script>
import navHeader from "@c/header";
import { mapActions } from "vuex";
export default {
  components: {
    navHeader
  },
  data() {
    return {
      title: "登录",
      phone: "", //手机号码
      code: "", //验证码
      get_code: "获取验证码", // 按钮里显示的内容
      total_time: 60, //记录具体倒计时时间
      can_click: true //添加can_click解决多次点击之后，倒讲时速度变快
    };
  },
  methods: {
    ...mapActions(["load"]),

    phoneBlur() {
      let reg = /^0?(1[0-9][0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
      if (this.phone.length != 11 || !reg.test(this.phone)) {
        this.$alert.toast("请输入正确的手机号码");
        return false;
      } else {
        return true;
      }
    },

    //获取验证码
    getCodeFn() {
      throw new Error("1111111111");

      // if (!this.phoneBlur()) return; //没填或错填手机号禁止获取验证码
      // if (!this.can_click) return; //改动的是这两行代码
      // this.can_click = false;
      // _api.common_sendVertifyCode({ phonenum: this.phone }).then(res => {
      //   this.$alert.toast(res);
      // });
      // let clock = window.setInterval(() => {
      //   this.total_time--;
      //   this.get_code = this.total_time + "s后重新发送";
      //   if (this.total_time < 0) {
      //     //当倒计时小于0时清除定时器
      //     window.clearInterval(clock);
      //     this.get_code = "重新获取";
      //     this.total_time = 6;
      //     this.can_click = true; //这里重新开启
      //   }
      // }, 1000);
    },

    bang() {
      if (this.phone.trim() == "") {
        this.$alert.toast("请输入手机号码");
        return;
      }
      if (this.code.trim() == "") {
        this.$alert.toast("请输入验证码");
        return;
      }
      _api
        .user_login({
          account_type: "1",
          phonenum: this.phone,
          code: this.code
        })
        .then(res => {
          localStorage.setItem("user_id", res.id);
          localStorage.setItem("token", res.token);
          this.$store.commit("load");
          this.$toView("index");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background-color: #ffffff;
  min-height: 100vh;
}
.logo {
  width: 70px;
  height: 70px;
}
.box {
  height: 170px;
}
.input_box {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #323030;
  padding: 15px 0;
  display: flex;
  align-items: center;
}
.code_box {
  margin-top: 30px;
  justify-content: space-between;
}
.code_input {
  display: flex;
  align-items: center;
}
.icon {
  width: 10px;
  height: 15px;
}

.code {
  width: 80px;
  height: 25px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(50, 48, 48, 1);
  font-size: 12px;
  text-align: center;
  line-height: 25px;
}
.btn {
  width: 315px;
  height: 40px;
  margin: 50px auto;
}
</style>
