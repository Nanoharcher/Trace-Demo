<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
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
</style>
