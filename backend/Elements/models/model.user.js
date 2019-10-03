const mongoose=require('mongoose');
const UserSchema = mongoose.Schema(
    {
        email: String,
        password : String,
        name: String,
        mobileNo : String,
        district : String,
        province : String,
        nic : String,
        postalCode : String,
        imageId : String,
        type : String,
        approved : Boolean
    }
);

const User = module.exports = mongoose.model('User',UserSchema)

module.exports.getUserByID = function (id,callback) {
    User.find(id,callback);
}

module.exports.getUserByEmail = function (email, callback) {
    const q = {email : email}
    User.find(q,callback);

}

module.exports.addUser = function (newUser,callback) {
    newUser.save(callback);
}

module.exports.getAllUsers = function (callback) {
    User.find({},callback);
}
