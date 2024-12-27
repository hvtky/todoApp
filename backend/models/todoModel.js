const db = require('../config/db');
const {ObjectId} = require('mongodb');

// Hàm để tạo một chuỗi ngẫu nhiên có định dạng hex 24 ký tự
function generateRandomHex(length = 24) {
    let result = '';
    const characters = '0123456789abcdef';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

const Todo = {
    findAllByEmail: async (email, callback) =>{
        const client = await db();
        const database = await client.db('todos');
        const collection = await database.collection('users');
        try{
            const user = await collection.findOne({email: email});
            callback(null, user);
        }catch(err){callback(null, err);}
        finally{await client.close();}
    },
    create: async (data, callback) => {
        const client = await db();
        const database = await client.db('todos');
        const collection = await database.collection('users');
        try{
            const user = await collection.findOne({email: data.email});
            const newTodo = {_id: new ObjectId(generateRandomHex()),todo: data.todo, complete: "false"};
            if(user){
                const result = await collection.updateOne(
                    {email: data.email},
                    {$push: {todos: newTodo}}
                );
                callback(null, newTodo);
            }else{callback(null, null);}
        }catch(err){
            callback(null, err);
        }
        finally{await client.close();}
    },
    update: async (id, updateData, callback) =>{
        const client = await db();
        const database = await client.db('todos');
        const collection = await database.collection('users');
        try{
            const user = await collection.findOne({email: updateData.email});
            if(user){
                const updatedTodo = await collection.updateOne(
                    {email: updateData.email, 'todos._id': new ObjectId(id)},
                    {$set: {'todos.$.todo': updateData.todo, 'todos.$.complete': updateData.complete}}
                );
                callback(null, updatedTodo);
            }else{callback(null, null);}
        }catch(err){callback(null, err);}
        finally{await client.close();}
    },
    delete: async (id, email, callback) =>{
        console.log(`id: ${id}, email: ${email}`)
        const client = await db();
        const database = await client.db('todos');
        const collection = await database.collection('users');
        try{
            const user = await collection.findOne({email: email});
            if(user){
                const deletedTodo = await collection.updateOne(
                    {email: email},
                    {$pull: {todos: {_id: new ObjectId(id)}}}
                );
                callback(null, deletedTodo);
            }else{callback(null, null);}
        }catch(err){callback(null, err);}
        finally{await client.close();}
    }
}

module.exports = Todo;
