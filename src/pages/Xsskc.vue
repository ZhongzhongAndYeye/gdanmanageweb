<template>
  <el-container>
    <el-header>
      入库时间:{{ rktime }}&nbsp;&nbsp;采用率:{{ frequency * 100 }}%
    </el-header>
    <el-main>
      <el-table :data="tableData" :show-header="false" :row-style="{height: '95px'}">
        <el-table-column prop="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="handcard" label="手牌牌型" width="890">
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <div id="footerbtn">
        <el-button type="primary" size="small">出库</el-button>
        <el-button plain size="small">新建一桌</el-button>
        <el-button type="danger" plain size="small">删除</el-button>
      </div>
      <el-pagination background layout="prev, pager, next" :page-count="10">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      rktime: 0,
      frequency: 0,
      tableData: [
        {
          index: 1,
          handcard: "asdl",
        },
        {
          index: 2,
          handcard: "asdl",
        },
        {
          index: 3,
          handcard: "asdl",
        },
        {
          index: 4,
          handcard: "asdl",
        },
      ],
    };
  },
  // mounted(){
  //   this.$store.dispatch("xsskc/getdata")
  // },
  // computed: {
  //   ...mapState("xsskc", []),
  // },
};
</script>
  
<style scoped>
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