<template>
  <div>
    <el-container>
      <div class="search-wrapper">
        <el-form ref="form" :model="form" label-width="80px" label-position="left" @submit.native.prevent>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
              <el-form-item label="ID">
                <el-input placeholder="请输入内容" v-model="form.searchid">
                  <el-select v-model="form.select" slot="prepend" placeholder="请选择" class="input-with-select">
                    <el-option label="uid" value="nid"></el-option>
                    <el-option label="articleid" value="articleid"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
              <el-form-item label="URL">
                <el-input v-model="form.url" placeholder="请输入URL" id="url"></el-input>
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
                <el-select v-model="form.state" placeholder="请选择状态" class="single-selector">
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="异常" value="2"></el-option>
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
                <el-button type="primary" @click="onReset">重置</el-button>
                <el-button type="primary" @click="exportdata">导出</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-container>
    <el-container>
      <div class="table-wrapper table-responsive">
        <table id="table" data-show-columns="false" data-locale="zh-CN"></table>
      </div>
    </el-container>
  </div>
</template>

<script>
  var tableHeader = [
    { title: 'nid(attention链接)', field: 'nid', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: nidFormatter },
    { title: '标题/URL', field: 'title', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: titleFormatter },
    { title: '副标题', field: 'secondTitle', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '发布时间', field: 'publicTime', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '来源站点', field: 'site', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: siteFormatter },
    { title: '状态', field: 'state', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '动作', field: 'action', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '屏蔽状态', field: 'delTag', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: degTagFormatter },
    { title: '审核状态', field: 'auditStatus', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: auditStatusFormatter },
    { title: '错误码', field: 'errorCode', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: 'BS入库', field: 'bsDB', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '优质', field: 'highQualityDB', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: 'groupkey', field: 'groupKey', class: 'text-nowrap', halign: 'center', valign: 'middle' },
    { title: '操作', field: 'actions', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: actionsFormatter }
  ]
  var traceHomepageTableHead = JSON.stringify(tableHeader)
  localStorage.setItem('traceHomepageTableHead', traceHomepageTableHead)
  // eslint-disable-next-line no-unused-vars
  function nidFormatter (value, row) {
    var template = '<a target=\'_blank\' href=\'http://ftrace.baidu.com/zpNewInfo?' + value + '&s=1\'>' + value + '</a>'
    return template
  }
  function titleFormatter (value, row, index, field) {
    var template = '<a target=\'_blank\' href=\'' + row['url'] + '\'>' + value + '</a>'
    return template
  }
  function siteFormatter (value, row, index, field) {
    var template = '<a target=\'_blank\' href=\'http://ftrace.baidu.com/bjauthor?' + value + '\'>' + value + '</a>'
    return template
  }
  function degTagFormatter (value, row, index, field) {
    var template = '<a target=\'_blank\' style=\'cursor:pointer\'onclick=\'popupdelTag("' + row['nid'] + '",this)\'>' + value + '</a>'
    return template
  }
  function actionsFormatter (value, row, index, field) {
    var template = ''
    // template += '<button onclick=\'linkToTraceLog("' + row['nid'] + '","' + row['title'] + '","' + row['url'] + '","' + '0' + '","' + $('.el-range-input').val() + '","' + $('.el-range-input').val() + '")\' class=\'el-button el-button--primary el-button--mini popup-button\'>日志</button>'
    template += '<button onclick=\'linkToTraceLog("' + row['nid'] + '","","' + row['url'] + '","0","' + $('.el-range-input').val() + '","' + $('.el-range-input:eq(1)').val() + '")\' class=\'el-button el-button--primary el-button--mini popup-button\'>日志</button>'
    return template
  }
  function auditStatusFormatter (value, row, index, field) {
    var template = ''
    if (row['actionList']) {
      if (row['actionList'].length === 1) {
        template = '<a target=\'_blank\' style=\'cursor:pointer\'onclick=\'popupauditStatus("' + row['actionList'][0]['operator'] + '","' + row['actionList'][0]['occrTimeStr'] + '","' + row['actionList'][0]['name'] + '")\'>' + value + '</a>'
        return template
      } else if (row['actionList'].length > 1) {
        var len = row['actionList'].length
        var operatorArray = []
        var occrTimeStrArray = []
        var nameArray = []
        for (let m = 0; m < len; m++) {
          operatorArray.push(row['actionList'][m]['operator'])
          occrTimeStrArray.push(row['actionList'][m]['occrTimeStr'])
          nameArray.push(row['actionList'][m]['name'])
        }
        template = '<a target=\'_blank\' style=\'cursor:pointer\'onclick=\'popupauditStatus("' + operatorArray + '","' + occrTimeStrArray + '","' + nameArray + '")\'>' + value + '</a>'
        return template
      } else {
        return value
      }
    }
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
    name: 'HomePage',
    data () {
      return {
        form: {
          select: 'uid',
          searchid: '',
          nid: '',
          articleid: '',
          url: '',
          title: '',
          subtitle: '',
          state: '0',
          startTime: '',
          endTime: '',
          timerange: [new Date(new Date() - (7 * 24 * 3600 * 1000)), new Date()]
        }
      }
    },
    created () {
      $('head').append('<style>.white-popup { position: relative; background: #FFF; padding: 20px; width: auto; max-width: 500px; margin: 20px auto; }.mfp-wrap .zoom-anim-dialog { opacity: 0; -webkit-transition: all 0.2s ease-in-out; -moz-transition: all 0.2s ease-in-out; -o-transition: all 0.2s ease-in-out; transition: all 0.2s ease-in-out; -webkit-transform: scale(0.8); -moz-transform: scale(0.8); -ms-transform: scale(0.8); -o-transform: scale(0.8); transform: scale(0.8); } .mfp-wrap.mfp-ready .zoom-anim-dialog { opacity: 1; -webkit-transform: scale(1); -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); transform: scale(1); } .mfp-wrap.mfp-removing .zoom-anim-dialog { -webkit-transform: scale(0.8); -moz-transform: scale(0.8); -ms-transform: scale(0.8); -o-transform: scale(0.8); transform: scale(0.8); opacity: 0; }</style>')
    },
    methods: {
      exportdata () {
        $('#table').tableExport(
          {
            fileName: '下载数据',
            type: 'excel',
            escape: 'false'
          }
        )
      },
      onSubmit () {
        this.form['startTime'] = getTime(this.form.timerange[0])
        this.form['endTime'] = getTime(this.form.timerange[1])
        if (this.form['select'] === 'uid') {
          this.form['nid'] = this.form['searchid']
        } else {
          this.form['articleid'] = this.form['searchid']
        }
        if (this.form['state'] === '') {
          this.form['state'] = 0
        }
        console.log(this.qs.stringify(this.form))
        $('#table').bootstrapTable('showLoading')
        this.$http({
          method: 'get',
          url: 'http://10.95.114.105:8080/articles?' + this.qs.stringify(this.form),
          changeOrigin: true
        }).then(function (res) {
          if (res.data['message'] === 'success') {
            var loadedTableHeaders
            var $table = $('#table')
            console.log(res.data)
            $('head').append('<style>.th-inner{color: #909399;font-weight:700;}</style>')
            if (document.body.clientWidth > 1024) {
              $table.bootstrapTable('destroy').bootstrapTable({
                columns: tableHeader,
                data: res.data['data'],
                // search: true,
                pagination: true,
                toolbar: '.toolbar',
                fixedColumns: true,
                paginationVAlign: 'top',
                pageSize: 100,
                fixedNumber: 1
              })
              loadedTableHeaders = $('#table th .th-inner')
              console.log(loadedTableHeaders)
              for (let i = 0; i < loadedTableHeaders.length; i++) {
                let temp = loadedTableHeaders[i].innerHTML
                if (temp === '动作') {
                  loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=373268324" target="_blank">' + temp + '</a>'
                } else if (temp === '屏蔽状态') {
                  loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=452840410" target="_blank">' + temp + '</a>'
                } else if (temp === 'BS入库') {
                  loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=457513838" target="_blank">' + temp + '</a>'
                }
              }
            } else {
              $table.bootstrapTable('destroy').bootstrapTable({
                columns: tableHeader,
                data: res.data['data'],
                // search: true,
                pagination: true,
                toolbar: '.toolbar',
                fixedColumns: false,
                paginationVAlign: 'top',
                pageSize: 100
              })
              loadedTableHeaders = $('#table th .th-inner')
              console.log(loadedTableHeaders)
              for (let i = 0; i < loadedTableHeaders.length; i++) {
                let temp = loadedTableHeaders[i].innerHTML
                if (temp === '动作') {
                  loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=373268324" target="_blank">' + temp + '</a>'
                } else if (temp === '屏蔽状态') {
                  loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=452840410" target="_blank">' + temp + '</a>'
                } else if (temp === 'BS入库') {
                  loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=457513838" target="_blank">' + temp + '</a>'
                }
              }
            }
            $('#table').bootstrapTable('hideLoading')
          } else {
            alert('Failed to connect to server...Please try again later!')
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      onReset () {
        this.form = {
          select: 'uid',
            searchid: '',
            nid: '',
            articleid: '',
            url: '',
            title: '',
            subtitle: '',
            state: '',
            startTime: '',
            endTime: '',
            timerange: [new Date(new Date() - (7 * 24 * 3600 * 1000)), new Date()]
        }
      },
      popupdelTag (nid, e) {
        this.$http({
          method: 'get',
          url: 'http://ftrace.baidu.com//trace/getIntervene?nid=' + nid,
          changeOrigin: true
        }).then(function (res) {
          var popuptableheader = [
            {title: '时间', field: 'delTime', class: 'text-nowrap', halign: 'center', valign: 'middle'},
            {title: '状态', field: 'delTag', class: 'text-nowrap', halign: 'center', valign: 'middle'},
            {title: '来源', field: 'delSrc', class: 'text-nowrap', halign: 'center', valign: 'middle'},
            {title: '操作人', field: 'delUser', class: 'text-nowrap', halign: 'center', valign: 'middle'},
            {title: '原因', field: 'delInfo', class: 'text-nowrap', halign: 'center', valign: 'middle'}
          ]
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
            columns: popuptableheader,
            data: res.data,
            // search: true,
            // pagination: true,
            toolbar: '.toolbar'
            // pageSize: 50,
          })
        }).catch(function (err) {
          console.log(err)
        })
      },
      linkToTraceLog (nid, title, url, type, startDate, endDate) {
        // console.log('----------------')
        // console.log(nid)
        // console.log(title)
        // console.log(url)
        // console.log(type)
        // console.log(startDate)
        // console.log(endDate)
        // console.log('----------------')
        var inputUrl = $('#url').val()
        var finalurl = url + ',' + inputUrl
        finalurl = encodeURIComponent(finalurl)
        // var path = "traceLog?nid=" + nid + "&title=&type=" + type + "&url=" + escape(url) + "&startDate=" + startDate + "&endDate=" + endDate;
        var path = 'http://ftrace.baidu.com/traceLog?nid=' + nid + '&title=&type=' + type + '&url=' + finalurl + '&startDate=' + startDate + '&endDate=' + endDate
        window.open(path)
      },
      popupauditStatus (operator, occrTimeStr, name) {
        // console.log('----------------')
        // console.log(operator)
        // console.log(occrTimeStr)
        // console.log(name)
        // console.log('----------------')
        var popuptableheader = [
          {title: '动作', field: 'operator', class: 'text-nowrap', halign: 'center', valign: 'middle'},
          {title: '时间', field: 'occrTimeStr', class: 'text-nowrap', halign: 'center', valign: 'middle'},
          {title: '结果', field: 'name', class: 'text-nowrap', halign: 'center', valign: 'middle'}
        ]
        var popuptabledata = []
        if (operator.indexOf(',') > -1) {
          operator = operator.split(',')
          occrTimeStr = occrTimeStr.split(',')
          name = name.split(',')
          for (let i = 0; i < operator.length; i++) {
            var temp = {}
            temp['operator'] = operator[i]
            temp['occrTimeStr'] = occrTimeStr[i]
            temp['name'] = name[i]
            popuptabledata.push(temp)
          }
        } else {
          var temp2 = {}
          temp2['operator'] = operator
          temp2['occrTimeStr'] = occrTimeStr
          temp2['name'] = name
          popuptabledata.push(temp2)
        }
        $.magnificPopup.open({
          items: {
            src: '<div class="white-popup"><table id="popup-table-auditStatus"></table></div>',
            type: 'inline',
            closeOnContentClick: true,
            image: {
              verticalFit: true
            }
          }
        })
        var auditStatustable = $('#popup-table-auditStatus')
        console.log(popuptabledata)
        auditStatustable.bootstrapTable('destroy').bootstrapTable({
          columns: popuptableheader,
          data: popuptabledata,
          toolbar: '.toolbar'
        })
      }
    },
    mounted () {
      var $table = $('#table')
      window['popupdelTag'] = (e) => {
        this.popupdelTag(e)
      }
      window['linkToTraceLog'] = (nid, title, url, type, startDate, endDate) => {
        this.linkToTraceLog(nid, title, url, type, startDate, endDate)
      }
      window['popupauditStatus'] = (operator, occrTimeStr, name) => {
        this.popupauditStatus(operator, occrTimeStr, name)
      }
      var loadedTableHeaders
      $('head').append('<style>.th-inner{color: #909399;font-weight:700;}</style>')
      if (document.body.clientWidth > 1024) {
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: tableHeader,
          data: [],
          // search: true,
          pagination: true,
          toolbar: '.toolbar',
          fixedColumns: true,
          paginationVAlign: 'top',
          pageSize: 100,
          fixedNumber: 1
        })
        loadedTableHeaders = $('#table th .th-inner')
        for (let i = 0; i < loadedTableHeaders.length; i++) {
          let temp = loadedTableHeaders[i].innerHTML
          if (temp === '动作') {
            loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=373268324" target="_blank">' + temp + '</a>'
          } else if (temp === '屏蔽状态') {
            loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=452840410" target="_blank">' + temp + '</a>'
          } else if (temp === 'BS入库') {
            loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=457513838" target="_blank">' + temp + '</a>'
          }
        }
      } else {
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: tableHeader,
          data: [],
          // search: true,
          pagination: true,
          toolbar: '.toolbar',
          fixedColumns: false,
          paginationVAlign: 'top',
          pageSize: 100
        })
        loadedTableHeaders = $('#table th .th-inner')
        for (let i = 0; i < loadedTableHeaders.length; i++) {
          let temp = loadedTableHeaders[i].innerHTML
          if (temp === '动作') {
            loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=373268324" target="_blank">' + temp + '</a>'
          } else if (temp === '屏蔽状态') {
            loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=452840410" target="_blank">' + temp + '</a>'
          } else if (temp === 'BS入库') {
            loadedTableHeaders[i].innerHTML = '<a href="http://wiki.baidu.com/pages/viewpage.action?pageId=457513838" target="_blank">' + temp + '</a>'
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

  .input-with-select{
    width: 100px!important;
  }
  .divider {
    margin: 5px 0;
    border: 1px solid rgba(7, 17, 27, 0.2);
  }

  .table-wrapper{
    width: 100%;
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
