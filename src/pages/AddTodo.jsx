import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

// Import MUI Date Picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);

  const id = Math.floor(Math.random() * 10);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/todolist", {
        id: id.toString(),
        title,
        description,
        date: date ? date.format("YYYY-MM-DD") : "",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[750px] bg-white shadow-lg rounded-xl p-6">
        <CardHeader>
          <CardTitle className="text-blue-600">Add Information</CardTitle>
          <CardDescription className="text-gray-500">
            Fill all fields to add your details
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col py-6 gap-y-5 w-full">
          
          <div className="gap-y-2">
            <Label className="text-gray-700">First Name</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-100 border-gray-400 focus:border-blue-500 focus:ring-blue-300"
            />
          </div>
          <div className="gap-y-2">
            <Label className="text-gray-700">Middle Name</Label>
            
          </div>
          <div className="gap-y-2">
          
            <Label className="text-gray-700">Last Name</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-100 border-gray-400 focus:border-blue-500 focus:ring-blue-300"
            />
          </div>
          <div className="gap-y-2">
            <Label className="text-gray-700">Skills and Experience</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-100 border-gray-400 focus:border-blue-500 focus:ring-blue-300"
            />
          </div>
          <div className="gap-y-2 mt-3">
            <Label className="text-gray-700">Date of Birth</Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={(newDate) => setDate(newDate)}
                format="YYYY-MM-DD"
                slotProps={{ textField: { variant: "outlined", fullWidth: true } }}
              />
            </LocalizationProvider>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg mt-5" onClick={handleSubmit}>
            Submit Info
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between">
          <h1 className="text-gray-500">Made with ♥ by Mario Inguito</h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddTodo;
