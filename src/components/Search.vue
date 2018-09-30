<template>
  <div class="search-wrapper">
    <div class="search-title">搜索选项</div>
    <div class="divider"></div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
        <el-input placeholder="请输入内容" v-model="searchid" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="uid" value="uid"></el-option>
            <el-option label="articleid" value="articleid"></el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
        <el-input placeholder="请输入URL" v-model="url">
          <template slot="prepend">URL:</template>
        </el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
        <el-input placeholder="请输入标题" v-model="title">
          <template slot="prepend">标题:</template>
        </el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
        <el-input placeholder="请输入副标题" v-model="subtitle">
          <template slot="prepend">副标题:</template>
        </el-input>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
        <el-select v-model="status" placeholder="请选择状态" class="single-selector">
          <el-option label="正常" value="normal"></el-option>
          <el-option label="异常" value="abnormal"></el-option>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item time-selector">
        <el-date-picker v-model="starttime" type="datetime" placeholder="请选择开始时间"></el-date-picker>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item time-selector">
        <el-date-picker v-model="endtime" type="datetime" placeholder="请选择结束时间"></el-date-picker>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="search-buttons">
      <el-button type="primary">搜索</el-button>
      <el-button type="primary">重置</el-button>
      <el-button type="primary">导出</el-button>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Search',
    data () {
      return {
        searchid: '',
        select: '',
        url: '',
        title: '',
        subtitle: '',
        status: '',
        starttime: '',
        endtime: ''
      }
    }
  }
</script>

<style>
  .search-wrapper{
    width: 100%;
    padding: 20px;
    margin-top:20px;
    text-align:center;
    border: 1px solid rgba(7,17,27,0.2);
  }
  .search-title{
    font-size:24px;
    font-weight:700;
  }
  .search-item{
    margin: 10px 0;
  }
  .el-select .el-input {
    width: 100px;
  }
  .single-selector{
    width: 100%;
  }
  .single-selector .el-input{
    width: 100%;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .search-buttons{
    margin-top:20px;
  }
  .time-selector .el-input{
    width: 100%;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .divider{
    margin: 5px 0;
    border: 1px solid rgba(7,17,27,0.2);
  }
  @media screen and (max-width: 1024px) {
    .search-wrapper{
      margin-top: 80px;
    }
  }
  @media screen and (max-width: 470px) {
    .search-wrapper{
      margin-top: 140px;
    }
  }
  @media screen and (max-width: 350px) {
    .search-wrapper{
      margin-top: 200px;
    }
  }
</style>
