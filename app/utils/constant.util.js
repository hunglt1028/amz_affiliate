const Constants ={
    title:{
        LOGIN:'Đăng nhập',
        HOME:'Trang chủ',
        FORGOT_PASS:'Quên mật khẩu',
        ADMIN_CATEGORY:'Chuyên mục',
        ADMIN_TAG:'Thẻ',
        ADMIN_TAG_UPDATE:'Cập nhật thẻ'
    },
    layout:{
        LOGIN:'login.hbs',
        MAIN:'main.hbs',
        ADMIN:'admin.hbs',
    },
    page:{
        ADMIN:'admin/index',
        ADMIN_TAG:'admin/tag/index',
        ADMIN_TAG_UPDATE:'admin/tag/update',
        ADMIN_CATEGORY:'admin/cat/index',
        LOGIN:'./login/index',
        FORGOT_PASS:'/login/forgot_password',
        HOME:'home'
    },
    redirect:{
        ADMIN:'/admin',
        LOGIN:'/login',
        HOME:'/',
        ADMIN_TAGS:'/admin/tag'
    }
}
module.exports = Constants;