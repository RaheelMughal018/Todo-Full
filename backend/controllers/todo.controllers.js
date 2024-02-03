import {Todo} from "../model/todo.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";




export const addTodo = asyncHandler(async(req,res)=>{
    // get the detail from the user
    //check the title and description of todo is not missing
    //add into the database
    // return res

    const {title, description} = req.body;
    if([title,description].some((field)=>field.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }

    const createTodo = await Todo.create({title, description});

    if(!createTodo){
        throw new ApiError(400, "Todo not created")
    
    }

    return res.status(201).json(
        new ApiResponse(200,createTodo,"Todo Created Successfully")
    )

});

export const getTodos = asyncHandler(async(req, res)=>{

    const todos = await Todo.find();

    if(!todos){
        throw new ApiError(400, "Todos not found")
    }
    return res.status(200).json(
        new ApiResponse(200, todos, "Todos fetched successfully")
    )
})

export const updateTodo = asyncHandler(async(req, res)=>{

    const exsistingTodo = await Todo.findById(req.params.id);
    if(!exsistingTodo){
        throw new ApiError(400, "Todo not found")
    }
    const {title, description, completed} = req.body;
    //if no data is provided in the body just send back the existing todo
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {title, description, completed},{new:true});

    res.status(201).json(
        new ApiResponse(200, updatedTodo, "Todo updated successfully")
    )
})