<template>
    <!--使用 flex布局完成垂直和水平的居中-->
    <div class="wrapper">
        <!--model属性是用于和表单的 input 进行绑定-->
        <!--rules 是用于和表单的提交的时候进行验证操作的规则对象-->
        <!--表单是用于收集数据，elementui帮我们集成了自动校验的功能，不需要开发者自己去编写js代码校验-->
        <el-form :model="ruleForm" class="login-form" status-icon :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { login } from '../../api/back.js'
    export default {
        name: "index",
        data: function () {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}

                    ], // 数组的原因是因为我们可以为当前这个input设置多个验证规则，每个规则为一个对象。
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            submitForm(params) {
                // this.$refs[params] 当前表单的DOM对象 elementui为其扩充一个 validate 方法

                this.$refs[params].validate((valid) => {
                    console.log(valid);
                    if(!valid){
                        // 提出一个提示信息
                        this.$message.error('信息不完成，填写完毕后提交！');
                        return;
                    }else{
                        // 可以提交，需要和后台 api 进行对接联调
                        console.log(this.ruleForm);
                        login(this.ruleForm).then( response => {
                            console.log(response.data);
                            let {meta, data} = response.data;
                            if( meta.status == 200 ){
                                //1. 记录登录成功的 token
                                localStorage.setItem('html7CmsToken', data.token);
                                // 其他的页面都需要基于token做认证
                                //2. 前往后台的主页
                                this.$router.push('/home');
                                this.$message.success(meta.msg);

                                return;
                            }else{
                                this.$message.error(meta.msg);
                                return;

                            }

                        }).catch( error => {
                            this.$message.error('登录系统失败！');
                            return;
                        })



                    }

                });
            }
        }
    }
</script>

<style scoped lang="less">
    .wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-form {
            width: 960px;
            height: 200px;
            border: 1px solid #000;
        }
    }
</style>