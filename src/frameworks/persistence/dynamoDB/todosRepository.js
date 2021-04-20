const DynamoDBError = require('./dynamoDbError');

module.exports = class TodosRepository {

    constructor(AWS, uuid) {
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
        this.uuid = uuid;
        this.tableName = 'todos';
    }

    async add(todo) {               

        todo.id = this.uuid.v1();        

        const params = {
            TableName: this.tableName,
            Item: todo
        };        

        return await this.dynamoDb.put(params)
        .promise()
        .then(() => {                                  
            return todo;
        })
        .catch((err) => {
            throw new DynamoDBError(err);
        });         
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

    async getAll() {
        var params = {
            TableName: this.tableName              
        };
        
        return  await this.dynamoDb.scan(params)
        .promise()
        .then((data) => {
            return data.Count == 0 ? null : data.Items;                
        })
        .catch((err) => {
            throw new DynamoDBError(err);
        }); 
    }

    async getById(id) {
        var params = {
            TableName: this.tableName,
            Key: {
                id: id,
            }            
        };
        
        return  await this.dynamoDb.get(params)
        .promise()
        .then((data) => {            
            return  data.Item == null ? null : data.Item;
        })
        .catch((err) => {
            throw new DynamoDBError(err);
        });
    }

    async update(todo) {

        var params = {
            TableName: this.tableName,
            Key: {
                id: todo.id,
            },
            ExpressionAttributeNames: {
                '#name': 'name',
            },
            ExpressionAttributeValues: {
            ':name': todo.name,  
            },
            UpdateExpression: 'SET #name = :name',
            ReturnValues: 'ALL_NEW'        
        };
        
        return  await this.dynamoDb.update(params)
        .promise()
        .then((data) => {            
            return  data.Attributes == null ? null : data.Attributes;
        })
        .catch((err) => {
            throw new DynamoDBError(err);
        });
    }

    async delete(id) {

        var params = {
            TableName: this.tableName,
            Key: {
                id: id
            }            
        };
        
        return  await this.dynamoDb.delete(params)
        .promise()
        .then((data) => {            
            return;
        })
        .catch((err) => {            
            throw new DynamoDBError(err);
        });
    }
}