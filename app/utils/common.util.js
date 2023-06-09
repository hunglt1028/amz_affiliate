const unicode_to_ascii = (str) => {
    //xóa các từ tiếng việt
    if (!str || typeof str !== 'string') return '';
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
};
const slug_convert=(str)=>{
    //xóa tiếng việt, xóa ký tự đặc biệt, xóa khoảng 2 đầu, thay khoảng trắng bằng dấu -
    return unicode_to_ascii(str).replace(/[^\w\s-]/gi, '').trim().replace(/\s+/g, '-');
}
const isNotPaged = (value)=>{
    return isNaN(value) || value <= 0;
  }
module.exports={unicode_to_ascii,slug_convert,isNotPaged};