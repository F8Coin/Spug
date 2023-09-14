<template>
    <div>
        <el-menu router>
            <Menus :routerList="menuData"></Menus>
        </el-menu>
    </div>
</template>


<script>
import Menus from './01_menus.vue'
export default {
    name: "sideMenu",
    data(){
        return {
            menuData: [
                {name:"列表",path:"",icon:"",children:[]},
                {name:"搜索",path:"",icon:"",children:[]}
            ]
        }
    },
    components: {
        Menus
    }
}
</script>