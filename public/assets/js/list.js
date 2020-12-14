//获取地址栏中的categoryId参数
var categoryId = getUrlParams ('categoryId')
//根据id获取文章列表
$.ajax ({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function (response) {
        console.log (response)
        var html =  template ('listTpl', {data: response});
        console.log (html)
        $('#listBox').html(html)
    }
})
$.ajax({
    type: 'get',
    url:'/categories/'+categoryId,
    success:function (response) {
        $('#categoryTitle').html(response.title)
    }
})