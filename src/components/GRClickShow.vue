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
  import Search from '@/components/GRClickShow_Search'
  import TableContent from '@/components/GRClickShow_TableContent'
  export default {
    name: 'GRClickShow',
    components: {
      Search,
      TableContent
    }
  }
</script>

<style scoped>

</style>
