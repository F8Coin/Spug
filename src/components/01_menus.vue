<template>
    <div>
        <template v-for="item in routerList">
            <el-submenu v-if="item.hasOwnProperty('children') && item.children.length>0" :key="item.name" :index="item.path">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                </template>
                <Menus :routerList="item.children"></Menus>
            </el-submenu>
            <el-menu-item v-else :key="item.name" :index="item.path">
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