var db = require('../db/dbConnection');

var uploadService = {

    handleUploadData(data) {
        try {
            return new Promise((resolve, reject) => {
                db.query('CALL SP_Upload_CSV_Data(?,?,?,?,?,?)', [data.id, data.name, data.age, data.address, data.team, data.total], function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res[0]);
                    }
                });
            });
        } catch (e) {
            console.log("Error in handleUploadData : " + e);
        }
    },

    handleGetSuggestions(data, callback) {
        try {
            return db.query('CALL SP_Get_Suggestions(?)', [data], callback);
        } catch (e) {
            console.log("Error in handleGetSuggestions : " + e);
        }
    },

    handleGetSeachResults(data, callback) {
        try {
            return db.query('CALL SP_Get_Search_Results(?)', [data], callback);
        } catch (e) {
            console.log("Error in handleGetSeachResults : " + e);
        }
    }

};
module.exports = uploadService;