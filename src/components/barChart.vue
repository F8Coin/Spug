<template>
    <div class="echartBox" ref="echartBox"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    data(){
        return {}
    },
    props: {
        // 颜色列表
        color: {type: Array, default: () => ['#409EFF','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']},

        // 图表数据
        echartData: {type: Array, default: () => []},
        
        // 图表配置
        barConfig: {type: Object, default: () => {}}
    },
    mounted() {
        this.loadEchart(this.barConfig);
    },
    methods: {
        loadEchart(echartConfig) {
        	// 初始化echarts图表
            const chart = echarts.init(this.$refs.echartBox);
            // 图表的配置项
            chart.setOption({
                legend: echartConfig.legend,
                color: echartConfig.color ? echartConfig.color : this.color,
                series: echartConfig.series,
                tooltip: echartConfig.tooltip,
                grid: echartConfig.grid,
                xAxis: echartConfig.xAxis,
                yAxis: echartConfig.yAxis,
            });
        },

        // 更新echart 视图
        updateChartView() {
            this.loadEchart(this.barConfig);
        }
    },
    watch: {
        barConfig: {
            deep: true,
            handler() {
                this.loadEchart(this.barConfig);
            }
        }
    }
}
</script>

<style lang="less">
    .echartBox {
        height: 300px;
    }
</style>