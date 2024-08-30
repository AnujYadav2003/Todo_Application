const express = require("express");
const mongoose = require("mongoose");
const usermodel = require("./models/user");
const todolist = require("./models/todo")
const cors = require("cors");
const path=require("path");
const app = express();
app.use(express.json());
app.use(cors());
const conn = async (req, res) => {
    await mongoose.connect("mongodb+srv://anujyadav12122003:vossw4NWKrTyyUxT@cluster0.30zgqjk.mongodb.net/")
        .then(() => {
            console.log("DB connected succcessfully");
        })
}
conn();

//signup
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await usermodel.findOne({ email: email });
        if (existingUser) {
            res.status(500).json({ message: "User already exists" });
            return;
        }
        const userdetails = new usermodel({ username, email, password });
        await userdetails.save();
        res.status(200).json({ message: "SignUp Successfull" });
    } catch (error) {
        res.status(500).json({ message: "User Already Exist" });
    }
});

//signin
app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await usermodel.findOne({ email });
        const pass = existingUser.password;

        if (!existingUser) {
            return res.status(400).json({ message: "Please signup first" });
        }
        if (existingUser) {

            if (password === pass) {
                console.log(password);
                console.log(pass);
                return res.status(200).json({ message: "User login successfully" });
            }
            else {
                return res.status(400).json({ message: "Enter correct password" });
            }
        }

    }
    catch (error) {
        res.status(500).json({ message: "Error while signin" });
    }
});
// create todo list

app.post("/addtodo", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await usermodel.findOne({ email });

        if (existingUser) {
            if (!existingUser.todo) {
                existingUser.todo = [];
            }

            const todo = new todolist({ title, body, user: existingUser });
            await todo.save();
            existingUser.todo.push(todo);
            await existingUser.save();
            res.status(200).json({ todo });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




//update
app.put("/updatetodo/:id", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            const todo = await todolist.findByIdAndUpdate(req.params.id, { title, body });
            todo.save().then(() => {
                res.status(200).json({ message: "Updated Successfully" });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//delete

app.delete("/deletetodo/:id", async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {

            await todolist.findByIdAndDelete(req.params.id).then(() =>
                res.status(200).json({ message: "deleted successfully" })
            );
        }
    } catch (error) {
        console.log(error);

    }
});


//get all todo
// app.get("/gettodo/:id", async (req, res) => {
//     const todo = await todolist.find({ user: req.params.id });
//     if (todo.length !== 0) {
//         res.status(200).json({ todos: todo })
//     }
//     else
//         res.status(200).json({ message: "No tasks" });
// })

app.get("/gettodo/:email", async (req, res) => {
    try {
        const user = await usermodel.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const todos = await todolist.find({ user: user._id });
        res.status(200).json({ todos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });

app.listen(3000, () => {
    console.log("App is running on 3000");
})