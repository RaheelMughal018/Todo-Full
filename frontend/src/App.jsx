import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex,setEditIndex]= useState(null);
  const [editedTodo,setEditedTodo]= useState("");
  const [isEditing,setIsEditing]= useState(false);



  const fetchTodo = async()=>{
    try {
      const response = await axios.get("http://localhost:8000/api/v1/todo/get");
      setTodos(response.data.message)
    } catch (error) {
      console.log("Error while fetching Todos!",error)
    }
  }

  const addTodo = async() => {
    try {
    if (newTodo.trim() !== "") {
      const response = await axios.post("http://localhost:8000/api/v1/todo/add",{
        title : newTodo,
        description: "New Todo",
        completed:false,
      });
      setTodos([...todos, response.data.message]);
      setNewTodo("")
      }
      
    }catch (error) {
      console.log("Error while adding Todo!", error);

      }
      
    
  };

  const startEditing = (index)=>{
    setIsEditing(true);
    setEditedTodo(todos[index].title);
    setEditIndex(index);
  }

  const saveEdit = async(index)=>{
 try {
   if(editedTodo.trim()!==""){
     const updatedTodos = [...todos];
     const todoId = updatedTodos[index]._id;
     const response = await axios.patch(`http://localhost:8000/api/v1/todo/update/${todoId}`,{title: editedTodo});
     updatedTodos[index] = response.data.message; 
     setTodos(updatedTodos);
     setEditIndex(null) 
     setIsEditing(false)
 
   }
 } catch (error) {
  console.log(`Error while updating todo ${error}`)
 }
  }

  const cancelEdit = ()=>{
    setEditIndex(null);
    setIsEditing(false);
  }

  const removeTodo = async(index)=>{
    try {
      const updatedTodos = [...todos];
      const todoId = updatedTodos[index]._id;
      await axios.delete(`http://localhost:8000/api/v1/todo/delete/${todoId}`)
    } catch (error) {
      console.log(`Error while deleting todo ${error}`)
    }
  }

  useEffect(()=>{
    fetchTodo();
  })
  
  return (
    <>
       <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Todo List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 w-full mr-2"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="flex items-center border-b py-2">
            {editIndex === index && isEditing ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <button className="text-green-500 ml-2" onClick={() => saveEdit(index)}>
                  Save
                </button>
                <button className="text-red-500 ml-2" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 pl-2">{todo.title}</span>
                <EditIcon
                  className="ml-2 cursor-pointer text-blue-500"
                  onClick={() => startEditing(index)}
                />
                <DeleteIcon className="ml-2 cursor-pointer text-red-500"
                onClick={()=>removeTodo(index)} />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;
