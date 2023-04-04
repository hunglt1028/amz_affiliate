const Constants ={
    title:{
        LOGIN:'Đăng nhập',
        HOME:'Trang chủ',
        FORGOT_PASS:'Quên mật khẩu',
        DASHBOARD_CATEGORY:'Chuyên mục',
        DASHBOARD_TAG:'Thẻ'
    },
    layout:{
        AUTH:'auth.hbs',
        MAIN:'main.hbs',
        DASHBOARD:'dashboard.hbs',
    },
    page:{
        DASHBOARD_TAG:'dashboard/tags',
        DASHBOARD_CATEGORY:'dashboard/category',
        LOGIN:'./auth/login',
        FORGOT_PASS:'auth/forgot_password',
        HOME:'home'
    },
    redirect:{
        DASHBOARD:'/dashboard',
        LOGIN:'/auth/login',
        HOME:'/'
    }
}
module.exports = Constants;