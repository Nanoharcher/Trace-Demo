<template>
  <div class="search-wrapper">
    <!--<div class="search-title">搜索选项</div>-->
    <!--<div class="divider"></div>-->
    <el-form ref="form" :model="form" label-width="80px" label-position="left">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="ID">
            <el-input placeholder="请输入内容" v-model="form.searchid" class="input-with-select">
              <el-select v-model="form.select" slot="prepend" placeholder="请选择">
                <el-option label="uid" value="uid"></el-option>
                <el-option label="articleid" value="articleid"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="URL">
            <el-input v-model="form.url" placeholder="请输入URL"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="副标题">
            <el-input v-model="form.subtitle" placeholder="请输入副标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择状态" class="single-selector">
              <el-option label="正常" value="normal"></el-option>
              <el-option label="异常" value="abnormal"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="9" :xl="9" class="search-item time-selector">
          <el-form-item label="日期时间">
            <el-date-picker
              v-model="form.timerange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9" class="search-item">
          <el-row type="flex" justify="center" class="search-buttons">
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="primary">重置</el-button>
            <el-button type="primary">导出</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  function getTime (obj) {
    var year = obj.getFullYear()
    var mon = obj.getMonth() + 1
    var day = obj.getDate()
    var hours = obj.getHours()
    var minu = obj.getMinutes()
    var sec = obj.getSeconds()
    if (mon < 10) {
      mon = '0' + mon
    }
    if (day < 10) {
      day = '0' + day
    }
    if (hours < 10) {
      hours = '0' + hours
    }
    if (minu < 10) {
      minu = '0' + minu
    }
    if (sec < 10) {
      sec = '0' + sec
    }
    return year + '-' + mon + '-' + day + ' ' + hours + ':' + minu + ':' + sec
  }
  export default {
    name: 'Search',
    data () {
      return {
        form: {
          searchid: '',
          select: 'uid',
          url: '',
          title: '',
          subtitle: '',
          status: '',
          timerange: [new Date(), new Date()]
        }
      }
    },
    methods: {
      onSubmit () {
        this.form['startTime'] = getTime(this.form.timerange[0])
        this.form['endTime'] = getTime(this.form.timerange[1])
        console.log(this.form)
        this.$http({
          method: 'post',
          url: 'http://ftrace.baidu.com/trace',
          changeOrigin: true,
          data: this.form
        }).then(function (res) {
          console.log(res)
        }).catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
  .search-wrapper{
    width: 100%;
    padding: 10px 20px;
    margin-top:60px;
    text-align:center;
    background-color: #f2f2f2;
  }
  .search-title{
    font-size:24px;
    font-weight:700;
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
  .time-selector .el-input{
    width: 100%!important;
  }
  .el-range-editor{
    width: 100%!important;
  }
  .el-input-group .el-input-group__prepend {
    color: #000;
  }
  .el-form-item{
    margin-bottom: 0!important;
  }
  .divider{
    margin: 5px 0;
    border: 1px solid rgba(7,17,27,0.2);
  }
  @media screen and (max-width: 1250px) {
    .search-wrapper{
      margin-top: 120px;
    }
  }
  @media screen and (max-width: 1024px) {
    .search-wrapper{
      margin-top: 180px;
    }
  }
  @media screen and (max-width: 768px) {
    .search-wrapper{
      margin-top: 200px;
    }
  }
  @media screen and (max-width: 500px) {
    .search-wrapper{
      margin-top: 230px;
    }
  }
  @media screen and (max-width: 425px) {
    .search-wrapper{
      margin-top: 300px;
    }
  }
</style>
