<template>
    <div>
        <template v-for="item in routerList">
            <el-submenu v-if="item.hasOwnProperty('children') && item.children.length > 0"
                :key = "item.path"
                :index = "item.path">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </template>
                <!-- 如果有子级数据，使用递归组件 -->
                <Menus :routerList="item.children"></Menus>
            </el-submenu>
            <el-menu-item 
                v-else
                :index= "item.path"
                :key= "item.path">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
            </el-menu-item>    
        </template>    
    </div>
</template>

<script>
export default {
    name: "Menus",
    props: ['routerList']
}
</script>

<style lang="less">

</style>