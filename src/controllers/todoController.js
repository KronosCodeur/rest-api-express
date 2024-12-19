const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const getTodos = async (req, res) => {
    try{
        const user = req.user;
        const todos = await prisma.todo.findMany({where:{ownerId:user.id}});
        return res.status(201).json(todos);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}
const createTodo = async (req,res) =>{
    try {
        const {label,description} = req.body;
        await prisma.todo.create(
            {
                data:{
                    label:label,
                    description:description,
                    ownerId:req.user.id
                }
            }
        )
        return res.status(201).json({message: "New task created successfully !!!"});
    }catch (error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}
const changeTodoStatus = async (req,res) =>{
    const {id} = req.params;
    try {
        const todo = await prisma.todo.findFirst({where:{id:id,ownerId:req.user.id}});
        if(todo){
         await prisma.todo.update({where:{id:id,ownerId:req.user.id},data:{isDone:!todo.isDone}});
        return res.status(200).json({message: "Status changed successfully !!!"});}
        return res.status(404).json({message: "Todo not found !!!"});

    }catch (error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}


const deleteTodo = async (req, res) => {
    const {id} = req.params;
    try {
        const todo = await prisma.todo.findFirst({where: {id: id, ownerId: req.user.id}});
        if (todo) {
            await prisma.todo.delete({where: {id: id}});
            return res.status(200).json({message: "Todo deleted successfully !!!"});
        }
        return res.status(404).json({message: "Todo not found !!!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
};

const updateTodo = async (req, res) => {
    const {id} = req.params;
    const {label, description} = req.body;
    try {
        const todo = await prisma.todo.findFirst({where: {id: id, ownerId: req.user.id}});
        if (todo) {
            await prisma.todo.update({
                where: {id: id},
                data: {label: label??todo.label, description: description?? todo.description}
            });
            return res.status(200).json({message: "Todo updated successfully !!!"});
        }
        return res.status(404).json({message: "Todo not found !!!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
};

module.exports = {getTodos, createTodo, changeTodoStatus, deleteTodo, updateTodo};
