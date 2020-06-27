<template>
    <div class="footer">
        
        <el-divider></el-divider>
        <p class="el-icon-user"> 2017-2020  Sweet's Blog</p>
        <p> 个人邮箱 ：<el-link  type="info"> 787784089@qq.com</el-link></p>
        <p class="el-icon-user-solid"> GitHub ：<el-link href="https://github.com/tiantian521936" type="info">https://github.com/tiantian521936</el-link></p>
    </div>
</template>



<script type="text/ecmascript-6">
    export default {
       name:"Footer" 
    }
</script>



<style scoped>
    .footer{
        width: 500px;
        text-align: center;
        font-family: sweet1;
        font-size: 17px;
        margin: 0 auto;
        color: #999;
    }

    .footer p{
        line-height: 200%;
    }
</style>