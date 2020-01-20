<template>
  <div id="">
    <div class="border_btm">
      <div class="header wid">
        <div id="" @click="back">
          <img src="../../static/images/back.png" v-if='this.$route.name!="login"'/>
        </div>
        {{title}}
        <div id="" @click="more">
          <img src="../../static/images/more.png" v-if='this.$route.name!="login"'/>
        </div>
      </div>
    </div>
    <div style="height: 50px;width: 100%;">

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      more() {

      }
    }
  }
</script>

<style scoped>
  .wid {
    width: 92%;
    margin: 0 auto;
  }

  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  img {
    width: 20px;
    height: 20px;
  }

  .border_btm {
    background: #ffffff;
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
  }
</style>
