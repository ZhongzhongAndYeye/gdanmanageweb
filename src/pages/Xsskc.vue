<template>
  <el-container>
    <el-header>
      入库时间：{{ rktime }}&nbsp;&nbsp;&nbsp;&nbsp; 采用率：{{ frequency }}%
    </el-header>
    <el-main>
      <!-- 牌局显示表格 -->
      <el-table
        :data="tabledata"
        :show-header="false"
        :row-style="{ height: '100px' }"
        style="font-size:80px"
      >
        <el-table-column prop="order" label="序号"></el-table-column>
        <el-table-column
          prop="handcard"
          label="手牌牌型"
          width="1450"
        ></el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <!-- footer上的三个按钮 -->
      <div id="footerbtn">
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="dialogFormVisible = true"
          >出库</el-button
        >

        <el-dialog title="出库" :visible.sync="dialogFormVisible" width="30%">
          <el-form :model="form">
            <el-form-item label="选择桌子:" :label-width="formLabelWidth">
              <el-select v-model="form.data" style="width: 250px">
                <el-option
                  v-for="item in xsstable"
                  :key="item.id"
                  :label="item.tablename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="
                dialogFormVisible = false;
                xssck();
              "
              :disabled="this.form.data == ''"
              >确定</el-button
            >
          </div>
        </el-dialog>
        <el-button plain size="small" @click="open()">新建一桌</el-button>
        <el-popover placement="top" width="160" v-model="visible">
          <p>确定删除此局库存牌局吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" @click="visible = false">取消</el-button>
            <el-button
              size="mini"
              plain
              type="danger"
              @click="
                visible = false;
                delxsskc();
              "
              >确定</el-button
            >
          </div>
          <el-button
            type="danger"
            slot="reference"
            style="margin-left: 10px"
            plain
            size="small"
            >删除</el-button
          >
        </el-popover>
      </div>
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="this.xsskcdata.length"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import { getxsskc, delxsskc, createxsstable, outofxsskc } from "../api";
import { mapState } from "vuex";
import { changeListToEmoji } from "../utils/PKCard"
export default {
  name: "Xsskc",
  data() {
    return {
      rktime: 0,
      frequency: 0.0,
      tabledata: [],
      tokenvalid: 1,
      xsskcdata: [],
      pjid: "",
      token: "",
      visible: false,
      tablename: "",

      dialogFormVisible: false,
      form: {
        data: "",
      },
      formLabelWidth: "100px",
    };
  },
  methods: {
    // 出库
    xssck() {
      outofxsskc(this.token, this.form.data, this.pjid).then(
        (response) => {
          console.log(response)
          if (response.tokenvalid == 1) {
            if (response.status == 1) {
              alert("已成功出库！")
              this.$router.go(0)
            } else if (response.status == 2) {
              alert("此桌下已经存在此牌局，不可对相同桌重复出库！");
            } else {
              alert("出库过程中发生错误...");
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
    // 新建一桌
    createnewtable() {
      createxsstable(this.token, this.tablename).then(
        (response) => {
          console.log(response);
          if (response.tokenvalid == 1) {
            if (response.status == 1) {
              alert("新建桌子成功！");
              this.$router.go(0);
            } else if (response.status == 2) {
              alert("桌子名称重复！请重新输入...");
            } else {
              alert("新建桌子过程中出现错误，请重新创建...");
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
    // 新建一桌的弹出框函数
    open() {
      this.$prompt("请输入要创建的桌子名称：", "新建桌子", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.tablename = value;
          this.createnewtable();
        })
        .catch(() => {}); // 仅仅防止控制台报错
    },
    // 点击分页导航后执行此函数并传入点击的分页序号
    handleCurrentChange(val) {
      this.tabledata = changeListToEmoji(this.xsskcdata[val - 1].pjdata) ;
      this.rktime = this.xsskcdata[val - 1].putintime;
      this.frequency = (this.xsskcdata[val - 1].frequency * 100.0).toFixed(2); // 保留两位小数
      this.pjid = this.xsskcdata[val - 1].pjid;
    },
    // 删除牌局
    delxsskc() {
      console.log(this.pjid);
      delxsskc(this.token, this.pjid).then(
        (response) => {
          if (response.tokenvalid == 1) {
            if (response.msg == "删除记录成功") {
              this.$router.go(0);
            } else {
              alert("删除记录时发生错误:", msg);
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
  computed: {
    ...mapState("home", ["xsstable"]),
  },
  mounted() {
    this.token = localStorage.getItem("token");
    // 获取所有库存牌局信息
    getxsskc(this.token).then(
      (response) => {
        if (response.tokenvalid == 1) {
          console.log(response)
          if (response.msg == "查询所有限时赛数据成功") {
            this.tabledata = changeListToEmoji(response.data[0].pjdata) ; // 默认显示第一页的数据
            this.rktime = response.data[0].putintime;
            this.frequency = (response.data[0].frequency * 100).toFixed(2);
            this.pjid = response.data[0].pjid;
            this.xsskcdata = response.data;
          } else {
            alert("获取限时赛库存牌局数据时发生错误:", msg);
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
    // 监测token是否在进入路由后才过期（后端验证）
    tokenvalid() {
      alert("登录状态已失效！请重新登录...");
      this.tokenvalid = 1;
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
  
<style>

.el-table .cell{
  line-height: 100% !important;
}

.el-table-column {
  width: 100% !important;
}

.el-pagination {
  margin-top: 10px;
}

#footerbtn {
  float: left;
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