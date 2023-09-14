<template>
    <div class="homePage">
        <el-row :gutter="20" class="row_bg">
            <el-col :span="16">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                    </div>
                    <div class="text item">
                        <el-empty :image-size="100" description="暂无数据"></el-empty>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>系统公告</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="editNotice">编辑</el-button>
                    </div>
                    <!-- 非-折叠面板 -->
                    <div class="text notice_item hider_none">
                        <span class="icon el-icon-caret-right"></span>
                        <span class="content">Spug3.0更新概要</span>
                        <span class="date">2023-03-31</span>
                    </div>
                    <div class="text notice_item hider_none">
                        <span class="icon el-icon-caret-right"></span>
                        <span class="content">3.0工作计划</span>
                        <span class="date">2023-03-31</span>
                    </div>
                    <div class="text notice_item hider_none">
                        <span class="icon el-icon-caret-right"></span>
                        <span class="content">建设进度跟踪和反馈平台</span>
                        <span class="date">2023-03-31</span>
                    </div>
                    <!-- 折叠面板 -->
                    <el-collapse accordion @change="handleChange" class="hider_none">
                        <el-collapse-item name="id-1">
                            <template slot="title">
                                <span class="icon el-icon-caret-right"></span>
                                <span class="content">Spug3.0更新概要</span>
                                <span class="date">2023-03-31</span>
                            </template>
                            <div>公告内容： Spug3.0更新概要</div>
                        </el-collapse-item>
                        <el-collapse-item class="dev_notice_item" name="id-2">
                            <template slot="title">
                                <span class="icon el-icon-caret-right"></span>
                                <span class="content">3.0工作计划</span>
                                <span class="date">2023-03-31</span>
                            </template>
                            <div>公告内容： 3.0工作计划</div>
                        </el-collapse-item>
                        <el-collapse-item class="dev_notice_item" name="id-3">
                            <template slot="title">
                                <span class="icon el-icon-caret-right"></span>
                                <span class="content">建设进度跟踪和反馈平台</span>
                                <span class="date">2023-03-31</span>
                            </template>
                            <div>公告内容： 建设进度跟踪和反馈平台</div>
                        </el-collapse-item>
                    </el-collapse>
                    <!-- 无限滚动 -->
                    <div class="infinite-list-wrapper" style="overflow:auto">
                        <ul
                        class="list"
                        v-infinite-scroll="load"
                        infinite-scroll-disabled="disabled">
                            <li class="list-item dev_notice_item">
                                <span class="icon el-icon-caret-right"></span>
                                <span class="content">建设进度跟踪和反馈平台</span>
                                <span class="date">2023-03-31</span>
                            </li>
                            <li class="list-item dev_notice_item">
                                <span class="icon el-icon-caret-right"></span>
                                <span class="content">3.0工作计划</span>
                                <span class="date">2023-03-31</span>
                            </li>
                            <li class="list-item dev_notice_item">
                                <span class="icon el-icon-caret-right"></span>
                                <span class="content">建设进度跟踪和反馈平台,建设进度跟踪和反馈平台,建设进度跟踪和反馈平台,建设进度跟踪和反馈平台</span>
                                <span class="date">2023-03-31</span>
                            </li>
                            <li v-for="(i,index) in count" class="list-item dev_notice_item" :key="index">
                                <span class="icon el-icon-caret-right"></span>
                                <span class="content">公告内容{{ i }}</span>
                                <span class="date">2023-03-31</span>
                            </li>
                        </ul>
                        <p v-if="loading" style="text-align:center;color:#999">加载中...</p>
                        <p v-if="noMore" style="text-align:center;color:#999">没有更多了</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="row_bg">
            <el-col :span="24">
                <el-card class="box-card box-guide">
                    <div slot="header" class="clearfix">
                        <span>便捷导航</span>
                        <el-button style="float: right; padding: 3px 0" type="text" >编辑</el-button>
                    </div>
                    <div class="text item">
                        <el-row :gutter="20">
                          <el-col :span="6" v-for="(item,index) in guideList" :key="index">
                              <el-card shadow="hover" class="guide_item" draggable="true" @dragstart="dragstart(index)" @dragenter="dragenter($event,index)" @dragover="dragover($event,index)">
                                <div class="top">
                                    <div class="top_l">
                                      <img :src="item.imgSrc" class="guide_img">
                                    </div>
                                    <div class="top_r guide_detail">
                                        <span class="title">{{ item.title }}</span>
                                        <div class="description">{{ item.description }}</div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <el-button type="text" class="button" v-for="(buttonItem,buttonIndex) in item.buttonArr" :key="buttonIndex">{{buttonItem.name}}</el-button>
                                </div>
                              </el-card>
                          </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            count: 10,
            loading: false,
            guideList: [
              {id:"1",title:"GitLab",imgSrc:require('../../assets/img/gitlab.png'),description:"代码托管平台",buttonArr:[{name:"访问地址",linkSrc:""}]},
              {id:"2",title:"WIKI",imgSrc:require('../../assets/img/wiki.png'),description:"灵活、强大、易用的运维管理平台",buttonArr:[{name:"演示地址",linkSrc:""},{name:"官方文档",linkSrc:""}]},
              {id:"3",title:"GitLab",imgSrc:require('../../assets/img/gitlab.png'),description:"代码托管平台",buttonArr:[{name:"访问地址",linkSrc:""}]},
              {id:"4",title:"WIKI",imgSrc:require('../../assets/img/wiki.png'),description:"灵活、强大、易用的运维管理平台",buttonArr:[{name:"演示地址",linkSrc:""},{name:"官方文档",linkSrc:""}]},
              {id:"5",title:"GitLab",imgSrc:require('../../assets/img/gitlab.png'),description:"代码托管平台",buttonArr:[{name:"访问地址",linkSrc:""}]}
            ],
            dragIndex: "",
            enterIndex: "",
            timeout: null
        }
    },
    computed: {
        noMore(){
            return this.count >= 20
        },
        disabled(){
            return this.loading || this.noMore
        }
    },
    destroyed(){
      clearTimeout(this.timeout);
      this.timeout = null;
    },
    methods: {
        handleChange(name){
            console.log("id",name); // 公告Id
        },
        load(){ // 加载公共
            this.loading = true;
            setTimeout(() => {
                this.count +=2
                this.loading = false;
            },2000)
        },
        editNotice(){ // 编辑公告

        },
        dragstart(index){
          console.log("index",123);
          this.dragIndex = index;
        },
        // dragenter  和 dragover 事件的默认行为是拒绝接受任何被拖放的元素
        // 因此，我们要在这两个拖放事件中使用 preventDefault 来阻止浏览器的默认行为
        dragenter(e,index){
          e.preventDefault();
          // this.enterIndex = index;
          // if(this.timeout !== null){
          //   clearTimeout(this.timeout)
          // }
          // // 拖拽事件的防抖
          // this.timeout = setTimeout(() => {
          //   if(this.dragIndex !== index){
          //     const source = this.guideList[this.dragIndex];
          //     this.guideList.splice(this.dragIndex,1);
          //     this.guideList.splice(index,0,source);
          //     this.dragIndex = index;
          //   }
          // },100)
        },
        dragover(e,index){
          e.preventDefault();
        }
    }
}
</script>


<style lang="less">
.hider_none {
    display: none;
}
.homePage {
    .row_bg {
        padding: 10px 0px;
        .notice_item { // 非-折叠面板（公告）
            height: 48px;
            line-height: 48px;
            border-bottom: 1px solid #ddd;
            .icon {
                font-size: 16px;
                color: #555;
                margin-right: 6px;
            }
            .date {
                float: right;
                color: #999;
            }
        }
        .el-collapse-item__header { // 折叠面板（公告）
            .icon {
                font-size: 16px;
                color: #555;
                margin-right: 6px;
            }
            .date {
                margin-left: 20px;
                color: #999;
            }
        }
        .infinite-list-wrapper { // 无限滚动 （公告）
            height: 226px;
            .list {
              padding-left: 0px;
              .dev_notice_item {
                  height: 48px;
                  line-height: 48px;
                  border-bottom: 1px solid #ddd;
                  list-style: none;
                  .icon {
                      vertical-align: middle;
                      font-size: 16px;
                      color: #555;
                      margin-right: 6px;
                  }
                  .content {
                      display: inline-block;
                      vertical-align: middle;
                      // 超长标题处理... 
                      width: 240px;
                      white-space:nowrap;
                      overflow:hidden;
                      text-overflow:ellipsis   
                  }
                  .date {
                      vertical-align: middle;
                      float: right;
                      color: #999;
                  }
              }
            }
        }
        .box-guide {
            .guide_item {
                width: 350px;
                .el-card__body {
                    padding-bottom: 0px;
                    .top {
                      cursor: move;
                      .top_l {
                        float: left;
                        .guide_img {
                            width: 40px;
                            margin: 0 auto;
                        }
                      }
                      .top_r {
                        height: 160px;
                        margin-left: 20%;
                        .title {
                            font-size: 14px;
                            font-weight: 600;
                        }
                        .description {
                            font-size: 12px;
                            color: #999;
                            line-height: 24px;
                            height: 120px;
                        }
                      }
                    }
                    .bottom {
                        border-top: 1px solid #ddd;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        justify-content: space-between;
                        .button {
                            color: #999;
                            width: 100%;
                            text-align: center;
                            font-size: 14px;
                        }
                        .button:hover {
                          color: #000;
                        }
                    }
                }
            }
        }
    }
}
</style>