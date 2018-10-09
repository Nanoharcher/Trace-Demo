<template>
  <div class="navigation-wrapper">
    <el-menu :default-active="activeIndex" class="navigation-content" mode="horizontal" @select.prevent="handleSelect"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <!--<el-menu-item index="1">Trace平台</el-menu-item>-->
      <el-submenu index="1">
        <template slot="title"><span class="navigation-title">机器学习</span></template>
        <el-menu-item index="1-1">大盘波动追查指标监控</el-menu-item>
        <el-menu-item index="1-2">Predictor日志检索</el-menu-item>
        <el-menu-item index="1-3">粗排日志检索</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">机器学习导航</template>
          <el-menu-item index="1-4-1">测试选项1</el-menu-item>
          <el-menu-item index="1-4-2">测试选项2</el-menu-item>
          <el-menu-item index="1-4-3">测试选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><span class="navigation-title">在线模块</span></template>
        <el-menu-item index="2-1">下发点展日志</el-menu-item>
        <el-menu-item index="2-2">队列召回日志</el-menu-item>
        <el-menu-item index="2-3">bs/urs召回日志</el-menu-item>
        <el-menu-item index="2-4">在线日志</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><span class="navigation-title">用户模型</span></template>
        <el-menu-item index="3-1">用户模型扫码</el-menu-item>
        <el-menu-item index="3-2">用户模型</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><span class="navigation-title">资源流</span></template>
        <el-menu-item index="4-1">正排数据查询</el-menu-item>
        <el-menu-item index="4-2">数据流查询</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><span class="navigation-title">Debug</span></template>
        <el-menu-item index="5-1">Debug</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><span class="navigation-title">实验室</span></template>
        <el-menu-item index="6-1">拒绝自动追查Beta</el-menu-item>
        <el-menu-item index="6-2">分发BadCase诊断</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><span class="navigation-title">工具箱</span></template>
        <el-menu-item index="7-1">OpenAPI文档</el-menu-item>
        <el-menu-item index="7-2">Trace帮助</el-menu-item>
        <el-menu-item index="7-3">截屏定位cuid</el-menu-item>
        <el-menu-item index="7-4">nid批量查询</el-menu-item>
        <el-menu-item index="7-5">用户命中小流量</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',
    data () {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style scoped>
  .navigation-wrapper{
    background-color: rgb(84, 92, 100);
    width: 100%;
  }
  .el-menu{
    display: flex;
    margin: 0 auto;
    z-index: 99;
    width: 100%;
    padding: 0 10%;
    flex-wrap: wrap;
  }
  .el-menu-item, .el-submenu{
    flex: 1!important;
  }
  .navigation-title{
    font-size: 16px;
  }
  @media screen and (max-width: 1440px) {
    .el-menu{
      padding: 0 20px;
    }
  }
  @media screen and (max-width: 1024px) {
    .el-menu{
      padding: 0 20px;
    }
  }
</style>
