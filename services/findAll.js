module.exports.get = function (query) {
    return new Promise((resolve, reject) => {
        query.find().lean().exec(function (err, response){
            if (err) {
                console.log(err)
                return reject(err);
            }
            if (response.statusCode >= 400) {
                err = new Error('Http Error');
                err.statusCode = response.statusCode;
                console.log(err)
                return reject(err)
            } 
            console.log(response)
            resolve(response);
        })
    });
};