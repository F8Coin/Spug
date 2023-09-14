// 引入mockjs
import Mock from 'mockjs'

// 登录接口

const produceNewsData = function(){
    let listData = [];
    for (let index = 0; index < 20; index++) {
        let itemData = {
            title: "title123",
            content: "内容666",
            createTime: "2022-05-18"
        }
        listData.push(itemData);
    }
    return listData
}

// 请求该url, 就可以返回newsList
Mock.mock('/mock/news',produceNewsData)