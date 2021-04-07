module.exports = class DuplicateError extends Error {
    constructor(args){
        super(args);        
        this.name = "DuplicateError"
        this.message = args
        this.statusCode = 400
    }
}