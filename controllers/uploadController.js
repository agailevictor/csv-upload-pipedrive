// const path = require('path');
// const sharp = require('sharp');
// const uuidv4 = require('uuid/v4');
var fileSupported = ['image/png', 'image/jpeg', 'image/jpg'];
var config = require('../config/config');
// var sizeOf = require('image-size');
var fs = require('fs');
var csvParser = require('csv-parse');

var upload = {
    // async uploadPicture(req, res) {

    //     if (req.file && fileSupported.includes(req.file.mimetype)) {
    //         const imagePath = path.join(__dirname, '../' + config.upload_path);
    //         const tPath = path.join(__dirname, '../' + config.thumb_path);
    //         const filename = req.file.originalname;
    //         const filepath = path.resolve(`${imagePath}/${filename}`);
    //         const thumbpath1 = path.resolve(`${tPath}/${filename}-${uuidv4()}.png`);
    //         const thumbpath2 = path.resolve(`${tPath}/${filename}-${uuidv4()}.png`);
    //         const hostPath = req.protocol + '://' + req.get('host') + '/uploads/' + filename;

    //         try {
    //             var response_upload = await sharp(req.file.buffer)
    //                 .toFile(filepath);
    //             if (response_upload) {

    //                 var dimensions = sizeOf(filepath);
    //                 if (dimensions.width >= 128 && dimensions.height >= 128) {
    //                     var res_thumb1 = await sharp(req.file.buffer)
    //                         .resize(dimensions.width / 2, dimensions.height / 2, {
    //                             fit: sharp.fit.inside,
    //                             withoutEnlargement: true
    //                         }).toFile(thumbpath1);
    //                     var res_thumb2 = await sharp(req.file.buffer)
    //                         .resize(dimensions.width / 4, dimensions.height / 4, {
    //                             fit: sharp.fit.inside,
    //                             withoutEnlargement: true
    //                         }).toFile(thumbpath2);
    //                 }

    //                 var pictureInfo = {
    //                     "picture_name": req.file.originalname,
    //                     "uploaded_url": hostPath
    //                 }

    //                 var responseDic = {
    //                     "status": "Success",
    //                     "data": pictureInfo
    //                 }

    //                 res.status(200).json(responseDic);

    //             } else {
    //                 res.status(400).json({ error: 'Image Upload failed' });
    //             }
    //         } catch (e) {
    //             console.log(e);
    //             res.status(401).json({ error: 'Please upload a valid image file' });
    //         }
    //     } else {
    //         res.status(401).json({ error: 'Please upload a valid image file' });
    //     }
    // },

    csvUpload(req, res) {
        var dataFormatted = [];
        if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
        fs.readFile(req.files.file.tempFilePath, function (err, csvData) {
            // Do something with the csvDatas (which holds the file information)
            csvParser(csvData, {
                delimiter: ','
            }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    data.forEach(x => {
                        dataFormatted.push(x[1])
                    });

                    res.status(200).json(dataFormatted);
                    // console.log(dataFormatted);
                }
            });
        });
    }
};
module.exports = upload;