import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [todo, setTodo] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todolist/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todolist/${id}`);
        setTodo(response.data);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo();
  }, [id]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[750px] bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{todo.title}</h1>
            <Button onClick={handleDelete} variant="destructive">
              Delete To Do
            </Button>
          </CardTitle>
          <CardDescription className="text-gray-500">{todo.date}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-10">
          <p className="text-gray-700">{todo.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between text-gray-600 text-sm">
          <h1>Made with ♥ by Mario Inguito</h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Todo;
