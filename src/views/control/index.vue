<template>
    <div class="home-page">
        <div class="card_box">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="card_item">
                        <span class="title">应用</span>
                        <p class="text">
                            <span class="count">1</span>
                            <span class="unit">个</span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="card_item">
                        <span class="title">主机</span>
                        <p class="text">
                            <span class="count">2</span>
                            <span class="unit">台</span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="card_item">
                        <span class="title">任务</span>
                        <p class="text">
                            <span class="count">0</span>
                            <span class="unit">个</span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="card_item">
                        <span class="title">监控</span>
                        <p class="text">
                            <span class="count">5</span>
                            <span class="unit">项</span>
                        </p>
                    </div>
                </el-col>
            
            </el-row>
        </div>
        <div class="alarm_box">
            <div class="c_head">
                <span class="title">报警趋势</span>
                <el-cascader
                    class="c_extra"
                    v-model="value"
                    :options="options"
                    @change="handleChange">
                </el-cascader>
            </div>
            <div class="c_body">
                <lineChart :lineConfig="lineConfig"></lineChart>
            </div>
        </div>
        <div class="chart_box">
            <div class="l_chart">
                <div class="h_content clearfix">
                    <span class="title">发布申请TOP10</span>
                    <div class="date_select">
                        <el-date-picker
                            v-model="dateTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div class="date_btn">
                        <el-radio-group v-model="dataType">
                            <el-radio-button label="今日"></el-radio-button>
                            <el-radio-button label="本周"></el-radio-button>
                            <el-radio-button label="本月"></el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="c_content">
                    <barChart :barConfig="barConfig"></barChart>
                </div>
            </div>
            <div class="r_chart">
                <div class="h_content">
                    <div class="title">最近30天登录</div>
                </div>
                <div class="c_content">
                    <ul class="infinite-list logBox" v-infinite-scroll="load" style="overflow:auto">
                        <li v-for="i in count" :key="i" class="infinite-list-item logLine">
                            <span class="time">07-28 15:45:35</span>
                            <span class="role">管理员</span>
                            <span class="checkState">通过</span>
                            <span class="Ip">1.1.1.1</span>
                            <span class="logText">登录</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list: [],
            value: [],
            options: [
                {
                    value: '1',
                    label: '站点检测',
                    children: [{
                        value: '1-1',
                        label: 'spug官网'
                    }]
                },
                {
                    value: '2',
                    label: '端口检测',
                    children: [{
                        value: '2-1',
                        label: 'ssh端口',
                    }]
                }
            ],
            dataType: "今日",
            dateTime: "",
            count: 0,
            myChart: null,
            lineConfig: {
                color: ['#409EFF'],
                grid: {
                    left: '4%',
                    right: '2%'
                },
                tooltip: {
                    trigger: "axis",
                    formatter: `{b0} <br> {a0}: {c0} 次`,
                    backgroundColor: "#eee",
                    textStyle: {
                        color: "#666",
                        fontSize: 12
                    } 
                },
                xAxis: {
                    boundaryGap: false, // 坐标轴两边是否留白，默认为true
                    axisLine: {
                        lineStyle: {color: '#409EFF'},
                    },
                    axisTick: {
                        inside: true,
                        lineStyle: {
                            color: '#409EFF',
                            width: '2'
                        }
                    },
                    axisLabel: {color: '#000000'},
                    axisPointer: {
                        show: true, 
                        type: 'line',
                        lineStyle: {
                            color: "#ddd",
                            width: "2"
                        }
                    },
                    type: 'category',
                    data: ['12.01', '12.02', '12.03', '12.04', '12.05', '12.06', '12.07']
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        inside: true
                    },
                    axisLabel: {
                       formatter: `{value} 次` 
                    }
                },
                series: [
                    {
                        name: '报警次数',
                        type: 'line', //类型：折线图
                        // 数据源
                        data: [19, 24, 21, 20, 30, 26, 31],
                        tooltip: {
                            trigger: "axis",
                            show: true
                        }
                    }
                ]
            },
            barConfig: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    barWidth: "40"
                }]
            }
        }
    },
    components: {
        lineChart: () => import('@/components/lineChart'),
        barChart: () => import('@/components/barChart')
    },
    created(){
        
    },
    mounted(){
        // this.getList();
    },
    methods: {
        handleChange(){
            console.log("触发了")
        },
        load () {
            this.count += 2
        },
        getList(){
            let _this = this
            this.$axios.get('/mock/news').then(res => {
                // url 即在mock.js中定义的
                _this.list= res.data;
                console.log("data:" , res.data);
            })
        }
    }
}
</script>


<style lang="less">
    .home-page {
        .card_box {
            .card_item {
                height: 120px;
                padding: 20px;
                border-radius: 6px;
                box-sizing: border-box;
                box-shadow: 2px 2px 2px 2px @bg_color_bbb;
                background-color: @bg_color_fff;
                .title {
                    font-size: 16px;
                    color: @text_color_666;
                }
                .text {
                    .count {
                        font-size: 24px;
                        cursor: pointer;
                        color: @text_color_active;
                    }
                    .unit {
                        font-size: 16px;
                        margin-left: 6px;
                        color: @text_color_555;
                    }
                }
            }
        }
        .alarm_box {
            height: 480px;
            border-radius: 6px;
            margin-top: 20px;
            box-sizing: border-box;
            background-color: @bg_color_fff;
            border: 1px solid @bd_color_ddd;
            .c_head {
                height: 42px;
                line-height: 42px;
                padding: 8px 20px;
                border-bottom: 1px solid @bd_color_ddd;
                .c_extra {
                    float: right;
                }
            }
            .c_body {
                .chart {
                    height: 420px
                }
            }
        }
        .chart_box {
            margin-top: 20px;
            .l_chart {
                height: 420px;
                width: 60%;
                float: left;
                border-radius: 6px;
                padding: 20px;
                box-sizing: border-box;
                background-color: @bg_color_fff;
                border: 1px solid @bd_color_ddd;
                .h_content {
                    padding-bottom: 12px;
                    border-bottom: 1px solid @bd_color_ddd;
                    .title {
                        float: left;
                        font-size: 16px;
                        color: @text_color_555;
                    }
                    .date_btn {
                        float: right;
                        margin-right: 20px;
                    }
                    .date_select {
                        float: right;
                    }
                }
                .c_content {
                    margin-top: 20px;
                }
            }
            .r_chart {
                height: 420px;
                margin-left: 61%;
                border-radius: 6px;
                padding: 20px;
                box-sizing: border-box;
                background-color: @bg_color_fff;
                border: 1px solid @bd_color_ddd;
                .h_content {
                    .title {
                        font-size: 16px;
                        color: @text_color_555;
                        padding-bottom: 12px;
                        border-bottom: 1px solid @bd_color_ddd;
                    }
                }
                .c_content {
                    margin-top: 20px;
                    height: 320px;
                    overflow: auto;
                    background-color: @bg_color_fff;
                    .logBox {
                        padding-left: 0px;
                        .logLine {
                            line-height: 32px;
                            list-style: none;
                            font-size: 14px;
                            cursor: pointer;
                            .time {
                                color: @text_color_555;
                            }
                            .role {
                                color: @text_color_active;
                                margin: 0px 6px;
                            }
                            .checkState {
                                color: @text_color_555;
                            }
                            .Ip {
                                color: @text_color_active;
                                margin: 0px 6px;
                            }
                            .logText {
                                color: @text_color_555;
                            }
                        }
                    }
                }
            }
        }
    }
</style>