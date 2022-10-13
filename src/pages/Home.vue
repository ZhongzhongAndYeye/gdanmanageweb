<template>
  <el-container id="loginmain">
    <el-header>
      掼蛋配牌后台
      <el-button @click="quitLogin">退出登录</el-button>
    </el-header>
    <el-main>
      <el-col :span="7">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <span>局数赛</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">库存牌局</el-menu-item>
              <el-submenu index="1-2">
                <template slot="title">已选牌局</template>
                <el-menu-item index="1-2-1">第一桌</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>限时赛</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="kcpjck">
                库存牌局
              </el-menu-item>
              <el-submenu index="2-2">
                <template slot="title">已选牌局</template>
                <el-menu-item index="2-2-1">第一桌</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="16" :offset="1">
        <router-view></router-view>
      </el-col>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    quitLogin() {
      localStorage.removeItem("token");
      alert("您已退出登录...");
      this.$router.go(0);
    },
    kcpjck() {
      this.$router.push({
        name: "xsskc",
      });
    },
  },
};
</script>

<style scoped>
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

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 100px;
  height: 100px !important;
  font-size: 50px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 100%;
}
</style>