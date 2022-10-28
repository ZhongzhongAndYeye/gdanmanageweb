<template>
  <el-container>
    <el-header>
      <div id="headerbtn">
        <el-popover placement="bottom" width="160" v-model="visible">
          <p>确定删除该桌下的此牌局吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" @click="visible = false">取消</el-button>
            <el-button
              type="danger"
              plain
              size="mini"
              @click="
                visible = false;
                deltablepj();
              "
              >确定</el-button
            >
          </div>
          <el-button
            type="danger"
            plain
            slot="reference"
            size="small"
            :disabled="this.tablepjid == ''"
            >删除</el-button
          >
        </el-popover>
      </div>
      <!-- 局数选择导航条 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="this.tablepjdata.length"
        prev-text="上一局"
        next-text="下一局"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        >111
      </el-pagination>
    </el-header>
    <el-main>
      <!-- 牌局显示表格 -->
      <el-table :data="tabledata" :show-header="false" style="font-size: 102px">
        <!-- 向上按钮 -->
        <el-table-column label="up" style="padding: 0px" width="65px">
          <template slot-scope="scope">
            <el-button
              type="info"
              plain
              size="mini"
              icon="el-icon-arrow-up"
              @click="changeorder(scope.row.order, 1)"
            ></el-button>
          </template>
        </el-table-column>
        <!-- 序号 -->
        <el-table-column
          label="序号"
          style="padding: 0px; text-align: center"
          width="50px"
        >
          <template slot-scope="scope">
            <span style="font-size: 50px; margin-left: 0px">
              {{ scope.row.order }}
            </span>
          </template>
        </el-table-column>
        <!-- 向下按钮 -->
        <el-table-column label="down" style="padding: 0px" width="60px">
          <template slot-scope="scope">
            <el-button
              type="info"
              size="mini"
              plain
              icon="el-icon-arrow-down"
              @click="changeorder(scope.row.order, 0)"
            ></el-button>
          </template>
        </el-table-column>
        <!-- 手牌列 -->
        <el-table-column label="手牌牌型" width="1800">
          <template slot-scope="scope">
            <span
              v-for="(card, index) in scope.row.handcard"
              :key="index"
              style="font-size: 99px"
              :class="{ red: PKCardColor1(card) }"
              >{{ card }}</span
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <div id="footerbtn">
        <el-button type="primary" size="small" @click="showfooter=1">修改</el-button>
        <el-button type="primary" size="small">随机生成</el-button>
      </div>
    </el-footer>
    <el-footer id="footer2" v-if="showfooter">
    </el-footer>
  </el-container>
</template>

<script>
import { getxssyx, delxssyx, changexssyxorder } from "../api";
import { changeListToEmoji, PKCardColor } from "../utils/PKCard";
export default {
  name: "Xssyx",
  props: ["tableid"],
  data() {
    return {
      visible: false,
      token: "",
      tablepjid: "", // 桌子牌局id
      tabledata: [], // 表格展示的数据
      tablepjdata: [], // 所有的桌子牌局数据
      tokenvalid: 1, // token是否过期标识符
      red: "red",
      currentpage: 1,
      showfooter:0
    };
  },
  methods: {
    // 改变单条牌局记录order upordown参数 1是向上调整 0是向下调整
    changeorder(beforeo, upordown) {
      console.log(beforeo, upordown);
      var aftero;
      if (upordown == 1) {
        // 若是向上
        if (beforeo == 1) {
          aftero = 4;
        } else {
          aftero = beforeo - 1;
        }
      } else {
        // 向下
        if (beforeo == 4) {
          aftero = 1;
        } else aftero = beforeo + 1;
      }
      changexssyxorder(this.token, this.tablepjid, beforeo, aftero).then(
        (response) => {
          console.log(response);
          if (response.tokenvalid == 1) {
            if (response.status == 1) {
              this.$router.go(0);
            } else {
              alert("改变顺序时出现错误...");
            }
          } else {
            this.tokenvalid = response.tokenvalid;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 判断手牌颜色
    PKCardColor1(card) {
      return PKCardColor(card);
    },
    // 删除桌子牌局
    deltablepj() {
      delxssyx(this.token, this.tablepjid).then(
        (response) => {
          if (response.tokenvalid == 1) {
            if (response.status == 1) {
              alert("删除成功！");
              this.$router.go(0);
            } else {
              alert("删除过程中出现错误...");
            }
          } else {
            this.tokenvalid = response.tokenvalid;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 分页
    handleCurrentChange(val) {
      this.tabledata = changeListToEmoji(this.tablepjdata[val - 1].tablepjdata);
      this.tablepjid = this.tablepjdata[val - 1].tablepjid;
      localStorage.xsscurrentpage = val;
      this.currentpage = val;
      console.log("val change");
    },
  },
  beforeDestroy() {
    localStorage.removeItem("xsscurrentpage");
    localStorage.removeItem("isyx");
  },
  mounted() {
    this.token = localStorage.getItem("token");
    localStorage.isyx = 1;
    getxssyx(this.token, this.tableid).then(
      (response) => {
        if (response.tokenvalid == 1) {
          if (response.status == 1) {
            if (localStorage.getItem("xsscurrentpage")) {
              this.currentpage = localStorage.getItem("xsscurrentpage") * 1;
            }
            this.tabledata = changeListToEmoji(
              response.data[this.currentpage - 1].tablepjdata
            );
            this.tablepjid = response.data[this.currentpage - 1].tablepjid;
            this.tablepjdata = response.data;
          } else if (response.status == 2) {
          } else {
            console.log("获取限时赛此桌子牌局数据失败...");
          }
        } else {
          this.tokenvalid = response.tokenvalid;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  },
  watch: {
    tokenvalid() {
      alert("登录状态已失效！请重新登录...");
      this.tokenvalid = 1;
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
    tableid() {
      getxssyx(this.token, this.tableid).then(
        (response) => {
          if (response.tokenvalid == 1) {
            if (response.status == 1) {
              this.currentpage = 1;
              localStorage.removeItem("xsscurrentpage");
              this.tabledata = changeListToEmoji(
                response.data[this.currentpage - 1].tablepjdata
              );
              this.tablepjid = response.data[this.currentpage - 1].tablepjid;
              this.tablepjdata = response.data;
            } else if (response.status == 2) {
              this.tabledata = [];
              this.tablepjid = "";
              this.tablepjdata = [];
            } else {
              console.log("获取限时赛此桌子牌局数据失败...");
            }
          } else {
            this.tokenvalid = response.tokenvalid;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style scoped>

#footer2 {
  margin-top: 5px;
  height: 300px !important;
  background-color: rgb(255, 255, 255) !important;
}
.red {
  color: rgb(207, 12, 12);
}

#footerbtn {
  float: left;
}

#headerbtn {
  margin-top: -3px;
  float: left;
}
.el-table-column {
  width: 100% !important;
}

.el-pagination {
  margin-top: 10px;
}

.el-header {
  background: white !important;
  height: 50px !important;
  font-size: 20px;
  line-height: 50px;
}
.el-main {
  height: 525px;
  background: rgb(251, 251, 251);
  padding: 5px 0px 5px 0px !important;
}
.el-footer {
  height: 45px !important;
  background: white;
  line-height: 50px;
}
</style>