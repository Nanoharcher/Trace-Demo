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
  import Search from '@/components/RoughSort_Search'
  import TableContent from '@/components/RoughSort_TableContent'
  export default {
    name: 'RoughSort',
    components: {
      Search,
      TableContent
    }
  }
</script>

<style scoped>

</style>
