const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: String,
    body: String,
    user: [{
        type: mongoose.Types.ObjectId,
        ref: "Users",
    }],
});

module.exports = mongoose.model('Todos', todoSchema);


// const TodoModel=mongoose.model("Todo",todo);
// TodoModel.createCollection();