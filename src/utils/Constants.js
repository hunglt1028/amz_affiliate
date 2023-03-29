const Constants ={
    title:{
        LOGIN:'Đăng nhập',
        HOME:'Trang chủ',
        FORGOT_PASS:'Quên mật khẩu',
    },
    layout:{
        AUTH:'auth.hbs',
        MAIN:'main.hbs',
        
    },
    page:{
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