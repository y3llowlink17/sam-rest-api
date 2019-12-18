const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

const documentclient = new AWS.DynamoDB.DocumentClient();     // https://stackoverflow.com/questions/57804745/difference-between-aws-sdk-dynamodb-client-and-documentclient
const tableName = process.env.TABLE_NAME;

exports.handler = async(event) => {
    const userid = event.pathParameters.userid;

    const data = await documentclient.delete({
        TableName: tableName,
        Key: {
            userid: userid
        }
    })
    .promise();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Deleted data from DB!",
            data: data
        })
    }
};