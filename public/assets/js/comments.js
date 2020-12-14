$.ajax ({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log (response)
        var html = template ('commentsTpl', response)
        console.log (html)
        $ ('#commentBox').html (html)
        var pageHtml = template ('pageTpl', response)
        $ ('#pageBox').html (pageHtml)
    }
})

//实现分页
function changePage(page) {
    $.ajax ({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            console.log (response)
            var html = template ('commentsTpl', response)
            console.log (html)
            $ ('#commentBox').html (html)
            var pageHtml = template ('pageTpl', response)
            $ ('#pageBox').html (pageHtml)
        }
    })
}

// 处理时间日期
function formateDate(date) {
    date = new Date (date)
    return date.getFullYear () + '-' + (date.getMonth () + 1) + '-' + date.getDate ();
}

//当审核按钮被点击的时候
$ ('#commentsBox').on ('click', '.status', function () {
    //获取当前评论的状态
    var status = $ (this).attr ('data-status')
    //获取当前要修改的评论id
    var id = $ (this).attr ('data-id')
    //向服务器端发送请求 更改评论状态
    $.ajax ({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload ();
        }
    })
})

//当删除按钮被点击
$ ('#commentsBox').on ('click', '.delete', function () {
    if (confirm ('确认删除操作')) {
        //获取管理员要删除的评论的id
        var id = $ (this).attr ('data-id')
        $.ajax ({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload ();
            }
        })
    }
})