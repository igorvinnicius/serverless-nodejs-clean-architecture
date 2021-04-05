module.exports = class DuplicateError extends Error {
    constructor(args){
        super(args);
        this.name = "DuplicateError"
        this.message = "This entity already exists."
        this.statusCode = 400
    }
}