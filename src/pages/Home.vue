<template>
  <el-container id="loginmain">
    <el-header>
      掼蛋配牌后台
      <el-button @click="quitLogin" size="mini" style="margin-left:100px;">退出登录</el-button>
    </el-header>
    
    <el-main>
      <el-col :span="3">
        <el-menu default-active="1" class="el-menu-vertical-demo" :default-openeds="opends" >

          <el-submenu index="1" class="change">
            <template slot="title"><b>局数赛</b></template>
            <el-menu-item index="1-1">库存牌局</el-menu-item>
            <el-submenu index="1-2">
              <template slot="title">已选牌局</template>
              <el-menu-item index="1-2-1" class="change1" style="padding-left:30px">第一桌</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="2" class="change">
            <template slot="title"><b>限时赛</b></template>
            <el-menu-item index="2-1" @click="xsskcpj">库存牌局</el-menu-item>
            <el-submenu index="2-2">
              <template slot="title">已选牌局</template>
              <el-menu-item
                :index="v.id"
                v-for="v in xsstable"
                :key="v.id"
                @click="xssyxpj(v.id)"
                class="change1"
                style="padding-left:30px"
                >{{ v.tablename }}</el-menu-item
              >
            </el-submenu>
          </el-submenu>

        </el-menu>

      </el-col>
      <el-col :span="21" :offset="0" style="padding-left:5px">
        <router-view></router-view>
      </el-col>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  Name: "Home",
  data() {
    return {
      token: "",
      opends:['1','2'],
      uniqueOpened: false,
      isyx:localStorage.getItem("isyx"),
    };
  },
  methods: {
    quitLogin() {
      localStorage.removeItem("token");
      alert("您已退出登录...");
      this.$router.go(0);
    },
    xsskcpj() {
      this.$router.push({ name: "xsskc" });
    },
    xssyxpj(tableid) {
      this.$router.push({ 
        name: "xssyx",
        query:{
          tableid:tableid
        }
      });
    },
  },
  computed: {
    ...mapState("home", ["tokenvalid", "xsstable"]),
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.$store.dispatch("home/getxsstable", this.token);
    if(this.isyx == 1){
      this.opends.push('2-2')
    }
  },
  watch: {
    tokenvalid() {
      alert("登录状态已失效！请重新登录...");
      this.$store.commit("home/RECOVERTOKENVALID");
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.change {
  text-align: left;
}

.change1{
  text-align: center
}
.el-menu-item-group {
  width: 100%;
}

#i {
  background: white;
  height: 100%;
  width: 70%;
  margin-left: 30%;
}

.el-menu {
  width: 100%;
}

.el-submenu .el-menu-item{
  min-width: 100%;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 50px;
  height: 50px !important;
  font-size: 30px;
}

 .el-main{
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 5px;
  height: 100%;
}

</style>