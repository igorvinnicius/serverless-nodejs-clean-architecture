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
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            return JSON.stringify(err, null, 2);
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
            console.error("Unable to query. Error JSON:", JSON.stringify(err, null, 2));
            return JSON.stringify(err, null, 2);
        });      
    }
}