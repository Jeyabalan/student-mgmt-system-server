import { ObjectId } from 'mongodb';
import { getDB } from "../db/connection.js";
import generateToken from '../utils/generateToken.js';

const userRegistrationService = async ({ name, email, password }) => {
    try {
        const db = await getDB()

        const userCollection = db.collection('users');
        const isUserExists = await userCollection.findOne({ email })

        if (isUserExists) throw new Error('User Already Exists')

        const newUser = await userCollection.insertOne({ name, email, password });

        return newUser;
    } catch (error) {
        console.error('Error in Registration Service', error);
        throw error
    }
}

const getUserService = async () => {
    try {
        const db = await getDB()
        const usersCollection = db.collection('users')
        const users = await usersCollection.find({}).toArray()
        return users
    } catch (error) {
        console.error('There was a error to get the User', error)
        throw error
    }
}

const deleteUserService = async (id) => {
    try {
        const db = await getDB()
        const userCollection = db.collection('users')
        const result = await userCollection.deleteOne({ _id: new ObjectId(id) })
        if (result.deletedCount === 0) throw new Error('User Not Found')
        return result
    } catch (error) {
        console.error('Error in user delete', error)
        throw error
    }
}

const updateUserService = async (updateContent, id) => {
    try {
        const db = await getDB();
        const userCollection = db.collection('users')
        const result = await userCollection.updateOne({
            _id: new ObjectId(id)
        }, {
            $set: updateContent
        })
        console.log(result)
        if (result.matchedCount === 0) throw new Error('User Not Found')
        return result
    } catch (error) {
        console.error('Error while updating user', error)
        throw error
    }
}

const getUserById = async (id) => {
    try {
        const db = await getDB()
        const userCollection = db.collection('users')
        const user = await userCollection.find({ _id: new ObjectId(id) }).toArray()
        return user
    } catch (error) {
        console.error('Error in Get User By ID', error)
        throw error
    }
}

const loginService = async({ email, password }) => {
    try {
        const db = await getDB()
        const userCollection = db.collection('users');
        const user = await userCollection.findOne({ email, password })

        if (!user) throw new Error('User Not Found')
        return user
    } catch (error) {
        console.log('Error in Login', error)
        throw error
    }
}

export {
    userRegistrationService,
    getUserService,
    deleteUserService,
    updateUserService,
    getUserById,
    loginService
}