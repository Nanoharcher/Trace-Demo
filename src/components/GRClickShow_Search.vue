<template>
  <div class="search-wrapper">
    <!--<div class="search-title">搜索选项</div>-->
    <!--<div class="divider"></div>-->
    <el-form ref="form" :model="form" label-width="80px" label-position="left">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="baiduUid/cuid/uid" label-width="140px">
            <el-input v-model="form.id" placeholder="请输入ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="nid">
            <el-input v-model="form.nid" placeholder="请输入nid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="日志类型">
            <el-select v-model="form.logtype" placeholder="请选择类型" class="single-selector">
              <el-option label="展示" value="test1"></el-option>
              <el-option label="点击" value="test2"></el-option>
              <el-option label="下发" value="test3"></el-option>
              <el-option label="dislike" value="test4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="队列">
            <el-select v-model="form.queue" placeholder="请输入队列" class="single-selector">
              <el-option label="测试" value="test1"></el-option>
              <el-option label="测试" value="test2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="频道页">
            <el-select v-model="form.channel" placeholder="请输入频道页" class="single-selector">
              <el-option label="测试" value="test1"></el-option>
              <el-option label="测试" value="test2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
          <el-form-item label="新闻类型">
            <el-select v-model="form.newstype" placeholder="请输入新闻类型" class="single-selector">
              <el-option label="测试" value="test1"></el-option>
              <el-option label="测试" value="test2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="search-item time-selector">
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
        <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24" class="search-item">
          <el-row class="search-buttons">
            <el-button type="primary" @click="onSubmit">手百</el-button>
            <el-button type="primary">Wise</el-button>
            <el-button type="primary">PC</el-button>
            <el-button type="primary">好看</el-button>
            <el-button type="primary">全民小视频</el-button>
            <el-button type="primary">查询uid/cuid</el-button>
            <el-button type="primary">重置</el-button>
            <el-dropdown style="margin-left: 10px;">
              <el-button type="primary">
                导出<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>手百</el-dropdown-item>
                <el-dropdown-item>Wise</el-dropdown-item>
                <el-dropdown-item>PC</el-dropdown-item>
                <el-dropdown-item>好看</el-dropdown-item>
                <el-dropdown-item>全民小视频</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
          id: '',
          nid: '',
          logtype: '',
          queue: '',
          channel: '',
          newstype: '',
          timerange: [new Date(), new Date()],
          startTime: '',
          endTime: ''
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
  .search-buttons button{
    margin: 1px;
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
