<template>
  <el-container>
    <el-header>
      <div id="headerbtn">
        <el-popover placement="top" width="160" v-model="visible">
          <p>这是一段内容这是一段内容确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" @click="visible = false">取消</el-button>
            <el-button type="danger" plain size="mini" @click="visible = false"
              >确定</el-button
            >
          </div>
          <el-button type="danger" plain slot="reference" size="small"
            >删除</el-button
          >
        </el-popover>
      </div>
      <el-pagination background layout="prev, pager, next" prev-text="上一局" next-text="下一局" :total="100">111
      </el-pagination>
    </el-header>
    <el-main>
      {{ tableid }}
      <!-- 牌局显示表格 -->
      <!-- <el-table
        :data="tabledata"
        :show-header="false"
        :row-style="{ height: '95px' }"
      >
        <el-table-column prop="order" label="序号" width="50"></el-table-column>
        <el-table-column
          prop="handcard"
          label="手牌牌型"
          width="1000"
        ></el-table-column>
      </el-table> -->
    </el-main>
    <el-footer> </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Xssyx",
  props: ["tableid"],
  data() {
    return {
      visible: false,
    };
  },
};
</script>

<style scoped>
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