<template>
  <div>
    <el-container>
      <div class="search-wrapper">
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
                <!--<el-select v-model="form.queue" placeholder="请输入队列" class="single-selector">-->
                <!--<el-option label="测试" value="test1"></el-option>-->
                <!--<el-option label="测试" value="test2"></el-option>-->
                <!--</el-select>-->
                <select id="form-queue" class="selectpicker" title="请选择队列" data-live-search="true">
                  <optgroup label="测试组1">
                    <option>测试数据1</option>
                    <option>测试数据2</option>
                    <option>测试数据3</option>
                  </optgroup>
                  <optgroup label="测试组2">
                    <option>测试数据4</option>
                    <option>测试数据5</option>
                    <option>测试数据6</option>
                  </optgroup>
                </select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
              <el-form-item label="频道页">
                <!--<el-select v-model="form.channel" placeholder="请输入频道页" class="single-selector">-->
                <!--<el-option label="测试" value="test1"></el-option>-->
                <!--<el-option label="测试" value="test2"></el-option>-->
                <!--</el-select>-->
                <select id="form-channel" class="selectpicker" title="请选择频道页" data-live-search="true">
                  <optgroup label="测试组1">
                    <option>测试数据1</option>
                    <option>测试数据2</option>
                    <option>测试数据3</option>
                  </optgroup>
                  <optgroup label="测试组2">
                    <option>测试数据4</option>
                    <option>测试数据5</option>
                    <option>测试数据6</option>
                  </optgroup>
                </select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="search-item">
              <el-form-item label="新闻类型">
                <!--<el-select v-model="form.newstype" placeholder="请输入新闻类型" class="single-selector">-->
                <!--<el-option label="测试" value="test1"></el-option>-->
                <!--<el-option label="测试" value="test2"></el-option>-->
                <!--</el-select>-->
                <select id="form-newstype" class="selectpicker" title="请选择新闻类型" data-live-search="true">
                  <optgroup label="测试组1">
                    <option>测试数据1</option>
                    <option>测试数据2</option>
                    <option>测试数据3</option>
                  </optgroup>
                  <optgroup label="测试组2">
                    <option>测试数据4</option>
                    <option>测试数据5</option>
                    <option>测试数据6</option>
                  </optgroup>
                </select>
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
                <el-button type="primary">查询uid/cuid</el-button>
                <el-button type="primary">重置</el-button>
                <el-dropdown>
                  <el-button type="primary">
                    导出<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>手百</el-dropdown-item>
                    <el-dropdown-item>Wise</el-dropdown-item>
                    <el-dropdown-item>PC</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-container>
    <el-container>
      <div class="table-wrapper table-responsive">
        <table id="table" data-show-columns="true" data-locale="zh-CN"></table>
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

  var tableheader = []
  var newtabheader = []
  if (localStorage.getItem('traceGRClickShowTableHead') === null) {
    tableheader = [
      {title: 'cuid', field: 'cuid', class: 'text-nowrap', halign: 'center', valign: 'middle', switchable: false},
      {title: 'nid', field: 'nid', class: 'text-nowrap', halign: 'center', valign: 'middle', formatter: nidFormatter},
      {title: '顺序', field: 'order', class: 'text-nowrap', halign: 'center', valign: 'middle', sortable: true},
      {title: '标题', field: 'title', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '副标题', field: 'subtitle', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '日志类型', field: 'logType', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '日志时间', field: 'logDate', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '是否点击', field: 'click', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '是否展示', field: 'show', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: 'attent', field: 'attention', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: 'tag', field: 'tag', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '发布时间', field: 'publishDate', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '一级分类', field: 'firstCat', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '二级分类', field: 'secondCat', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '队列', field: 'queue', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '资源分类', field: 'resourceCat', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '推荐来源', field: 'feedSource', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: 'tab页', field: 'tabPage', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '召回atte', field: 'callbackAttention', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '队列加权', field: 'queueWeightScore', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '原始', field: 'originalScore', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '资源来源', field: 'resSource', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '点击来源', field: 'clickSource', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '新闻类型', field: 'newsType', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: 'AttRes', field: 'attRes', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '主机', field: 'host', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: 'sign', field: 'sign', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '原始nid', field: 'originalnid', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '置顶', field: 'top', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '强插第二位', field: 'forceSecond', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: 'session', field: 'session', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '刷新类型', field: 'refreshType', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: 'logId', field: 'logId', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: 'pipeCm', field: 'pipeCmd', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '原始日志', field: 'originalLog', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '刷新时间', field: 'refreshTime', class: 'text-nowrap', halign: 'center', valign: 'middle'},
      {title: '操作', field: 'callbackClickSource', class: 'text-nowrap', halign: 'center', valign: 'middle'}
    ]
    newtabheader = deepClone(tableheader)
    var traceGRClickShowTableHead = JSON.stringify(tableheader)
    localStorage.setItem('traceGRClickShowTableHead', traceGRClickShowTableHead)
  } else {
    try {
      tableheader = JSON.parse(localStorage.getItem('traceGRClickShowTableHead'))
      newtabheader = JSON.parse(localStorage.getItem('traceGRClickShowTableHead'))
    } catch (err) {
      console.log(err)
      localStorage.clear()
    }
  }
  var tabledata = [
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    },
    {
      cuid: 'F324960A842BF2B966E628446C2DE929B1E5E5A9AFHEKLAREFG',
      nid: '2026646537427695349',
      order: '60',
      title: '罗文：美对华商品加征关税 给全球产业链带来重大冲击',
      subtitle: '-',
      logType: '展示',
      logDate: '2018-09-27 17:01:42',
      click: '否',
      show: '是',
      attention: '-',
      tag: '[{\'宏观经济\':240},{\'产业链\':240},{\'罗文\':240},{\'关税\':140},{\'冲击\':106},{\'产业\':106},{\'商品\':103},{\'全球\':101}]',
      publishDate: '2018-09-25 22:16:41',
      firstCat: '财经',
      secondCat: '宏观经济',
      queue: '248',
      resourceCat: '视频(小图)',
      feedSource: '基于用户长期行为的语义(19)',
      tabPage: '主feed',
      callbackAttention: '[]',
      queueWeightScore: '0.566443',
      originalScore: '-',
      resSource: 'baijiahao.baidu.com',
      clickSource: 'index',
      newsType: 'sv',
      attRes: '-',
      host: '-',
      sign: '-',
      originalnid: '',
      top: '-',
      forceSecond: '-',
      session: '1538034323803',
      refreshType: '按返回键提示再按一次退出时刷新14/大刷新',
      logId: '1054360166',
      pipeCmd: '列表页-展现',
      originalLog: '原始日志',
      refreshTime: '1538036254494',
      callbackClickSource: '-'
    }
  ]
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
  function nidFormatter (value, row) {
    var template = '<a target=\'_blank\' href=\'https://www.baidu.com/?' + value + '\'>' + value + '</a>'
    return template
  }

  export default {
    name: 'GRClickShow',
    data () {
      return {
        tableheader: tableheader,
        tabledata: tabledata,
        popuptableheader: popuptableheader,
        popuptabledata: popuptabledata,
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
    created () {
      $('head').append('<style>.btn-default:focus{border-color: #409EFF!important; outline: 0!important;}.btn-default{background-color:#fff!important}.filter-option-inner-inner{height:38px}.bootstrap-select{width:100%!important}.bootstrap-select button{-webkit-appearance: none; background-color: #fff; background-image: none; border-radius: 4px; border: 1px solid #dcdfe6; -webkit-box-sizing: border-box; box-sizing: border-box; color: #606266; display: inline-block; font-size: inherit; height: 40px; line-height: 40px; outline: 0; padding: 0 15px; -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1); transition: border-color .2s cubic-bezier(.645,.045,.355,1); width: 100%;}.white-popup { position: relative; background: #FFF; padding: 20px; width: auto; max-width: 500px; margin: 20px auto; }.mfp-wrap .zoom-anim-dialog { opacity: 0; -webkit-transition: all 0.2s ease-in-out; -moz-transition: all 0.2s ease-in-out; -o-transition: all 0.2s ease-in-out; transition: all 0.2s ease-in-out; -webkit-transform: scale(0.8); -moz-transform: scale(0.8); -ms-transform: scale(0.8); -o-transform: scale(0.8); transform: scale(0.8); } .mfp-wrap.mfp-ready .zoom-anim-dialog { opacity: 1; -webkit-transform: scale(1); -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); transform: scale(1); } .mfp-wrap.mfp-removing .zoom-anim-dialog { -webkit-transform: scale(0.8); -moz-transform: scale(0.8); -ms-transform: scale(0.8); -o-transform: scale(0.8); transform: scale(0.8); opacity: 0; }</style>')
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
      },
      popup (e) {
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
    },
    mounted () {
      var $table = $('#table')
      $('.selectpicker').selectpicker()
      var tableHeader
      window['popupContent'] = (e) => {
        this.popup(e)
      }
      $('head').append('<style>.th-inner{color: #909399;font-weight:700;}</style>')
      if (document.body.clientWidth > 1024) {
        console.log(this.tableheader)
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: this.tableheader,
          data: this.tabledata,
          search: true,
          pagination: true,
          toolbar: '.toolbar',
          fixedColumns: true,
          paginationPreText: 'Previous',
          paginationNextText: 'Next',
          paginationVAlign: 'top',
          pageSize: 100,
          fixedNumber: 1,
          onColumnSwitch: function (field, text) {
            // console.log(field)
            for (let i = 0; i < newtabheader.length; i++) {
              if (newtabheader[i]['field'] === field) {
                if (newtabheader[i].hasOwnProperty('visible')) {
                  newtabheader[i]['visible'] = !newtabheader[i]['visible']
                } else {
                  newtabheader[i]['visible'] = false
                }
              }
            }
            // console.log(newtabheader)
            var newtabheaderString = JSON.stringify(newtabheader)
            localStorage.setItem('traceGRClickShowTableHead', newtabheaderString)
          }
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
        console.log(this.tableheader)
        $table.bootstrapTable('destroy').bootstrapTable({
          columns: this.tableheader,
          data: this.tabledata,
          search: true,
          pagination: true,
          toolbar: '.toolbar',
          fixedColumns: false,
          paginationPreText: 'Previous',
          paginationNextText: 'Next',
          paginationVAlign: 'top',
          pageSize: 100,
          onColumnSwitch: function (field, text) {
            // console.log(field)
            for (let i = 0; i < newtabheader.length; i++) {
              if (newtabheader[i]['field'] === field) {
                if (newtabheader[i].hasOwnProperty('visible')) {
                  newtabheader[i]['visible'] = !newtabheader[i]['visible']
                } else {
                  newtabheader[i]['visible'] = false
                }
              }
            }
            // console.log(newtabheader)
            var newtabheaderString = JSON.stringify(newtabheader)
            localStorage.setItem('traceGRClickShowTableHead', newtabheaderString)
          }
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
