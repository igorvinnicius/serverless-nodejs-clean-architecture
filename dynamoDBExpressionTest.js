const myObject = {
    createdAt: "Today",
    name: "object name",
    updatedAt: "Today"
}

console.log(myObject);

let expressionAttributeNames = {};
let expressionAttributeValues = {};

let updateExpression = 'SET '

const length = Object.entries(myObject).length -1;

console.log("length: " + length);

for (const [index, [key, value]] of Object.entries(Object.entries(myObject))) {

    console.log("index: " + index);
    console.log(`${key}: ${value}`);
    const attributeName = `#${key}`;
    expressionAttributeNames[attributeName] = key;
    const attributeValueKey = `:${key}`;
    expressionAttributeValues[attributeValueKey] = value; 
    updateExpression = updateExpression + `${attributeName} = ${attributeValueKey}${index < length ? ", " : ""}`

}

console.log(expressionAttributeNames);
console.log(expressionAttributeValues);
console.log(updateExpression);

