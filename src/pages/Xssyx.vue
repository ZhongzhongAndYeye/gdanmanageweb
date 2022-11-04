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
            <span
              style="font-size: 50px; margin-left: 0px; cursor: pointer"
              @click="clickorder(scope.row)"
              :class="{ ordercolor: isclickorderarr[scope.row.order - 1] }"
            >
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
              style="font-size: 99px; float: left; cursor: pointer"
              :class="{ red: PKCardColor1(card) }"
              @click="diyhandcard(card, index, scope.row)"
              >{{ card }}</span
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!-- footer上的修改和随机生成按钮 -->
    <el-footer>
      <div id="footerbtn">
        <el-button
          type="primary"
          size="mini"
          @click="
            showfooter1 = 1;
            showfooter2 = 0;
          "
          >修改</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="
            showfooter2 = 1;
            showfooter1 = 0;
          "
          >随机生成</el-button
        >
      </div>
    </el-footer>
    <!-- footer_修改 -->
    <el-footer id="footer" v-if="showfooter1">
      <div class="footerdiv">
        <ul class="footerul">
          <li
            v-for="(v, i) in tabledatacon"
            :key="i"
            class="footerulli"
            :class="{ red: PKCardColor1(v) }"
            style="line-height: 102px; cursor: pointer"
            @click="clickhandcardcon(i, v)"
          >
            <div style="font-size: 102px">
              {{ v }}
            </div>
          </li>
        </ul>
      </div>
      <div class="footerdiybtn">
        <el-button
          style="margin-top: 6%"
          @click="handleCurrentChange(currentpage)"
          >取消</el-button
        >
        <el-button
          type="primary"
          style="margin-top: 6%"
          @click="diyhandcardrequest"
          >保存</el-button
        >
      </div>
    </el-footer>

    <!-- footer_随机生成牌局 -->
    <el-footer id="footer" v-if="showfooter2">
      <div class="footerdiv">
        <ul class="footerul">
          <li v-for="(v, i) in combination" :key="i" class="footerulli">
            <el-button type="info" plain style="width: 85px"
              >组合{{ v }}</el-button
            >
          </li>
        </ul>
      </div>
      <el-button type="primary" style="margin-top: 6%">保存</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import { getxssyx, delxssyx, changexssyxorder, diyxssyx } from "../api";
import {
  changeListToEmoji,
  changeEmojiToList,
  PKCardColor,
} from "../utils/PKCard";
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
      currentpage: 1, // 当前页码
      combination: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
      ], // 组合数
      tabledatacon: [], // 自定义手牌容器
      isclickorder: -1, // 记录点击的序号值 默认为0表示没有选择
      isclickorderarr: [0, 0, 0, 0], // 控制序号是否被选择以显示颜色的数组
      showfooter1: 0,
      showfooter2: 0,
    };
  },
  methods: {
    // 自定义手牌点击保存后的事件
    diyhandcardrequest() {
      if (this.tabledatacon.length != 0) {
        alert("还有手牌尚未分配完成...保存失败！");
        return;
      }
      for (var i = 0; i < 4; i++) { // 注意 js中这种for循环的i不能使用const声明，因为const声明的常量赋初始值后不可改变，这种循环需要改变i的值回报错
        if (this.tabledata[i].handcard.length != 27) {
          alert("请确保每份的手牌的数量正确(27张)...保存失败！");
          return;
        }
      }
      var reqdata = changeEmojiToList(this.tabledata);
      diyxssyx(this.token, this.tableid, this.tablepjid, reqdata).then(
        (response) => {
          if (response.tokenvalid == 1) {
            if (response.status == 1) {
              alert("自定义牌局成功！");
              this.$router.go(0);
            } else if (response.status == 2) {
              alert(
                "自定义后的牌局和此桌子上其他牌局发生重复或是没有进行更改...请重新自定义！"
              );
              this.handleCurrentChange(this.currentpage);
              this.showfooter1 = 1;
            } else if (response.status == 3) {
              alert(
                "自定义后的牌局和限时赛库存牌局中其他牌局发生重复...请重新自定义！"
              );
              this.handleCurrentChange(this.currentpage);
              this.showfooter1 = 1;
            } else {
              alert("自定义牌局过程中出现错误...");
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
    // 点击暂时存储容器后的事件
    clickhandcardcon(i, v) {
      if (this.isclickorder != -1) {
        this.tabledatacon.splice(i, 1);
        this.tabledata[this.isclickorder - 1].handcard.splice(
          this.tabledata[this.isclickorder - 1].handcard.length,
          0,
          v
        );
      }
    },
    // 点击序号后的事件
    clickorder(row) {
      if (this.showfooter1 == 1) {
        this.isclickorder = row.order;
        this.isclickorderarr = [0, 0, 0, 0];
        this.isclickorderarr.splice(row.order - 1, 1, 1);
      }
    },
    // 自定义手牌时将手牌取到暂时存放容器中
    diyhandcard(card, index, row) {
      // 点击了修改按钮 才会进行这些操作
      if (this.showfooter1 == 1) {
        this.tabledata[row.order - 1].handcard.splice(index, 1);
        this.tabledatacon.splice(this.tabledatacon.length, 0, card);
      }
    },
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
      changexssyxorder(
        this.token,
        this.tablepjid,
        beforeo,
        aftero,
        this.tableid
      ).then(
        (response) => {
          console.log(response);
          if (response.tokenvalid == 1) {
            if (response.status == 1) {
              this.$router.go(0);
            } else if (response.status == 2) {
              alert("改变顺序后此牌局和此桌子其他牌局重复，操作失败...");
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
      this.tabledatacon = [];
      this.isclickorder = -1;
      this.isclickorderarr = [0, 0, 0, 0];
      this.showfooter1 = 0;
      this.showfooter2 = 0;
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
      this.tabledatacon = [];
      this.isclickorder = -1;
      this.isclickorderarr = [0, 0, 0, 0];
      this.showfooter1 = 0;
      this.showfooter2 = 0;
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
#footer {
  margin-top: 5px;
  padding-bottom: 10px;
  height: auto !important;
  background-color: rgb(255, 255, 255) !important;
}
.footerdiv {
  width: 85%;
  float: left;
}
.footerdiybtn {
  float: right;
  height: 100px;
  margin-top: 50px;
}
.footerul {
  list-style: none;
}
.footerulli {
  float: left;
  margin-right: 5px;
}
.ordercolor {
  color: rgb(148, 169, 213);
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