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
  import Search from '@/components/HomePage_Search'
  import TableContent from '@/components/HomePage_TableContent'
  export default {
    name: 'HomePage',
    components: {
      Search,
      TableContent
    }
  }
</script>

<style scoped>

</style>
