//向服务器端发送请求 获取文章列表数据
$.ajax ({
    type: 'get',
    url: '/posts',
    success: function (response) {
        // console.log (response)
        var html = template ('postsTpl', response)
        // console.log (html)
        $ ('#postsBox').html (html)

        var page = template ('pageTpl', response)

        $ ('#page').html (page)
    }
})

// 处理时间日期
function formateDate(date) {
    date = new Date (date)
    return date.getFullYear () + '-' + (date.getMonth () + 1) + '-' + date.getDate ();
}

//分页
function changePage(page) {
    $.ajax ({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            // console.log (response)
            var html = template ('postsTpl', response)
            // console.log (html)
            $ ('#postsBox').html (html)

            var page = template ('pageTpl', response)

            $ ('#page').html (page)
        }
    })
}

//向服务器索要发送请求，文章分类数据
$.ajax ({
    type: 'get',
    url: '/categories',
    success: function (response) {
        console.log (response)
        var html = template ('categoryTpl', {data: response})
        $ ('#categoryBox').html (html)
    }
})

// 当添加文章表单提交的时候
$ ('#filterForm').on ('submit', function () {
    //获取到管理员选择的过滤条件
    var formData = $ (this).serialize ()
    //向服务器端发送请求 根据条件索要文章列表数据
    $.ajax ({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            var html = template ('postsTpl', response)
            $ ('#postsBox').html (html)
            var page = template ('pageTpl', response)
            $ ('#page').html (page)
        }
    })
    return false;
})

//当删除按钮被点击的时候
$ ('#postsBox').on ('click', '.delete', function () {

    //弹出确认
    if (confirm ('是否确认删除')) {
        var id = $ (this).attr ('data-id')
        $.ajax({
            type:'delete',
            url:'/posts/'+id,
            success:function () {
                location.reload();
            }
        })
        console.log (id)
    }

    return false
})


