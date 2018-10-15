<template>
  <div>
    <el-container>
      <div class="search-wrapper">
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
    </el-container>
    <el-container>
      <div class="table-wrapper table-responsive">
        <table id="table" data-show-columns="false"></table>
      </div>
    </el-container>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap-table/dist/bootstrap-table.min.css'
  import 'bootstrap/dist/js/bootstrap.min'
  import 'bootstrap-table/dist/bootstrap-table.min'
  import '../../static/css/bootstrap-table-fixed-columns.css'
  import '../../static/js/bootstrap-table-fixed-columns.js'
  import 'magnific-popup/dist/magnific-popup.css'
  var tableheader = [
    { title: '序号', field: 'cuid', class: 'text-nowrap', halign: 'center', valign: 'middle', switchable: false },
    { title: 'nid(attention链接)', field: 'nid', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: nidFormatter },
    { title: '标题/URL', field: 'order', class: 'text-nowrap', halign: 'center', valign: 'middle', sortable: true },
    { title: '副标题', field: 'title', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '发布时间', field: 'subtitle', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '来源站点', field: 'logType', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '状态', field: 'logDate', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '动作', field: 'click', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '屏蔽状态', field: 'show', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '审核状态', field: 'attention', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '错误码', field: 'tag', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: 'BS入库', field: 'publishDate', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '优质', field: 'firstCat', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: 'groupkey', field: 'secondCat', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '操作', field: 'queue', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: buttonFormatter }
  ]
  var tabledata = []
  var popuptableheader = [
    {title: '姓名', field: 'name', class: 'text-nowrap', halign: 'center', valign: 'middle'},
    {title: '年龄', field: 'age', class: 'text-nowrap', halign: 'center', valign: 'middle'},
    {title: '性别', field: 'gender', class: 'text-nowrap', halign: 'center', valign: 'middle'}
  ]
  var popuptabledata = [
    {
      name: '马旭骁',
      age: '25',
      gender: '男'
    },
    {
      name: '马旭骁',
      age: '25',
      gender: '男'
    },
    {
      name: '马旭骁',
      age: '25',
      gender: '男'
    },
    {
      name: '马旭骁',
      age: '25',
      gender: '男'
    },
    {
      name: '马旭骁',
      age: '25',
      gender: '男'
    }
  ]
  var linkheader = ['标题', '日志类型', 'tab页']
  // eslint-disable-next-line no-unused-vars
  function buttonFormatter (value, row) {
    let buttonText = value.replace(/\[|\]|\s+/g, '').split(',')
    var template = ''
    for (let i = 0; i < buttonText.length; i++) {
      if (buttonText[i] === '操作1') {
        template += '<button onclick="popupContent(this)" class="el-button el-button--default el-button--mini popup-button" data-id="111">' + buttonText[i] + '</button>'
      } else {
        template += '<button onclick="popupContent(this)" class="el-button el-button--danger el-button--mini remove-button" data-id="222">' + buttonText[i] + '</button>'
      }
    }
    return template
  }
  // eslint-disable-next-line no-unused-vars
  function nidFormatter (value, row) {
    var template = '<a target=\'_blank\' href=\'https://www.baidu.com/?' + value + '\'>' + value + '</a>'
    return template
  }
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
        tableheader: tableheader,
        tabledata: tabledata,
        popuptableheader: popuptableheader,
        popuptabledata: popuptabledata,
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
    created () {
      $('head').append('<style>.white-popup { position: relative; background: #FFF; padding: 20px; width: auto; max-width: 500px; margin: 20px auto; }</style>')
    },
    methods: {
      onSubmit () {
        this.form['startTime'] = getTime(this.form.timerange[0])
        this.form['endTime'] = getTime(this.form.timerange[1])
        console.log(this.form)
        this.$http({
          method: 'get',
          url: 'http://10.95.114.105:8080/indexList?title=ai&state=0',
          changeOrigin: true
        }).then(function (res) {
          console.log(res)
        }).catch(function (err) {
          console.log(err)
        })
      },
      popup (e) {
        var data = $(e).attr('data-id')
        if (data === '111') {
          $.magnificPopup.open({
            items: {
              src: '<div class="white-popup"><table id="popup-table"></table></div>',
              type: 'inline',
              closeOnContentClick: true,
              image: {
                verticalFit: true
              }
            }
          })
          var $table = $('#popup-table')
          $table.bootstrapTable('destroy').bootstrapTable({
            columns: this.popuptableheader,
            data: this.popuptabledata,
            // search: true,
            // pagination: true,
            toolbar: '.toolbar'
            // pageSize: 50,
          })
        }
      }
    },
    mounted () {
      var $table = $('#table')
      var tableHeader
      window['popupContent'] = (e) => {
        this.popup(e)
      }
      $('head').append('<style>.th-inner{color: #909399;font-weight:700;}</style>')
      if (document.body.clientWidth > 1024) {
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: this.tableheader,
          data: this.tabledata,
          // search: true,
          pagination: true,
          toolbar: '.toolbar',
          fixedColumns: true,
          paginationPreText: 'Previous',
          paginationNextText: 'Next',
          paginationVAlign: 'top',
          pageSize: 100,
          fixedNumber: 1
        })
        tableHeader = $('#table th .th-inner')
        // console.log(tableHeader)
        for (let i = 0; i < tableHeader.length; i++) {
          let temp = tableHeader[i].innerHTML
          if (linkheader.includes(temp)) {
            tableHeader[i].innerHTML = '<a href="https://www.baidu.com" target="_blank">' + temp + '</a>'
          }
        }
      } else {
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: this.tableheader,
          data: this.tabledata,
          // search: true,
          pagination: true,
          toolbar: '.toolbar',
          fixedColumns: false,
          paginationPreText: 'Previous',
          paginationNextText: 'Next',
          paginationVAlign: 'top',
          pageSize: 100
        })
        tableHeader = $('#table th .th-inner')
        // console.log(tableHeader)
        for (let i = 0; i < tableHeader.length; i++) {
          let temp = tableHeader[i].innerHTML
          if (linkheader.includes(temp)) {
            tableHeader[i].innerHTML = '<a href="https://www.baidu.com" target="_blank">' + temp + '</a>'
          }
        }
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

  .table-wrapper{
    width: 100%;
    padding: 10px;
    box-sizing:border-box;
  }
  .table-title{
    font-size:24px;
    font-weight:700;
    text-align:center;
  }
  .divider{
    margin: 5px 0;
    border: 1px solid rgba(7,17,27,0.2);
  }
  .fixed-table-pagination .dropdown-menu{
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
