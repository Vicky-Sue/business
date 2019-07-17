<template>
    <el-row type="flex" class="flight-title">
      <el-col :span="6">航空信息</el-col>
      <el-col :span="12">
        <el-row type="flex" justify="center">
          <el-col :span="12">起飞时间</el-col>
          <el-col :span="12">到达时间</el-col>
        </el-row>
      </el-col>
      <el-col :span="6">价格</el-col>
    </el-row>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.flight-title {
  padding: 0 15px;
  border: 1px #ddd solid;
  background: #f6f6f6;
  height: 38px;
  line-height: 38px;
  color: #666;
  font-size: 12px;
  margin-bottom: 10px;

  > div {
    text-align: center;
  }
}
</style>

