<template>
  <div id="app">
    <el-container>
      <el-header class="header-wrapper">
        <div class="logo-wrapper" onclick="document.location.href='/Trace-Demo/#/'">
          <!--<i class="glyphicon glyphicon-inbox"></i>-->
          <span class="logo-title">Trace平台</span>
        </div>
        <div class="navigation-wrapper">
          <Navigation></Navigation>
        </div>
        <div class="login-wrapper">

          <div class="login-button-wrapper">
            <el-dropdown class="login-dropdown" trigger="click" size="mini" split-button type="success">
              <!--<i class="glyphicon glyphicon-user"></i>-->
              <span class="login-username">{{this.user}}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>帮助文档</el-dropdown-item>
                <el-dropdown-item>帮助文档</el-dropdown-item>
                <el-dropdown-item>帮助文档</el-dropdown-item>
                <el-dropdown-item>帮助文档</el-dropdown-item>
                <el-dropdown-item>帮助文档</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap-table/dist/bootstrap-table.min.css'
  import 'bootstrap/dist/js/bootstrap.min'
  import 'bootstrap-table/dist/bootstrap-table.min'
  import '../static/css/bootstrap-table-fixed-columns.css'
  import '../static/js/bootstrap-table-fixed-columns.js'
  import 'magnific-popup/dist/magnific-popup.css'
  import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.min'
  import 'bootstrap-select/dist/css/bootstrap-select.min.css'
  import 'bootstrap-select/dist/js/bootstrap-select.min'
  export default {
    name: 'App',
    data () {
      return {
        user: '马旭骁'
      }
    },
    components: {
      Navigation
    }
  }
</script>
<style>
  .el-header {
    margin: 0;
    padding: 0!important;
  }
  .el-main {
    margin-bottom: 60px;
  }
  .header-wrapper{
    display: flex;
    position: fixed;
    z-index: 999;
    width: 100%;
  }
  .logo-wrapper{
    background-color: rgb(84, 92, 100);
    cursor: pointer;
    padding: 0 10px;
  }
  .logo-wrapper i{
    font-size: 28px;
    line-height: 60px;
    vertical-align: top;
    color: #fff;
  }
  .logo-title{
    font-size: 24px;
    line-height: 60px;
    margin: 0;
    vertical-align: top;
    color: #fff;
    font-weight: 700;
  }
  .login-wrapper{
    background-color: rgb(84, 92, 100);
    cursor: pointer;
    padding: 0 20px 0 20px;
  }
  .login-button-wrapper i{
    vertical-align: top;
    color: #fff;
  }
  .login-button-wrapper .login-username{
    vertical-align: top;
    color: #fff;
  }
  .login-button-wrapper{
    display: inline-block;
    font-size: 14px;
    line-height: 60px;
    vertical-align: top;
  }
  .login-dropdown{
    vertical-align: top;
  }
  .navigation-wrapper{
    flex: 1;
  }
  @media screen and (max-width: 1250px) {
    .header-wrapper{
      display: inline-block;
    }
    .logo-wrapper{
      display: inline-block;
      float: left;
    }
    .login-wrapper{
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
