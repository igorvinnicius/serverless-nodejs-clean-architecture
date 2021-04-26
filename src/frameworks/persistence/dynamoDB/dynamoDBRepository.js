const DynamoDBError = require('./dynamoDbError');

module.exports = class DynamoDBRepository {

    constructor(AWS, uuid) {
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
        this.uuid = uuid;
    }

    async add(item) {               

        item.id = this.uuid.v1();
        const date = new Date().toISOString()
        item.created_at = date;
        item.updated_at = date;

        const params = {
            TableName: this.tableName,
            Item: item
        };        

        return await this.dynamoDb.put(params)
        .promise()
        .then(() => {                                  
            return item;
        })
        .catch((err) => {
            throw new DynamoDBError(err);
        });         
    }    

    async update(item) {

        item.updated_at = new Date().toISOString();
        
        const values = this.buildUpdateExpression(item);    

        var params = {
            TableName: this.tableName,
            Key: {
                id: item.id,
            },
            ExpressionAttributeNames: values.expressionAttributeNames,
            ExpressionAttributeValues: values.expressionAttributeValues,
            UpdateExpression: values.updateExpression,
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

    buildUpdateExpression(item)  {        

        let expressionAttributeNames = {};
        let expressionAttributeValues = {};
        let updateExpression = 'SET '
        const length = Object.entries(item).length -1;

        for (const [index, [key, value]] of Object.entries(Object.entries(item))) {

            if (key == 'id'){
                continue;
            }
          
            const attributeName = `#${key}`;
            expressionAttributeNames[attributeName] = key;
            const attributeValueKey = `:${key}`;
            expressionAttributeValues[attributeValueKey] = value; 
            updateExpression = updateExpression + `${attributeName} = ${attributeValueKey}${index < length ? ", " : ""}`
        } 

        return {
            expressionAttributeNames: expressionAttributeNames,
            expressionAttributeValues: expressionAttributeValues,
            updateExpression: updateExpression
        }

    }

}