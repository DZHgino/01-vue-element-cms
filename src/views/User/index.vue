<template>
    <div>
        <el-input v-model="kw" placeholder="请输入查询关键字"></el-input>
        <el-button type="primary" @click="searchHandler">查询</el-button>
        <el-button type="primary" @click="addHandler">新增</el-button>
        <el-table
                :data="tableData"
                style="width: 100%">

            <el-table-column
                    prop="id"
                    label="序号"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="username"
                    label="用户名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="role_name"
                    label="角色名称">
            </el-table-column>
            <el-table-column
                    label="操作">
                <!--列组件的内部是可以存放用户自定义的内容，之前学习的 slot 插槽-->
                <template slot-scope="scope">
                    <el-button type="primary" @click="editHanlder(scope)">编辑</el-button>
                    <el-button type="danger" @click="removeHanlder(scope)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="pageSizes"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>

        <!--模态框-->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">

            <el-form :model="form">
                <el-form-item label="用户名" label-width="100">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="100">
                    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="100">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="storeUser">添加</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {userList, userAdd, userDel} from '../../api/user.js'

    export default {
        name: "index",
        data: function () {
            return {
                page: 1, // 默认显示的页码，默认显示第一页
                size: 2, // 每页显示的数量
                pageSizes: [2, 5, 10, 20], // 定义每页显示的条数的select框
                total: 10,// 默认 实际要通过接口从后台数据数据的总数
                kw: '',
                dialogFormVisible: false, // 控制模态框的展示与否
                // 收集用户信息容器
                form: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: '',
                },
                tableData: []

            }
        },
        created() {
            // 发送用户列表的请求
            this.getUserList();
        },
        methods: {
            getUserList(page = 1, size = 2, kw = '') {
                userList(page, size, kw).then(response => {
                    // 网络请求畅通
                    console.log(response.data);
                    let {meta, data} = response.data;
                    if (meta.status == 200) {
                        // 处理数据
                        this.total = data.total;
                        this.tableData = data.users;
                        this.$message.success('用户获取成功！');

                    } else {
                        this.$message.error('获取用户信息失败！' + meta.msg);
                    }


                }).catch(error => {

                    this.$message.error('获取用户信息失败！');
                })

            },
            // 定义好和分页相关的回调函数
            // 用户点击页码的时候触发
            handleCurrentChange(page) {
                this.page = page; // 记录当前页码

                console.log(page, 'handleCurrentChange');
                this.getUserList(page);

            },
            // 处理用户改变每页显示的数量
            handleSizeChange(size) {

                console.log(size, 'handleSizeChange');
                this.size = size;
                // 一般用户点击 每页显示数量后，页码一般都重置为 1
                this.getUserList(1, size);

            },
            // 定义查询操作
            searchHandler() {
                if (!this.kw) {
                    this.$message.error('请输入查询关键字');
                    return;
                }
                // 调用查询接口获取数据信息 有可能用户是在其他的页码下点击的查询，所以页码要重置
                // 10 查询  pageNum = 10 & pageSize = 2; // 如果本身 2
                this.getUserList(1, this.size, this.kw);

                // 有的时候，后台做查询的时候，一般都是组合查询
                // 商品表
                // 1. 商品名称做模糊查询（查询信息里面只要包含该查询关键字，都要匹配出来，这种查询方式叫做模糊查询；还有一种查询叫做精准匹配） 关键字：iphone 基于模糊匹配，只要是包含 iphone 都要出来 例如： iphone4 iphone12 iphone手机壳；基于精准：iphone
                // 2. 价格范围在 3000-1000
                // 3. 价格降序 从高到低
                // 一般这种查询我们称之为 维度
                // 给的接口：分页+关键字模糊查询


            },
            // 弹出一个模态框，展示一个添加表单，完成用户信息的收集
            addHandler() {
                // 控制展示
                // this.$message.success('addHandler');
                this.dialogFormVisible = true;
            },
            storeUser() {
                // 收集信息 校验用户信息 rules;
                console.log(this.form);
                // 调用接口
                userAdd(this.form).then(response => {
                    console.log(response.data);
                    let {meta, data} = response.data;
                    if (meta.status == 201) {
                        this.$message.success('添加成功！');
                        // 1. 关闭模态框
                        // 2. 展示最新的用户的列表信息
                        this.dialogFormVisible = false;
                        this.getUserList(); // 这里一般都是 调用 按照 id 倒序获取数据的接口。从大到小，因为主键id一般业务都是递增的，那么新用户主键的id是当前的最大值。当前最新的用户在第一页第一个展示。
                        this.form = {
                            username: '',
                            password: '',
                            email: '',
                            mobile: '',
                        }

                    } else {
                        this.$message.error('添加失败！' + meta.msg);
                    }

                }).catch(error => {
                    this.$message.error('添加失败！');
                    return;
                })

            },
            editHanlder(scope) {
                console.log('edit', scope);

            },
            removeHanlder(scope) {

                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 用户确认之后才进行删除操作
                    let id = scope.row.id;
                    userDel( id ).then( response => {
                        let {meta} = response.data;
                        if(meta.status == 200 ){
                            // 一般在后台业务里面，数据是无价，一般在处理的时候我们都是做的伪删除。
                            // 一般在后台的表里面会增加一个 is_delete 字段来标识当前的记录信息是否可用。好比
                            // 1 逻辑上代表已经删除，这条数据不可以使用，在做查询的时候，就不获取is_delete =1; 只获取 is_delete=0;

                            // 前台也要给出一个提示操作
                            this.$message.success('删除成功！');
                            this.getUserList(1, this.size);

                            return;
                        }else{
                            this.$message.error('删除失败！');
                            return;
                        }
                        console.log(response.data);

                    }).catch( error => {
                        this.$message.error('删除失败！');
                        return;
                        console.log(error);
                    })

                   /* this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });*/
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


                // 调用后台的接口完成信息的删除操作。
                // console.log('remove', scope.row);
                // console.log('remove', scope.row.id);

            }

        }
    }
</script>

<style scoped>

</style>