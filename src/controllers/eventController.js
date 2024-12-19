const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const getEvents = async (req, res) => {
    try{
        const events = await prisma.event.findMany({where: {userId
        : req.user.id}});
        return res.status(200).json(events);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}

const createEvent = async (req, res) => {
    try {
        const {name, description,date} = req.body;
        const isoDate = new Date(date).toISOString();
        await prisma.event.create({data: {name:name,description:description,date:isoDate,userId:req.user.id}});
        return res.status(201).json({message: "Event created successfully !!!"});
    }catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}

const updateEvent = async (req, res) => {
    const {id} = req.params;
    const {name, description,date} = req.body;
    const isoDate = new Date(date).toISOString();
    try {
        const event = await prisma.event.findFirst({where: {id: id, userId: req.user.id}});
        if (event) {
            await prisma.event.update({where: {id: id}, data: {name:name??event.name,description:description??event.description,date:isoDate??event.date}});
            return res.status(200).json({message: "Event updated successfully !!!"});
        }
        return res.status(404).json({message: "Event not found !!!"});
    }catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}

deleteEvent = async (req, res) => {
    const {id} = req.params;
    try {
        const event = await prisma.event.findFirst({where: {id: id, userId: req.user.id}});
        if (event) {
            await prisma.event.delete({where: {id: id}});
            return res.status(200).json({message: "Event deleted successfully !!!"});
        }
        return res.status(404).json({message: "Event not found !!!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}

module.exports = {getEvents, createEvent, updateEvent, deleteEvent};