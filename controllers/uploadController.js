var fs = require('fs');
var csvParser = require('csv-parse');
var uploadService = require('../services/uploadServices');
var uploadPer = 0;
var checker;
var upload = {
    csvUpload(req, res) {
        try {
            var promise;
            var promises = [];
            uploadPer = 0;
            checker = false;
            var i = 0;
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
                            if (x[1] && x[2] && x[2] && x[2]) {
                                var reqData = {
                                    id: i++,
                                    name: x[1],
                                    age: x[2],
                                    address: x[3],
                                    team: x[4],
                                    total: data.length
                                };
                            }

                            promise = uploadService.handleUploadData(reqData);
                            promise
                                .then((x) => {
                                    if (x[0]['perc'] === 100) {
                                        checker = true;
                                        uploadPer = 0;
                                    } else if (x[0]['perc'] !== 100 && !checker) {
                                        uploadPer = x[0]['perc'];
                                    }
                                })
                                .catch((error) => {
                                    res.status(400).json({ msg: error });
                                })
                            promises.push(promise);
                        });

                        Promise.all(promises)
                            .then((result) => {
                                uploadPer = 0;
                                res.status(200).json({ msg: 'Success' });
                            })
                            .catch((error) => {
                                res.status(400).json({ msg: error });
                            })
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
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
    },

    getStatus(req, res) {
        res.status(200).json({ data: uploadPer });
    }
};
module.exports = upload;