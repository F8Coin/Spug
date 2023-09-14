<template>
  <transition-group class="list">
    <ul
      @dragstart= "dragstart(index)"
      @dragenter= "dragenter($event,index)"
      @dragover= "dragover($event,index)"
      draggable= "true"
      v-for= "item in list"
      :key= "item.label"
      class= "item-list"
    >
      {{ item.label }}
    </ul>
  </transition-group>
</template>

<script>
export default {
  data(){
    return {
      list: [
        {label:"列表1"},
        {label:"列表2"},
        {label:"列表3"},
        {label:"列表4"},
        {label:"列表5"},
        {label:"列表6"},
        {label:"列表7"}
      ],
      dragIndex: "",
      enterIndex: "",
      timeout: null
    }
  },
  destroyed(){
    clearTimeout(this.timeout);
    this.timeout = null;
  },
  methods: {
    dragstart(index){
      this.dragIndex = index;
    },
    dragenter(e,index){
      e.preventDefault();
      this.enterIndex = index;
      if(this.timeout !== null){
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        if(this.dragIndex !== index){
          const source = this.list[this.dragIndex];
          this.list.splice(this.dragIndex,1);
          this.list.splice(index,0,source);
          this.dragIndex = index;
        }
      },100)
    },
    dragover(e,index){
      e.preventDefault();
    }
  }
}
</script>

<style lang="less">
  .list {
    list-style: none;
    .list-item {
      transition: transform .3s;
      cursor: move;
      width: 300px;
      background-color: #EA6E59;
      border-radius: 4px;
      color: #FFF;
      margin-bottom: 6px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
  }
</style>