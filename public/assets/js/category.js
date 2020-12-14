//当添加分类表单发生提交行为的时候
$ ('#addCategory').on ('submit', function () {
    //
    var formData = $ (this).serialize ();
    //向服务器端发送请求 添加分类
    $.ajax ({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload ()
        }
    })
    return false
})
//发送ajax情趣  向服务器端索要分类列表数据
$.ajax ({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // 将服务器端返回的数据和HTML模板进行拼接
        var html = template ('categoryListTpl', {data: response})
        //将拼接好的内容放到页面中
        $ ('#categoryBox').html (html)
    }
})
//为编辑按钮添加点击事件
$ ('#categoryBox').on ('click', '.edit', function () {
    var id = $ (this).attr ('data-id')
    $.ajax ({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {

            var html = template ('modifyCategoryTpl', response)
            $ ('#formBox').html (html)
        }
    })
})
//当修改分类数据表单发生提交行为的时候
$ ('#formBox').on ('submit', '#modifyCategory', function () {
    //获取管理员在表单中输入的内容
    var formData = $ (this).serialize ();
    //获取要修改的分类id
    var id = $ (this).attr ('data-id');
    //发送情趣  修改分类数据
    $.ajax ({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload ();
        }
    })
    return false;
})
//添加点击删除事件
$ ('#categoryBox').on ('click', '.delete', function () {
    if (confirm ('确认删除操作')) {
        //获取要删除的分类数据id
        var id = $ (this).attr ('data-id')
        //向服务器端发送请求 删除分类数据
        $.ajax ({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload ()
            }
        })
    }

    return false;
})