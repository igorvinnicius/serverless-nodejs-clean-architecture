const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = 'todos';

module.exports = class TodosRepository {

    async add(todo) {       

        console.log('Executing repo...');

        todo.id = uuid.v1();        

        const params = {
            TableName: tableName,
            Item: todo
        };        

        return await dynamoDb.put(params)
        .promise()
        .then((data) => {            
            console.log('Success repo...');            
            return todo;
        })
        .catch((err) => {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            return JSON.stringify(err, null, 2);
        });         
    }

    async getByName(name) {

        console.log('Executing index query...');
        console.log(name);

        var params = {
            TableName: tableName,
            IndexName: 'todos_name_gsi',
            KeyConditionExpression: '#name = :name',
            ExpressionAttributeNames: { "#name": "name" },
            ExpressionAttributeValues: { ':name': name }             
        };
        
        return  await dynamoDb.query(params)
        .promise()
        .then((data) => {            
            console.log('Success from index query...');       
            
            return data.Count == 0 ? null : data.Items[0];                
        })
        .catch((err) => {
            console.error("Unable to query. Error JSON:", JSON.stringify(err, null, 2));
            return JSON.stringify(err, null, 2);
        });      
    }
}