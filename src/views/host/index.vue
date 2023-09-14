<template>
    <div class="host-page template_page">
        <div class="h_search">
            <el-form :inline="true" :model="refreshForm" class="refreshForm" size="small">
                <el-form-item label="主机类别：">
                    <el-select v-model="refreshForm.hostType" placeholder="请选择">
                        <el-option label="Web1" value="1"></el-option>
                        <el-option label="Web2" value="w"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主机别名：">
                    <el-input v-model="refreshForm.hostName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="连接地址：">
                    <el-input v-model="refreshForm.address" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onRefresh" icon="el-icon-refresh">刷新</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="config_btn">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="onAdd">新建</el-button>
            <el-button type="primary" size="small" icon="el-icon-upload2" @click="onImport">批量导入</el-button>
        </div>
        <div class="config_table">
            <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                    prop="type"
                    label="类别">
                </el-table-column>
                <el-table-column
                    prop="hostName"
                    label="主机名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="连接地址"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="port"
                    label="端口">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注信息">
                </el-table-column>
               <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="warning"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 新建 -->
        <div class="mask_dialog" v-show="addShow">
            <div class="dialog_content" ref="dialog_content" :style="layerStyle">
                <div class="h_content" @mousedown="layerMouseDown($event)" @mouseup="layerMouseUp($event)">
                    <span class="title">新建主机</span>
                    <span class="icon el-icon-close close_dialog" @click="cancel_dialog"></span>
                </div>
                <div class="c_content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="主机分组" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="主机名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="连接地址" prop="name">
                            <el-input placeholder="用户名" v-model="input1" style="width:30%">
                                <template slot="prepend">ssh</template>
                            </el-input>
                            <el-input placeholder="主机名/IP" v-model="input2" style="width:40%">
                                <template slot="prepend">@</template>
                            </el-input>
                            <el-input placeholder="端口" v-model="input3" style="width:30%">
                                <template slot="prepend">-P</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="独立密钥" prop="keys">
                            <el-button size="medium">
                                <span class="el-icon-upload2" style="margin-right:6px"></span>
                                点击上传
                            </el-button>
                            <p style="color:#999;line-height:24px">默认使用全局密钥，如果上传了独立密钥（私钥）则优先使用该密钥。</p>
                        </el-form-item>
                        <el-form-item label="备注信息" prop="desc">
                            <el-input placeholder="请输入主机备注信息" type="textarea" v-model="ruleForm.desc" :rows="4"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="">
                            <div class="tip" style="background-color:#f0f7ff;border:1px solid #a1c5ff;padding:8px 15px;line-height:24px;">
                                <p class="el-icon-info" style="float:left;margin-right:8px;vertical-align: middle;color:#2563fc"></p>
                                <p class="text" style="vertical-align: middle;margin:0px;padding:0px;line-height:24px;font-size:12px">
                                    首次验证时需要输入登录用户名对应的密码，该密码会用于配置SSH密钥认证，不会存储该密码。
                                </p>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="f_content">
                    <span class="dialog_btn cancel_btn" @click="cancel_dialog">取消</span>
                    <span class="dialog_btn confirm_btn" @click="confirm_dialog">验证</span>
                </div>
            </div>
        </div>
        <Layer ref="add_dialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="主机分组" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="主机名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="连接地址" prop="name">
                    <el-input placeholder="用户名" v-model="input1" style="width:30%">
                        <template slot="prepend">ssh</template>
                    </el-input>
                    <el-input placeholder="主机名/IP" v-model="input2" style="width:40%">
                        <template slot="prepend">@</template>
                    </el-input>
                    <el-input placeholder="端口" v-model="input3" style="width:30%">
                        <template slot="prepend">-P</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="独立密钥" prop="keys">
                    <el-button size="medium">
                        <span class="el-icon-upload2" style="margin-right:6px"></span>
                        点击上传
                    </el-button>
                    <p style="color:#999;line-height:24px">默认使用全局密钥，如果上传了独立密钥（私钥）则优先使用该密钥。</p>
                </el-form-item>
                <el-form-item label="备注信息" prop="desc">
                    <el-input placeholder="请输入主机备注信息" type="textarea" v-model="ruleForm.desc" :rows="4"></el-input>
                </el-form-item>
                <el-form-item label="" prop="">
                    <div class="tip" style="background-color:#f0f7ff;border:1px solid #a1c5ff;padding:8px 15px;line-height:24px;">
                        <p class="el-icon-info" style="float:left;margin-right:8px;vertical-align: middle;color:#2563fc"></p>
                        <p class="text" style="vertical-align: middle;margin:0px;padding:0px;line-height:24px;">
                            首次验证时需要输入登录用户名对应的密码，该密码会用于配置SSH密钥认证，不会存储该密码。
                        </p>
                    </div>
                </el-form-item>
            </el-form>
        </Layer>
    </div>
</template>

<style lang="less">
    .host-page {
        .config_btn {
            margin-top: 20px;
            margin-bottom: 12px;
        }
    }
    .el-form--inline .el-form-item {
        margin-right: 30px;
    }
</style>

<script>
    import Layer from "../../components/Layer.vue"
    export default {
        components: {Layer},
        data() {
            return {
                addShow: false,
                subCoor: {},
                layerStyle: {},
                refreshForm: {
                    hostType: '',
                    hostName: '',
                    address: ''
                },
                tableData: [
                    {
                        type: 'Web服务',
                        hostName: 'web-01',
                        address: '172.4.100.114',
                        port: "8090",
                        remark: "-"
                    }, 
                    {
                        type: 'Web服务',
                        hostName: 'web-02',
                        address: '172.4.100.114',
                        port: "8091",
                        remark: "-"
                    }, 
                    {
                        type: 'Web服务',
                        hostName: 'web-03',
                        address: '172.4.100.114',
                        port: "8092",
                        remark: "-"
                    }, 
                    {
                        type: 'Web服务',
                        hostName: 'web-04',
                        address: '172.4.100.114',
                        port: "8093",
                        remark: "-"
                    }
                ],
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: false, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onAdd(){
                this.addShow = true;

                // 弹出添加弹出窗
                // let self = this
                // this.$refs['add_dialog'].show({ // 弹出框
                //     title:"添加",
                //     width:700,
                //     height:500,
                //     // isConfirmBtn:false,
                //     confirm:function(){ // 确认
                //             self.$refs['add_dialog'].cancel() // 关闭弹框
                //     }
                    
                // })
            },
            handleEdit(){
                this.addShow = true;
            },
            layerMouseDown(ev){
                let vertexCoor = {
                    x: this.$refs['dialog_content'].offsetLeft,
                    y: this.$refs['dialog_content'].offsetTop,
                }

                let mouseCoor = {
                    x: ev.clientX,
                    y: ev.clientY
                }

                this.subCoor = {
                    x: mouseCoor.x - vertexCoor.x,
                    y: mouseCoor.y - vertexCoor.y 
                }

                this.layerStyle = {
                    left: vertexCoor.x + "px",
                    top: vertexCoor.y + "px"
                }

                document.addEventListener("mousemove",this.layerMouseMove,false)

            },

            layerMouseUp(ev){
                document.removeEventListener("mousemove",this.layerMouseMove,false)
            },

            layerMouseMove(ev){
                let moveCoor = {
                    x: ev.clientX,
                    y: ev.clientY
                }  

                let vertexCoor = {
                    x: moveCoor.x - this.subCoor.x,
                    y: moveCoor.y - this.subCoor.y
                }

                this.layerStyle = {
                    left: vertexCoor.x + "px",
                    top: vertexCoor.y + "px"
                }
            },

            cancel_dialog(){
                this.addShow = false;
            },
            
            confirm_dialog(){
                this.addShow = false;
            },

            onImport(){
                // 弹出导入询问框
            },
            onRefresh() {
                console.log('refresh!');
            },
            formatter(row, column) {
                return row.address;
            }
        }
    }
</script>