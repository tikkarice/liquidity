const dbConnection = require('../util/dbConnection');
const { addNewUserModel } = require('../model/user');
const {getUserModel} = require('../model/user');
const {updateUserModel} = require('../model/user');
const {deleteUserModel} = require('../model/user');

/************************ creating user if not exists********************************/

const createUser = async(req, res) => {
    if (req.body.name && req.body.mobile && req.body.dept && req.body.email) {
        // check if user already exists or not
        const response = await addNewUserModel(req.body);
        res.json(response);
    }
};
/************************* fetching users ********************************************/

const getUser = async (req, res) => {
    let np = req.params.pageNo || 1;
    let ps = req.params.pageSize || 20;
    let skip = (np-1)*ps;
    const response = await getUserModel(ps, skip);
    res.json(response);
}

/************************** updating user by its email id*****************************/

const updateUser = async (req, res) => {
    if (req.params.email) {
        const response = await updateUserModel(req.params.email, req.body);
        res.json(response);

    } else {
        res.json({msg:'provide email id', errorCode:1});
    }
}

/*************************** deleting a user from his/her email id **********************/

const deleteUser = async (req, res) => {
    if (req.params.email) {
        const response  = await deleteUserModel(req.params.email);
        res.json(response);
    } else {
        console.log('redirected');
        res.redirect('/');
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}
