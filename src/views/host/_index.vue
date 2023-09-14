<template>
    <div class="host-page">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="l_nav">
                    <div class="head">
                        <span class="title">分组列表</span>
                        <el-switch
                            class="switchClass"
                            v-model="switchData"
                            active-value="1"
                            inactive-value="0"
                            active-text="排版"
                            inactive-text="浏览"
                            @change="switchGroup">
                        </el-switch>
                        <el-tooltip class="switch_tooltip" effect="dark" content="排版模式下，可通过拖拽分组实现快速排序，右键点击分组进行分组管理。" placement="top">
                            <span class="icon el-icon-question"></span>
                        </el-tooltip>
                    </div>
                    <div class="group">
                        <el-tree
                            :data="data"
                            node-key="id"
                            default-expand-all
                            @node-drag-start="handleDragStart"
                            @node-drag-enter="handleDragEnter"
                            @node-drag-leave="handleDragLeave"
                            @node-drag-over="handleDragOver"
                            @node-drag-end="handleDragEnd"
                            @node-drop="handleDrop"
                            draggable
                            :allow-drop="allowDrop"
                            :allow-drag="allowDrag">
                            <span slot-scope="{node,data}">
                                <i :class="data.icon" style="font-size:14px"></i>
                                <span style="padding-left:4px;font-size:14px">{{ node.label }}</span>
                            </span>
                        </el-tree>
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="r_list">
                    <div class="h_search">
                        <el-form :inline="true" :model="refreshForm" class="refreshForm" size="small">
                            <el-form-item label="">
                                <el-input v-model="refreshForm.hostName" placeholder="输入名称/IP检索"></el-input>
                            </el-form-item>
                            <el-form-item style="float:right">
                                <el-button type="primary" size="small" icon="el-icon-plus" @click="onAdd">新建</el-button>
                                <el-button type="primary" size="small" icon="el-icon-upload2" @click="onImport">批量导入</el-button>
                            </el-form-item>
                        </el-form>
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
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less">
    .host-page {
        .l_nav {
            padding: 0px 24px;
            border: 1px solid #ddd;
            background-color: #fff;
            .head {
                padding: 16px 0px;
                border-bottom: 1px solid #ddd;
                position: relative;
                .switchClass{
                    position: absolute;
                    right: 32px;
                    .el-switch__label--left {
                        position: absolute;
                        left: 24px;
                        color: #fff;
                        z-index: -1111;
                        width: 30px;
                    }
                    .el-switch__core{
                        width: 60px !important;
                    }
                    .el-switch__label--right {
                        position: absolute;
                        right: 20px;
                        color: #fff;
                        z-index: -1111;
                        width: 30px;
                    }
                    .el-switch__label--right.is-active {
                        z-index: 1111;
                        color: #fff !important;
                    }
                    .el-switch__label--left.is-active {
                        z-index: 1111;
                        color: #9c9c9c !important;
                    }
                }
                .switch_tooltip {
                    float: right;
                    font-size: 20px;
                    vertical-align: middle;
                }
            }
            .group {
                padding: 12px 0px 20px 0px;
            }
        }
        .r_list {
            padding: 24px;
            border: 1px solid #ddd;
            background-color: #fff; 
        }
    }
</style>

<script>
export default {
    data() {
        return {
            switchData: "0",
            data: [
                {
                    id: 1,
                    icon: "el-icon-folder",
                    label: '腾讯云',
                    children: []
                }, 
                {
                    id: 2,
                    icon: "el-icon-folder-opened",
                    label: '阿里云',
                    children: [
                        {
                            id: 5,
                            icon: "el-icon-folder",
                            label: '核心服务'
                        },
                        {
                            id: 6,
                            icon: "el-icon-folder",
                            label: '用户服务'
                        },
                        {
                            id: 7,
                            icon: "el-icon-folder",
                            label: '用户服务'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
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
        };
    },
    created(){
        document.addEventListener("contextmenu",function(e){
            e.preventDefault();
            // return false
        })
    },
    methods: {
        handleDragStart(node, ev) {
            console.log('drag start', node);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
            console.log('tree drag enter: ', dropNode.label);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            console.log('tree drag leave: ', dropNode.label);
        },
        handleDragOver(draggingNode, dropNode, ev) {
            console.log('tree drag over: ', dropNode.label);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log('tree drop: ', dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
            if (dropNode.data.label === '二级 3-1') {
                return type !== 'inner';
            } else {
                return true;
            }
        },
        allowDrag(draggingNode) {
            return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
        },
        switchGroup(data){
            console.log("排版",data);
        },
        onImport(){
            // 弹出导入询问框
        },
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
        handleDelete(){
            this.addShow = true;
        },
        onRefresh() {
            console.log('refresh!');
        }
    }
};
</script>