<template>
  <div>
    <el-container>
      <div class="search-wrapper">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="search-item">
              <el-form-item label="cuid">
                <el-input v-model="form.cuid" placeholder="请输入cuid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="search-item">
              <el-form-item label="nid">
                <el-input v-model="form.nid" placeholder="请输入nid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="search-item">
              <el-form-item label="logID">
                <el-input v-model="form.logID" placeholder="请输入logID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="search-item time-selector">
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
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="search-item">
              <el-form-item label="模块">
                <select id="form-module" class="selectpicker" title="请选择模块" data-live-search="true">
                  <option>grc</option>
                  <option>词典/tag类召回</option>
                  <option>隐式item cf召回</option>
                  <option>传统item cf召回</option>
                  <option>聚类 cf召回</option>
                  <option>隐式user cf召回</option>
                </select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="4" :xl="4" class="search-item">
              <el-row class="search-buttons">
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-container>
    <el-container>
      <div class="table-wrapper table-responsive">
        <table id="table" data-show-columns="false" data-locale="zh-CN" data-height="600"></table>
      </div>
    </el-container>
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

  var tableheader = [
    {title: '序号', field: 'id', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: idformatter},
    {title: '时间', field: 'time', class: 'text-nowrap', halign: 'center', valign: 'middle'},
    {title: 'logId', field: 'logID', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: logIDformatter},
    {title: '小流量号', field: 'logNo', class: 'text-nowrap', halign: 'center', valign: 'middle'},
    {title: '请求类型', field: 'requestType', class: 'text-nowrap', halign: 'center', valign: 'middle'}
  ]
  var tabledata = [
    {
      time: '2018-10-15 10:00:00',
      logID: '294244595',
      logNo: '12333',
      requestType: 'feed'
    },
    {
      time: '2018-10-15 09:00:00',
      logID: '696863261',
      logNo: '12221',
      requestType: '相关推荐'
    }
  ]
  var popuptableheader = [
    {title: '请求类型', field: 'requestTypeDetail', class: 'text-nowrap', halign: 'center', valign: 'middle'}
  ]
  var popuptabledata = [
    {
      requestTypeDetail: '"request":{"vid":xxxxxx,"video_tag":"理财","搞笑","query":"刘德华","tn":xxx}'
    }
  ]

  function idformatter (value, row, index, field) {
    return index + 1
  }
  function logIDformatter (value, row, index, field) {
    var template = '<a style=\'cursor:pointer\'onclick=\'showDetail("' + value + '")\'>' + value + '</a>'
    return template
  }
  // function requestTypeformatter (value, row, index, field) {
  //   var template = '<a style=\'cursor:pointer\'onclick=\'popupLog("' + value + '")\'>' + value + '</a>'
  //   return template
  // }

  export default {
    name: 'HaoKanDebugDemo',
    data () {
      return {
        form: {
          cuid: '',
          nid: '',
          logID: '',
          timerange: [new Date(), new Date()],
          startTime: '',
          endTime: '',
          module: ''
        }
      }
    },
    created () {
      $('head').append('<style>.btn-default:focus{border-color: #409EFF!important; outline: 0!important;}.btn-default{background-color:#fff!important}.filter-option-inner-inner{height:38px}.bootstrap-select{width:100%!important}.bootstrap-select button{-webkit-appearance: none; background-color: #fff; background-image: none; border-radius: 4px; border: 1px solid #dcdfe6; -webkit-box-sizing: border-box; box-sizing: border-box; color: #606266; display: inline-block; font-size: inherit; height: 40px; line-height: 40px; outline: 0; padding: 0 15px; -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1); transition: border-color .2s cubic-bezier(.645,.045,.355,1); width: 100%;}.white-popup { position: relative; background: #FFF; padding: 20px; width: auto; max-width: 500px; margin: 20px auto; }.mfp-wrap .zoom-anim-dialog { opacity: 0; -webkit-transition: all 0.2s ease-in-out; -moz-transition: all 0.2s ease-in-out; -o-transition: all 0.2s ease-in-out; transition: all 0.2s ease-in-out; -webkit-transform: scale(0.8); -moz-transform: scale(0.8); -ms-transform: scale(0.8); -o-transform: scale(0.8); transform: scale(0.8); } .mfp-wrap.mfp-ready .zoom-anim-dialog { opacity: 1; -webkit-transform: scale(1); -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); transform: scale(1); } .mfp-wrap.mfp-removing .zoom-anim-dialog { -webkit-transform: scale(0.8); -moz-transform: scale(0.8); -ms-transform: scale(0.8); -o-transform: scale(0.8); transform: scale(0.8); opacity: 0; }</style>')
    },
    methods: {
      showDetail (id) {
        let routeData = this.$router.resolve({
          name: 'HaoKanDebugDemoDetail',
          query: {
            logID: id
          }
        })
        window.open(routeData.href, '_blank')
      },
      onSubmit () {
        this.form['startTime'] = getTime(this.form.timerange[0])
        this.form['endTime'] = getTime(this.form.timerange[1])
        console.log(this.qs.stringify(this.form))
      },
      popupLog (e) {
        $.magnificPopup.open({
          items: {
            src: '<div class="white-popup zoom-anim-dialog"><table id="popup-table"></table></div>',
            type: 'inline',
            closeOnContentClick: true,
            image: {
              verticalFit: true
            }
          }
        })
        var $table = $('#popup-table')
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: popuptableheader,
          data: popuptabledata,
          toolbar: '.toolbar'
        })
      }
    },
    mounted () {
      var $table = $('#table')
      $('.selectpicker').selectpicker()
      window['showDetail'] = (id) => {
        this.showDetail(id)
      }
      window['popupLog'] = () => {
        this.popupLog()
      }
      $('head').append('<style>.th-inner{color: #909399;font-weight:700;}</style>')
      if (document.body.clientWidth > 1024) {
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: tableheader,
          data: tabledata,
          search: false,
          pagination: true,
          toolbar: '.toolbar',
          fixedColumns: true,
          paginationVAlign: 'top',
          pageSize: 100,
          fixedNumber: 0
        })
      } else {
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: tableheader,
          data: tabledata,
          search: false,
          pagination: true,
          toolbar: '.toolbar',
          fixedColumns: false,
          paginationVAlign: 'top',
          pageSize: 100
        })
      }
    }
  }
</script>

<style scoped>
  .search-wrapper {
    width: 100%;
    padding: 10px 20px;
    margin-top: 60px;
    text-align: center;
    background-color: #f2f2f2;
  }

  .search-title {
    font-size: 24px;
    font-weight: 700;
  }

  .el-select .el-input {
    width: 100px;
  }

  .single-selector {
    width: 100%;
  }

  .single-selector .el-input {
    width: 100%;
  }

  .time-selector .el-input {
    width: 100% !important;
  }

  .el-range-editor {
    width: 100% !important;
  }

  .el-input-group .el-input-group__prepend {
    color: #000;
  }

  .el-form-item {
    margin-bottom: 0 !important;
  }

  .divider {
    margin: 5px 0;
    border: 1px solid rgba(7, 17, 27, 0.2);
  }

  .search-buttons button {
    margin: 1px;
  }

  .table-wrapper {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  .table-title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }

  .divider {
    margin: 5px 0;
    border: 1px solid rgba(7, 17, 27, 0.2);
  }

  .fixed-table-pagination .dropdown-menu {
    z-index: 88;
  }

  @media screen and (max-width: 1250px) {
    .search-wrapper {
      margin-top: 120px;
    }
  }

  @media screen and (max-width: 1024px) {
    .search-wrapper {
      margin-top: 180px;
    }
  }

  @media screen and (max-width: 768px) {
    .search-wrapper {
      margin-top: 200px;
    }
  }

  @media screen and (max-width: 500px) {
    .search-wrapper {
      margin-top: 230px;
    }
  }

  @media screen and (max-width: 425px) {
    .search-wrapper {
      margin-top: 300px;
    }
  }
</style>
