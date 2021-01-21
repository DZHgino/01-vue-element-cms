<template>
    <el-container>
        <el-header>
            <!--行-->
            <el-row>
                <!--列-->
                <el-col :span="2">
                    <div class="grid-content bg-purple-dark">
                        Nx 管理系统
                    </div>
                </el-col>
                <!-- <el-col :span="20"><div class="grid-content bg-purple-dark">
                     中间
                 </div></el-col>-->
                <el-col :span="2" :offset="20">
                    <div class="grid-content bg-purple-dark">
                        <el-button type="success" @click="logout">退出</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <el-col :span="24">
                        <el-menu
                                default-active="1"
                                class="el-menu-vertical-demo"
                                :router="routerStatus"

                        >
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>用户管理</span>
                                </template>
                                <el-menu-item index="/users">用户列表</el-menu-item>
                                <el-menu-item index="/useradd">用户添加</el-menu-item>
                            </el-submenu>

                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>商品管理</span>
                                </template>
                                <el-menu-item index="2-1">商品列表</el-menu-item>
                                <el-menu-item index="2-2">商品添加</el-menu-item>

                            </el-submenu>

                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>

            <el-main>
                <!--嵌套路由-->
                <router-view/>

            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    export default {
        name: "index",
        data: function () {
            return {
                routerStatus:true,
            }
        },
        methods: {
            logout(){
                // 1. 清除 token
                localStorage.removeItem('html7CmsToken');
                //2. 前往登录页面
                this.$router.push('/login');
            }
        }
    }
</script>
<style scoped lang="less">
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>