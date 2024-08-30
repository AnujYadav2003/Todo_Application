
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialContext } from '../App';

const TodoApp = ({ userEmail }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [todoarr, setTodoArr] = useState([]);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useContext(CredentialContext);

    useEffect(() => {
        if (userEmail) {
            fetchTodos();
        }
    }, [userEmail]);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${window.location.origin}/gettodo/${userEmail}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setTodoArr(data.todos);
        } catch (error) {
            console.error("There was an error fetching the todos:", error);
        }
    };

    const addTodo = async () => {
        try {
            const response = await fetch("${window.location.origin}/addtodo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, body: desc, email: userEmail }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setTodoArr([...todoarr, data.todo]);
            setTitle("");
            setDesc("");
        } catch (error) {
            console.error("There was an error adding the todo:", error);
        }
    };

    const updateTodo = async (id) => {
        try {
            const response = await fetch(`${window.location.origin}/updatetodo/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, body: desc, email: userEmail }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedTodo = { _id: id, title, body: desc }; // Updated todo object
            const updatedTodos = todoarr.map(todo => (todo._id === id ? updatedTodo : todo));
            setTodoArr(updatedTodos);
            // setTitle("");
            // setDesc("");
        } catch (error) {
            console.error("There was an error updating the todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${window.location.origin}/deletetodo/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Filter out the deleted todo from todoarr
            setTodoArr(todoarr.filter(todo => todo._id !== id));
        } catch (error) {
            console.error("There was an error deleting the todo:", error);
        }
    };

    const logout = () => {
        setCredentials(null);  // Clear the credentials
        navigate('/');  // Navigate back to the home page
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl mb-4">Hello, {userEmail}</h1>
            <button 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={logout}
            >
                Logout
            </button>
            <div className="mb-4">
                <input
                    className="border border-gray-300 p-2"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <input
                    className="border border-gray-300 p-2"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addTodo}>Add</button>
            </div>
            <div>
                <h3 className="text-xl mb-2">Your Todos</h3>
                <ul>
                    {todoarr.map(todo => (
                        <li key={todo._id} className="border-b border-gray-300 py-2">
                            <h4 className="text-lg mb-1">Title: {todo.title}</h4>
                            <p className="text-gray-700"> Description: {todo.body}</p>
                            <div className="mt-2">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 mr-2 rounded" onClick={() => {
                                    setTitle(todo.title);
                                    setDesc(todo.body);
                                    updateTodo(todo._id);
                                }}>Update</button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => deleteTodo(todo._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoApp;
