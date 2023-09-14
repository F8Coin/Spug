<template>
    <div>
        <div class="layer" v-if="visible">
            <div class="layer-content" @keypress.enter="confirmEmit($event)" :style="layerStyle" :ref="'layer' + timespan" :id="'layer' + timespan">
                <div class="head" @mousedown="layerMouseDown($event)" @mouseup="layerMouseUp($event)">
                    <i class="iconfont title-icon" :class="data['iconfont'] || iconType[data['iconType']] || data['iconType'] || iconType['add']"></i>
                    <span class="t">{{data.title}}</span>
                </div>
                <div class="l-cnt" :style="{height: (height || data.height) ? (((height || data.height) / 10)+'rem') : 'auto',width:(width || data.width || 700) ? (((width || data.width || 700) / 10 ) +'rem') : 'auto'}">
                    <slot></slot>
                </div>
                <div class="l-btn">
                    <div class="btn-left">
                        <slot name="bottom_left"></slot>
                    </div>

                    <div class="btn-right">
                        <template v-if="data.defaultButton != false">
                            <input type="button" :value="data.cancelButtonText || '取消'" class="cancel blueview-grey-btn" v-myfocus="isConfirmBtn == false" @click="cancel()"/>
                            <input type="button" :value="data.confirmButtonText || '确定'" class="confirm blueview-default-btn" v-if="isConfirmBtn != false" @click="confirmEmit()"/>
                        </template>
                        <slot name="operate"></slot>
                    </div>
                </div>
                <i class="iconfont icon-guanbi layer-close" @click="cancel()"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Layer",
        props:['height','width'],
        data(){
            return{
                visible:false,
                data:{},
                isConfirmBtn:null,
                timespan:+new Date(),
                layerStyle:{},
                sub_xy:{},
                iconType:{
                    add:'icon-tianjia', // 添加
                    edit:'icon-xiugai', // 修改
                    config:'icon-peizhi', // 配置
                    manage:'icon-guanli', // 管理
                    view:'icon-yulan', // 预览
                    password:'icon-mima', // 密码
                    common:'icon-dankuang', // 通用
                    clear:'icon-qingchu', // 清除
                    discove:'icon-shebeifaxian', // 发现
                    alarm:'icon-gaojingliebiao', // 告警
                    utilization:'icon-guzhangshuai', // 带宽利用率
                    copy:'icon-copy', // 复制
                    delete:'icon-shanchushebei', // 删除
                    order:'icon-paidan', // 派单
                }
            }
        },
        methods:{
            show(data){ // 显示
                this.data = data
                this.visible = true
                this.isConfirmBtn = data.isConfirmBtn
            },
            confirmEmit(e){ // 确定回调
                if(e && e.target.nodeName == 'TEXTAREA'){
                    return
                }
                this.data.confirm && this.data.confirm()
            },
            cancel(){ // 取消
                this.visible = false
                this.layerStyle = {}
                this.data.cancel && this.data.cancel()
            },
            layerMouseDown(ev){

                let dialog_xy = {
                    x:this.$refs['layer' + this.timespan].offsetLeft,
                    y:this.$refs['layer' + this.timespan].offsetTop
                }

                let mouse_xy = {
                    x:ev.clientX,
                    y:ev.clientY
                }

                this.sub_xy = {
                    x:mouse_xy.x - dialog_xy.x,
                    y:mouse_xy.y - dialog_xy.y,
                }

                this.layerStyle = {
                    position:'absolute',
                    top:dialog_xy.y + 'px',
                    left:dialog_xy.x + 'px'
                }

                document.addEventListener('mousemove',this.layerMouseMove,false)

            },
            layerMouseUp(ev){
                document.removeEventListener('mousemove',this.layerMouseMove,false)
            },
            layerMouseMove(ev){
                let mouse_xy = {
                    x:ev.clientX,
                    y:ev.clientY
                }

                let dialog_xy = {
                    x:mouse_xy.x - this.sub_xy.x,
                    y:mouse_xy.y - this.sub_xy.y
                }

                this.layerStyle = {
                    position:'absolute',
                    top:dialog_xy.y + 'px',
                    left:dialog_xy.x + 'px'
                }
            }
        }
    }
</script>

<style scoped >
    .layer{ background: rgba(0,0,0,0.1); display: flex; position: fixed; z-index: 2010; width: 100%; height: 100%; top:0; left:0; align-items: center; justify-content: center;}
    .layer .layer-content{ background: #fff; border-radius: 8px;  position: relative; overflow: hidden;}
    .layer .layer-content .head{ display: flex; align-items: center; padding-left: 2rem; height: 5rem; background:#fff; background-size:18.6rem 5rem;  cursor: move;}
    .layer .layer-content .head .t{ font-size: 1.6rem; font-weight: bold; margin-left: 0.7rem; color: #333; flex: 1;}

    .layer .layer-content .l-cnt{ padding: 3rem 2rem 2rem 2rem; font-size:1.2rem; max-height: 60vh; overflow: auto;}
    .layer .layer-content .l-btn{ display: flex; justify-content: space-between; padding: 2rem; }
    .layer .layer-content .l-btn .cancel{ margin-left:10px; padding:0 2.4rem; }
    .layer .layer-content .l-btn .cancel:hover{ opacity: 0.9;}
    .layer .layer-content .l-btn .confirm{ margin-left:2rem; padding:0 2.4rem; }
    .layer .layer-content .l-btn .btn-left{ display: flex; align-items: center;}
    .layer .layer-content .layer-close{ position: absolute; right: 1.7rem; top:1.6rem; font-size: 1.8rem; color:#666;}

    .form-list{ padding: 0; margin: 0; border-top:0;}
    .layer .title-icon{ font-size: 2rem; color: #333; margin-top: 2px;}
</style>
