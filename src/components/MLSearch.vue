<template>
  <div>
    <el-container>
      <search></search>
    </el-container>
    <el-container>
      <table-content></table-content>
    </el-container>
  </div>
</template>

<script>
  import Search from '@/components/MLSearch_Search'
  import TableContent from '@/components/MLSearch_TableContent'
  export default {
    name: 'MLSearch',
    components: {
      Search,
      TableContent
    }
  }
</script>

<style scoped>

</style>
