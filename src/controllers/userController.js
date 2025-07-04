import { deleteUserService, getUserById, getUserService, updateUserService, userRegistrationService, loginService } from "../services/userService.js"
import generateToken from "../utils/generateToken.js"

const userRegistrationController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const isUserAdded = await userRegistrationService({ name, email, password })

        if (isUserAdded) res.status(201).json({ message: 'Registration Success' })
    } catch (error) {
        console.log('There was a error in registration controller', error)
        res.status(400).json({ message: error.message })
    }
}

const getUsersController = async (req, res) => {
    try {
        console.log(req.user)
        const users = await getUserService();
        res.status(200).json({ users })
    } catch (error) {
        console.log('Error in Register Controller', error)
        res.status(404).json({ message: 'Get users Failed' })
    }
}

const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params
        const user = await deleteUserService(id)
        res.status(200).json({ message: 'user Deleted Successfully' })
    } catch (error) {
        console.error('Error in Delete Controller')
        res.status(404).json({ message: 'User Not Found' })
    }
}

const updateUserController = async (req, res) => {
    try {
        const updateContent = req.body
        const { id } = req.params
        const updateUser = await updateUserService(updateContent, id)
        res.status(200).json({ message: "successfully updated" })
    } catch (error) {
        console.log('Error in Update Controller')
        res.status(404).json({ message: "User Not Found" })
    }
}

const getUserByIdController = async (req, res) => {
    try {
        const id = req.params;
        const user = await getUserById(id)
        res.status(200).json({ user })
    } catch (error) {
        console.error('Error in Get User By Id Controller', error)
        res.status(404).json({ message: 'Internal Server error' })
    }
}

const loginUser = async (req, res) => {
    try {
        const { password, email } = req.body
        const user = await loginService({ password, email })

        if (user) {
            const token = generateToken(user.id)
            res.status(200).cookie('token', token, {
                httpOnly: true,
                samesite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            }).json({ message: 'Login Successful' })
        } else {
            res.status(401).json({ message: 'Invalid user' })
        }
    } catch (error) {
        console.error('Error in Login Controller', error)
        res.status(401).json({ message: 'Invalid user' })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token').status(200).json({ message: 'Logout Successfully' })
    } catch (error) {
        console.error('Error in Logout', error)
        res.status(500).json({ Message: 'Internal Server Error' })
    }
}

export {
    userRegistrationController,
    getUsersController,
    deleteUserController,
    updateUserController,
    getUserByIdController,
    loginUser,
    logout
}