var fs = require('fs');
var csvParser = require('csv-parse');
var uploadService = require('../services/uploadServices');

var upload = {

    csvUpload(req, res) {
        var dataFormatted = [];
        var promises = [];
        if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
        fs.readFile(req.files.file.tempFilePath, function (err, csvData) {
            csvParser(csvData, {
                delimiter: ','
            }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    data.forEach(x => {
                        var reqData = {
                            name: x[1],
                            age: x[2],
                            address: x[3],
                            team: x[4]
                        };
                        promises.push(uploadService.handleUploadData(reqData));
                    });

                    Promise.all(promises)
                        .then((result) => {
                            res.status(200).json({ msg: 'Success' });
                        })
                        .catch((error) => {
                            res.status(400).json({ msg: error });
                        })
                }
            });
        });
    },

    getSuggestions(req, res) {
        var suggestionList = [];
        if (req.query.value && req.query.value !== '') {
            var QueryStringValue = req.query.value;
            uploadService.handleGetSuggestions(QueryStringValue, function (err, rows) {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    rows[0].forEach(x => {
                        suggestionList.push(x['Name']);
                    });
                }
                res.status(200).json({ data: suggestionList });
            });

        } else {
            res.status(400).send("Page Number Should be greater than Zero");
        }
    }
};
module.exports = upload;