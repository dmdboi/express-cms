module.exports.post = function (query) {
    return new Promise((resolve, reject) => {
        query.findOneAndDelete(query, function (err, response) {
            if (err) {
                console.log(err)
                return reject(err);
            }
            resolve(response);
        })
    });
};