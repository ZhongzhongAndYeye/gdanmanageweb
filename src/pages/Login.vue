<template>
  <el-container id="loginmain">
    <el-header>惯蛋配牌后台</el-header>
    <el-main>
      <div id="login">
        <div id="header">
          <h1>账户登录</h1>
        </div>
        <el-input
          id="username"
          autocomplete="false"
          placeholder="请输入账号"
          v-model="username"
        ></el-input>
        <el-input
          id="pwd"
          placeholder="请输入密码"
          v-model="password"
          show-password
        ></el-input>
        {{ msg }}
        <el-button id="loginbutton" @click="login">登录</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { login } from "../api";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    login() {
      var param = {
        username: this.username,
        password: this.password,
      };
      if (this.username == "" || this.password == "") {
        alert("账号或密码不能为空！");
        return;
      }
      login(param).then(
        (response) => {
          this.msg = response.msg;
          if (response.msg == "登录成功") {
            localStorage.token = response.token;
            this.$router.push({
              name: "home",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    this.msg = "";
  },
};
</script>

<style >
.el-input__prefix {
  left: 90%;
}

#loginbutton {
  background-color: #e9eef3;
  border-color: #b3c0d1;
  color: #333;
  height: 40px;
  width: 80px;
  margin-top: 30px;
}

#header {
  background: #b3c0d1;
  margin-top: -21px;
  height: 50px;
  line-height: 50px;
}

#username {
  width: 80%;
  margin-top: 30px;
  margin-bottom: 20px;
}
#pwd {
  width: 80%;
}

#login {
  border: 1px solid #b3c0d1;
  color: #333;
  width: 50%;
  height: 50%;
  margin-top: 5%;
  margin-left: 25%;
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

#loginmain {
  height: 685px;
}
</style>