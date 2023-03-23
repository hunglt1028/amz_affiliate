const multer =require('multer');
const storage = multer.diskStorage({
    destination: (req,file, cb)=>{
        cb(null,'src/uploads');//Đường dẫn lưu ảnh
    },
    filename: (req, file, cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage: storage});
class UploadController{
    uploadImage(){
        return upload.single('upload');
    }
    uploadHandle(req,res){
        try {
            if(!req.file){
                throw new Error('Please select an image to upload');
            }
            //process the uploaded file
            //res.send('File uploaded seccessfully');
            res.status(200).json({
                'fileName':req.file.originalname,
                'uploaded':true,
                'url':'/uploads/'+req.file.originalname
            })
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports =new UploadController;