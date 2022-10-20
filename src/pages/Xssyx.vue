<template>
  <el-container>
    <el-header>
      <div id="headerbtn">
        <el-popover placement="top" width="160" v-model="visible">
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
            :disabled="this.pjid == ''"
            >删除</el-button
          >
        </el-popover>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="this.pjdata.length"
        prev-text="上一局"
        next-text="下一局"
        @current-change="handleCurrentChange"
        >111
      </el-pagination>
    </el-header>
    <el-main>
      <!-- 牌局显示表格 -->
      <el-table
        :data="tabledata"
        :show-header="false"
        :row-style="{ height: '95px' }"
        style="font-size:80px"
      >
        <el-table-column prop="order" label="序号" ></el-table-column>
        <el-table-column
          prop="handcard"
          label="手牌牌型"
          width="1450"
        ></el-table-column>
      </el-table>
    </el-main>
    <el-footer> </el-footer>
  </el-container>
</template>

<script>
import { getxssyx, delxssyx } from "../api";
import { changeListToEmoji } from "../utils/PKCard";
export default {
  name: "Xssyx",
  props: ["tableid"],
  data() {
    return {
      visible: false,
      token: "",
      pjid: "",
      tabledata: [],
      pjdata: [],
      tokenvalid: 1,
    };
  },
  methods: {
    deltablepj() {
      delxssyx(this.token, this.tableid, this.pjid).then(
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
      this.tabledata = changeListToEmoji(this.pjdata[val - 1].pjdata);
      this.pjid = this.pjdata[val - 1].pjid;
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    getxssyx(this.token, this.tableid).then(
      (response) => {
        if (response.tokenvalid == 1) {
          if (response.status == 1) {
            this.tabledata = changeListToEmoji(response.data[0].pjdata);
            this.pjid = response.data[0].pjid;
            this.pjdata = response.data;
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
              this.tabledata = changeListToEmoji(response.data[0].pjdata) ;
              this.pjid = response.data[0].pjid;
              this.pjdata = response.data;
            } else if (response.status == 2) {
              this.tabledata = [];
              this.pjid = "";
              this.pjdata = [];
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

<style>

#headerbtn {
  float: left;
}
.el-table-column {
  width: 100% !important;
}

.el-pagination {
  margin-top: 10px;
}

.el-header {
  background: white;
  height: 50px !important;
  font-size: 20px;
  line-height: 50px;
}
.el-main {
  height: 445px;
  background: rgb(251, 251, 251);
}
.el-footer {
  height: 50px !important;
  background: white;
  line-height: 50px;
}
</style>