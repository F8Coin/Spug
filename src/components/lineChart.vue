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
        color: {type: Array, default: () => ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']},

        // 图表数据
        echartData: {type: Array, default: () => []},
        
        // 图表配置
        lineConfig: {type: Object, default: () => {}}
    },
    mounted() {
        this.loadEchart(this.lineConfig);
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
            this.loadEchart(this.lineConfig);
        }
    },
    watch: {
        lineConfig: {
            deep: true,
            handler() {
                this.loadEchart(this.lineConfig);
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .echartBox {
        height: 420px;
    }
</style>