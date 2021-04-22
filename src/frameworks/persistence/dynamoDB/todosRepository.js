const DynamoDBError = require('./dynamoDbError');
const DynamoDBRepository = require('./dynamoDBRepository');

module.exports = class TodosRepository extends DynamoDBRepository {

    constructor(AWS, uuid) {
        super(AWS, uuid);
        this.tableName = 'todos';
    }    

    async getByName(name) {

        var params = {
            TableName: this.tableName,
            IndexName: 'todos_name_gsi',
            KeyConditionExpression: '#name = :name',
            ExpressionAttributeNames: { "#name": "name" },
            ExpressionAttributeValues: { ':name': name }             
        };
        
        return  await this.dynamoDb.query(params)
        .promise()
        .then((data) => {            
            return data.Count == 0 ? null : data.Items[0];                
        })
        .catch((err) => {
            throw new DynamoDBError(err);
        });      
    }      
}