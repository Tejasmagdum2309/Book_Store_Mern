class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){  

        console.log("Constructor parameters:", { statusCode, message, errors, stack });
        super(message);
        // super();
        this.statusCode = statusCode
        // console.log(statusCode," ",this.statusCode);
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}