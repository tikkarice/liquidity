const dbConnection = require("../util/dbConnection");
const { isValidMobile } = require('../util/helpers');

/**
 * Private method to check for a user in DB.
 * @param {String} email 
 * @return true | false
 */
const checkIfUserExist = async (email) => {
    const db = dbConnection.getConnectionInstance();
    const userData = await db.collection('user').findOne({email});
    return userData ? true  : false;
};

const addNewUserModel = async (_params) => {
    const { mobile, email, ...rest } = _params;
    const responseObject = { errorCode: 0, msg: '' };
    if (await checkIfUserExist(email)) {
        responseObject.errorCode = 1;
        responseObject.msg = `User already exist for ${email} ID.`;
    }
    if (responseObject.errorCode === 0) {
        if (isValidMobile(mobile)) {
            const db = dbConnection.getConnectionInstance();
            const addUserQry = await db.collection('user').insertOne({ mobile, email, ...rest });
            responseObject.errorCode = addUserQry.result.ok === 1 ? 0 : 1;
            responseObject.msg = addUserQry.result.ok === 1 ? `User created with ID ${email}.` : 'Some thing went wrong 502';
        } else {
            responseObject.errorCode = 1;
            responseObject.msg = 'Invalid mobile number';
        }
    }

    return responseObject;

};


const getUserModel = async (ps, skip) => {
    const db = dbConnection.getConnectionInstance();
    const responseObject = {errorCode:0, msg: '', userList:[]}
    const users = await db.collection('user').find().skip(skip).limit(ps).toArray();
    if (users && users.length > 0) {
        responseObject.userList = users;
        responseObject.msg = 'success';
    } else {
        responseObject.errorCode = 1;
        responseObject.msg = 'error in fetching users';
    }
    return responseObject;
};

const updateUserModel = async (email, params) => {
    const db = dbConnection.getConnectionInstance();
    const responseObject = {errorCode:0, msg:''};
    if (await checkIfUserExist(email)) {
        const updtQry = await db.collection('user').updateOne({email:email}, {$set: params});
        responseObject.msg = `user with email id ${email} got updated successfully`;
    } else {
        responseObject.msg = `user with this email id ${email} not found`
    }
    return responseObject;
};

const deleteUserModel = async (email) => {
    const db = dbConnection.getConnectionInstance();
    const responseObject = {errorCode:0, msg:''};
    if (await checkIfUserExist(email)) {
        const delQry = await db.collection('user').deleteOne({email:email});
        responseObject.msg = `user with email id ${email} got deleted successfully`;
    } else {
        responseObject.msg = 'user with this email id  not found'
    }
    return responseObject;
}

module.exports = {
    addNewUserModel,
    getUserModel,
    updateUserModel,
    deleteUserModel
}