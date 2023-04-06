const Constants ={
    title:{
        LOGIN:'Đăng nhập',
        HOME:'Trang chủ',
        FORGOT_PASS:'Quên mật khẩu',
        ADMIN_CATEGORY:'Chuyên mục',
        ADMIN_TAG:'Thẻ'
    },
    layout:{
        LOGIN:'login.hbs',
        MAIN:'main.hbs',
        ADMIN:'admin.hbs',
    },
    page:{
        ADMIN:'admin/index',
        ADMIN_TAG:'admin/tag/index',
        ADMIN_CATEGORY:'admin/category',
        LOGIN:'./login/index',
        FORGOT_PASS:'/login/forgot_password',
        HOME:'home'
    },
    redirect:{
        ADMIN:'/admin',
        LOGIN:'/login',
        HOME:'/',
        ADMIN_TAGS:'/admin/tags'
    }
}
module.exports = Constants;