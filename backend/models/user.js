const mongoose = require("mongoose");
const userSchema = ({
    email: String,
    username: String,
    //not required true
    password: String,
    list: [{
        type: mongoose.Types.ObjectId,
        ref: "Todos",
    },],

})
module.exports = mongoose.model('Users', userSchema)
// const userModel=mongoose.model("User",userSchema);
// await userModel.createCollection();