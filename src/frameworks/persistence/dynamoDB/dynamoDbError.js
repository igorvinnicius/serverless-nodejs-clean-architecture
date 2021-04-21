module.exports = class DynamoDBError extends Error {
    constructor(args){
        super(args);        
        this.name = "DynamoDBError"
        this.message = args.message
        this.data = args
        this.statusCode = 400
    }
}