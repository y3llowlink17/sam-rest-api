const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

const documentclient = new AWS.DynamoDB.DocumentClient();     // https://stackoverflow.com/questions/57804745/difference-between-aws-sdk-dynamodb-client-and-documentclient
const tableName = process.env.TABLE_NAME;

exports.handler = async(event) => {
    const userid = event.pathParameters.userid;
    const {firstname, lastname, email} = JSON.parse(event.body);

    const item = {
        userid: userid,
        firstname: firstname,
        lastname: lastname,
        email: email
    };

    const data = await documentclient.put({
        TableName: tableName,
        Item: item
    })
    .promise();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Data submitted to DB!",
            data: data
        })
    }
};