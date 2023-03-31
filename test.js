const {unicodeToAscii} = require('./src/utils/Common');

const str = '  Xinưerwer234 chào, đây là một chuỗi Tiếng Việt có dấu@.  ';
const buffer =unicodeToAscii(str).replace(/[^\w\s]/gi, '').trim().replace(/\s+/g, '-');

console.log(buffer.toString());