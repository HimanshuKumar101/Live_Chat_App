const {isCelebrate, isCelebrateError} = require("celebrate");
const errorHandler = {
    handleError() {
        const handleValidationError = (err, req, res, next) => {
            const code = 403;
            let details = [];
            let validationError = ""
            if (err.details) {
                err.details.forEach(error => {
                    if (validationError == "") {
                        validationError = `${error.message}`.replace('\"', "").replace('\"', "")
                    }
                    // console.log(error.context);
                    details.push({
                        message: error.message,
                        key: error.context?.key
                    });
                });
            }
 
            return res.status(code).json({
                error: true,
                status_code: code,
                message: validationError
            });
        }
 
        return (err, req, res, next) => {
            if (isCelebrateError(err) || err.IsValidation)
                handleValidationError(err, req, res, next);
        };
    }
}
module.exports = errorHandler;