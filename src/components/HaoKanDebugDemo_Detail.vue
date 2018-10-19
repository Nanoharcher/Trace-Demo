<template>
  <div class="content-wrapper">
    <div class="table-wrapper table-responsive">
      <div id="toolbar">
        <button id="refreshStorage" class="btn btn-default" @click="clearLocalStorage">显示全部列</button>
      </div>
      <table id="table" data-show-columns="true" data-locale="zh-CN" data-height="600"></table>
    </div>
  </div>
</template>

<script>
  import '../../static/js/select2.min'
  import 'bootstrap-table/dist/extensions/select2-filter/bootstrap-table-select2-filter.min'

  function idformatter (value, row, index, field) {
    return index + 1
  }

  function nidFormatter (value, row) {
    var template = '<a target=\'_blank\' href=\'https://www.baidu.com/?' + value + '\'>' + value + '</a>'
    return template
  }

  function titleFormatter (value, row) {
    var template = '<a target=\'_blank\' href=\'https://www.baidu.com/?' + value + '\'>' + value + '</a>'
    return template
  }

  function weightFormatter (value, row, index, field) {
    var template = '<a style=\'cursor:pointer\'onclick=\'showWeightDetail("' + field + '")\'>' + value + '</a>'
    return template
  }

  function deepClone (obj) {
    let newObj = Array.isArray(obj) ? [] : {}

    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : obj[key]
        }
      }
    }
    return newObj
  }

  var receivedlogID
  var tableheader = [
    {
      title: '序号',
      field: 'id',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      formatter: idformatter,
      searchable: false
    },
    {
      title: '队列号',
      field: 'queueID',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      filter: {type: 'input'},
      searchable: true
    },
    {
      title: 'nid',
      field: 'nid',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      formatter: nidFormatter,
      searchable: false
    },
    {
      title: '标题',
      field: 'title',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      formatter: titleFormatter,
      searchable: false
    },
    {
      title: '粗排',
      field: 'roughSort',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      sortable: true,
      formatter: weightFormatter,
      searchable: false
    },
    {
      title: '调权1',
      field: 'weight1',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      sortable: true,
      formatter: weightFormatter,
      searchable: false
    },
    {
      title: '粗排rank',
      field: 'roughSortRank',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      formatter: weightFormatter,
      searchable: false
    },
    {
      title: 'vfs',
      field: 'vfs',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      formatter: weightFormatter,
      searchable: false
    },
    {
      title: '精排',
      field: 'mlSort',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      sortable: true,
      formatter: weightFormatter,
      searchable: false
    },
    {
      title: '调权2',
      field: 'weight2',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      sortable: true,
      formatter: weightFormatter,
      searchable: false
    },
    {
      title: '精排rank',
      field: 'mlSortRank',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      formatter: weightFormatter,
      searchable: false
    },
    {
      title: '多样性',
      field: 'multiple',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      formatter: weightFormatter,
      searchable: false
    },
    {
      title: '过滤',
      field: 'filter',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      formatter: weightFormatter,
      searchable: false
    },
    {
      title: '强插',
      field: 'insert',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      formatter: weightFormatter,
      searchable: false
    },
    {
      title: '替换',
      field: 'replace',
      class: 'text-nowrap',
      halign: 'center',
      valign: 'middle',
      formatter: weightFormatter,
      searchable: false
    }
  ]
  var newtabheader = deepClone(tableheader)
  var _initheaderMemory = []
  var _savedheaderMemory = []
  for (let i = 0; i < tableheader.length; i++) {
    var temp = {}
    temp.field = tableheader[i].field
    temp.visible = true
    _initheaderMemory.push(temp)
  }
  if (localStorage.getItem('traceHaoKanDebugDetailTableHead') === null) {
    _savedheaderMemory = deepClone(_initheaderMemory)
    var _savedheaderMemoryString = JSON.stringify(_savedheaderMemory)
    localStorage.setItem('traceHaoKanDebugDetailTableHead', _savedheaderMemoryString)
  } else {
    try {
      _savedheaderMemory = JSON.parse(localStorage.getItem('traceHaoKanDebugDetailTableHead'))
      for (let i = 0; i < newtabheader.length; i++) {
        newtabheader[i].visible = _savedheaderMemory[i].visible
      }
    } catch (err) {
      console.log(err)
      localStorage.clear()
    }
  }
  var tabledata = [
    {
      queueID: '240|254',
      nid: '980619825',
      title: '留住东北的年轻人',
      roughSort: '0.17394983768463135',
      weight1: '0.18394983768463135',
      roughSortRank: '1',
      vfs: '-',
      mlSort: '0.04243728145956993',
      weight2: '0.03243728145956993',
      mlSortRank: '2',
      multiple: '0.03243728145956993',
      filter: '-',
      insert: '-',
      replace: '-'
    },
    {
      queueID: '201|133',
      nid: '94395368',
      title: '山东理工大学',
      roughSort: '0.16394983768463135',
      weight1: '0.17394983768463135',
      roughSortRank: '2',
      vfs: '-',
      mlSort: '0.04343728145956993',
      weight2: '0.04243728145956882',
      mlSortRank: '1',
      multiple: '0.03243728145956345',
      filter: '-',
      insert: '-',
      replace: '-'
    }
  ]
  export default {
    name: 'HaoKanDebugDemo_Detail',
    methods: {
      clearLocalStorage () {
        localStorage.clear()
        this.$notify({
          title: '成功',
          message: '本地储存已清除',
          type: 'success',
          position: 'bottom-right'
        })
        location.reload()
      },
      showWeightDetail (field) {
        for (let i = 0; i < tableheader.length; i++) {
          if (tableheader[i].field === field) {
            let routeData = this.$router.resolve({
              name: 'HaoKanDebugDemoDetailWeight',
              query: {
                column: tableheader[i].title
              }
            })
            window.open(routeData.href, '_blank')
          }
        }
      }
    },
    created () {
      $('head').append('<style>.btn-default:focus{border-color: #409EFF!important; outline: 0!important;}.btn-default{background-color:#fff!important}.filter-option-inner-inner{height:38px}.bootstrap-select{width:100%!important}.bootstrap-select button{-webkit-appearance: none; background-color: #fff; background-image: none; border-radius: 4px; border: 1px solid #dcdfe6; -webkit-box-sizing: border-box; box-sizing: border-box; color: #606266; display: inline-block; font-size: inherit; height: 40px; line-height: 40px; outline: 0; padding: 0 15px; -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1); transition: border-color .2s cubic-bezier(.645,.045,.355,1); width: 100%;}.white-popup { position: relative; background: #FFF; padding: 20px; width: auto; max-width: 500px; margin: 20px auto; }.mfp-wrap .zoom-anim-dialog { opacity: 0; -webkit-transition: all 0.2s ease-in-out; -moz-transition: all 0.2s ease-in-out; -o-transition: all 0.2s ease-in-out; transition: all 0.2s ease-in-out; -webkit-transform: scale(0.8); -moz-transform: scale(0.8); -ms-transform: scale(0.8); -o-transform: scale(0.8); transform: scale(0.8); } .mfp-wrap.mfp-ready .zoom-anim-dialog { opacity: 1; -webkit-transform: scale(1); -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); transform: scale(1); } .mfp-wrap.mfp-removing .zoom-anim-dialog { -webkit-transform: scale(0.8); -moz-transform: scale(0.8); -ms-transform: scale(0.8); -o-transform: scale(0.8); transform: scale(0.8); opacity: 0; }</style>')
    },
    mounted () {
      receivedlogID = this.$route.query.logID
      console.log(receivedlogID)
      var $table = $('#table')
      window['showWeightDetail'] = (value) => {
        this.showWeightDetail(value)
      }

      $('head').append('<style>.th-inner{color: #909399;font-weight:700;}.fixed-table-pagination{display:inline-block;clear:unset!important;float:left}.fixed-table-toolbar{display:inline-block;float:right}</style>')
      if (document.body.clientWidth > 1024) {
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: newtabheader,
          data: tabledata,
          search: true,
          pagination: true,
          toolbar: '#toolbar',
          toolbarAlign: 'right',
          fixedColumns: true,
          paginationVAlign: 'top',
          paginationHAlign: 'left',
          pageSize: 100,
          fixedNumber: 0,
          onColumnSwitch: function (field, text) {
            console.log(field)
            for (let i = 0; i < _savedheaderMemory.length; i++) {
              if (_savedheaderMemory[i]['field'] === field) {
                if (_savedheaderMemory[i].hasOwnProperty('visible')) {
                  _savedheaderMemory[i]['visible'] = !_savedheaderMemory[i]['visible']
                } else {
                  _savedheaderMemory[i]['visible'] = false
                }
              }
            }
            console.log(_savedheaderMemory)
            var _savedheaderMemoryString = JSON.stringify(_savedheaderMemory)
            localStorage.setItem('traceHaoKanDebugDetailTableHead', _savedheaderMemoryString)
          }
        })
      } else {
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: newtabheader,
          data: tabledata,
          search: true,
          pagination: true,
          toolbar: '#toolbar',
          toolbarAlign: 'right',
          fixedColumns: false,
          paginationVAlign: 'top',
          paginationHAlign: 'left',
          pageSize: 100,
          onColumnSwitch: function (field, text) {
            console.log(field)
            for (let i = 0; i < _savedheaderMemory.length; i++) {
              if (_savedheaderMemory[i]['field'] === field) {
                if (_savedheaderMemory[i].hasOwnProperty('visible')) {
                  _savedheaderMemory[i]['visible'] = !_savedheaderMemory[i]['visible']
                } else {
                  _savedheaderMemory[i]['visible'] = false
                }
              }
            }
            console.log(_savedheaderMemory)
            var _savedheaderMemoryString = JSON.stringify(_savedheaderMemory)
            localStorage.setItem('traceHaoKanDebugDetailTableHead', _savedheaderMemoryString)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .content-wrapper {
    width: 100%;
    padding: 10px 20px;
    margin-top: 60px;
    text-align: center;
  }

  .table-wrapper {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  #refreshStorage {
    vertical-align: top;
    margin-left: 5px;
  }

  @media screen and (max-width: 1250px) {
    .content-wrapper {
      margin-top: 120px;
    }
  }

  @media screen and (max-width: 1024px) {
    .content-wrapper {
      margin-top: 180px;
    }
  }

  @media screen and (max-width: 768px) {
    .content-wrapper {
      margin-top: 200px;
    }
  }

  @media screen and (max-width: 500px) {
    .content-wrapper {
      margin-top: 230px;
    }
  }

  @media screen and (max-width: 425px) {
    .content-wrapper {
      margin-top: 300px;
    }
  }
</style>
