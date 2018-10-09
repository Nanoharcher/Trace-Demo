<template>
  <div>
    <el-container>
      <el-header class="header-wrapper">
        <div class="logo-wrapper" onclick="document.location.href='https://www.baidu.com'">
          <i class="glyphicon glyphicon-inbox"></i>
          <span class="logo-title">Trace平台</span>
        </div>
        <div class="navigation-wrapper">
          <Navigation></Navigation>
        </div>
        <div class="login-wrapper">
          <i class="glyphicon glyphicon-user"></i>
          <span class="login-user">{{this.user}}</span>
          <div class="login-button-wrapper">
            <el-dropdown class="login-dropdown">
              <el-button icon="el-icon-setting" circle class="login-button"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>测试菜单</el-dropdown-item>
                <el-dropdown-item>测试菜单</el-dropdown-item>
                <el-dropdown-item>测试菜单</el-dropdown-item>
                <el-dropdown-item>测试菜单</el-dropdown-item>
                <el-dropdown-item>测试菜单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-container>
          <search></search>
        </el-container>
        <el-container>
          <table-content></table-content>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import Search from '@/components/Search'
  import TableContent from '@/components/TableContent'

  export default {
    data () {
      return {
        user: '马旭骁'
      }
    },
    components: {
      Navigation,
      Search,
      TableContent
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    margin: 0;
    padding: 0;
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
  }
  .login-wrapper{
    background-color: rgb(84, 92, 100);
    cursor: pointer;
    padding: 0 20px 0 20px;
  }
  .login-wrapper i{
    font-size: 28px;
    line-height: 60px;
    vertical-align: top;
    color: #fff;
  }
  .login-user{
    font-size: 16px;
    line-height: 60px;
    margin: 0;
    vertical-align: top;
    color: #fff;
  }
  .login-button-wrapper{
    display: inline-block;
    font-size: 16px;
    line-height: 60px;
    vertical-align: top;
  }
  .login-button{
    border-radius: 0;
    padding:6px;
    font-size: 20px;
    margin-left:10px;
  }
  .navigation-wrapper{
    flex: 1;
  }
  @media screen and (max-width: 1200px) {
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
