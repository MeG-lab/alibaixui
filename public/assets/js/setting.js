$ ('#logo').on ('change', function () {
    //获取到管理员选择到的文件
    var file = this.files[0];

    var formData = new FormData ();

    //将管理员选择到的文件添加到formData对象中
    formData.append ('logo', file)
    $.ajax ({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log (response)
            $ ('#hiddenLogo').val (response[0].logo)
            $ ('#preview').attr ('src', response[0].logo)
        }
    })
})

$ ('#settingsForm').on ('submit', function () {
    //获取表单中输入的内容、
    var formData = $ (this).serialize ();
    //向服务器端发送请求 实现网络设置数据添加功能
    $.ajax ({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function () {
            location.reload ();
        }
    })
    return false;
})

$.ajax ({
    type: 'get',
    url: '/settings',
    success: function (response) {
        console.log (response)
        if (response) {
            //将logo地址存储在隐藏域中
            $ ('#hiddenLogo').val (response.logo)
            //将logo显示在页面中
            $ ('#preview').attr ('src', response.logo)
            //将网站标题显示在页面中
            $ ('input[name="title"]').val (response.title)
            //将是否开启评论功能显示在页面中
            $ ('input[name="comment"]').prop ('checked', response.comment)
            //将评论是否经过人工审核显示在页面中
            $ ('input[name="review"]').prop ('checked', response.review)
        }
    }
})