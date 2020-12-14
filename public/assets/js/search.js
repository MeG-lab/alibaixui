//获取到浏览器的地址栏中的查询参数
var key=getUrlParams('key')

//根据关键字调用搜索接口
$.ajax({

    type:'get',
    url:'/posts/search/'+key,
    success:function (response) {
        // console.log (response)
     var html=   template('searchTpl',{data:response})
        $('#listBox').html(html)
    }

})