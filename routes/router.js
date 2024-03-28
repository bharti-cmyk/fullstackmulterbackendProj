const express = require('express');
const router = new express.Router();
const multer = require('multer');
const users = require('../model/userSchema');
const moment = require('moment');
const imgconfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.originalname}`);
    }
});

const isImage = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else{
        cb(new Error("Only Images are supported"));
    }
}
const upload = multer({
    storage: imgconfig,
    fileFilter:isImage
})
router.post('/api/register', upload.single('photo'),async (req, res) => {
    const filename = req.file.filename;
    const fname = req.body.name;

    if(!filename && !fname) {
        res.status(401).json({status:'401', message:'fill in missing data'});
    }

    try{
        const userdata = new users({
            fname: fname,
            imgpath: filename,
            date: moment(new Date).format('YYYY-MM-DD')
        })

        const finaldata = await userdata.save();
        res.status(200).json({status:'200', message:finaldata});
    }
    catch(err){
        res.status(401).json({status:'401', message:err.message});
    }
});

router.get("/api/getdata", async(req,res) => {
    try{
        const getUser = await users.find();
        res.status(200).json({status:'200', getUser});
    }
    catch(err){
        res.status(401).json({status:'401', err});
    }
})

router.delete("/api/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const deleteUser = await users.findByIdAndDelete({_id:id});
        res.status(200).json({status:'200', deleteUser});
    }
    catch(err){
        res.status(401).json({status:'401', err});
    }
});

module.exports = router;