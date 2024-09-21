const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1 MB
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Only images and PDFs are allowed!');
        }
    }
}).fields([
    { name: 'logo', maxCount: 1 },
    { name: 'companyDocs', maxCount: 10 }
]);

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.files === undefined) {
                res.status(400).send('Error: No File Selected!');
            } else {
                res.send('Your documents will be processed within 24 hours. The status will be updated via email shortly. Thank you!');
            }
        }
    });
});

module.exports = router;
