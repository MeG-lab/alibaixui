//获取地址栏中文章id
var postId = getUrlParams ('id')
//评论是否经过人工审核
var review;
//向服务器端发送请求 根据文章id获取文章的详细信息
$.ajax ({
    type: 'get',
    url: '/posts/' + postId,
    success: function (response) {
        console.log (response)
        var html = template ('postTpl', response)
        console.log (html)
        $ ('#article').html (html)
    }
})
$ ('#article').on ('click', '#like', function () {

    //发送请求点赞
    $.ajax ({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function () {
            alert ('赞')
        }
    })


})
// 获取网站的配置信息
$.ajax ({
    type: 'get',
    url: '/settings',
    success: function (response) {
        review = response.review;
        if (response.comment) {
            var html = template ('commentTpl')
            $ ('#comment').html (html)

        }
    }
})
//提交评论
$ ('#comment').on ('submit', 'form', function () {
    // 获取用户输入的评论内容
    var content = $ (this).find ('textarea').val ()
    var state;
    if (review) {
        //要经过人工审核
        state = 0
    } else {
//不需要经过人工审核
        state = 1
    }
    //发送请求，执行添加评论操作
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            content:content,
            post:postId,
            state:state
        },
        success:function () {
        alert('评论发布成功')
            location.reload();
        },
        error:function () {
            alert('评论发布失败')
        }
    })
    return false
})