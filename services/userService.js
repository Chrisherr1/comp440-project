import userRepository from "../repositories/userRepository.js";
import UserDTO from "../dtos/UserDTO.js";
import argon2 from 'argon2';

// Business logic
// uses repository to fetch data, applies logic for checking for duplicates and hashing passwords and returns DTOs to controller

//  Models only throws errors and returns data. No HTTP
//  creates and returns the DTO to controller
//  controllers deal with HTTP and take what the model gives and sends a response based on that
class UserService{
    // Register a user
    async register(username,password,firstName,lastName,email,phone){

        // checks if user exists with that username
        const existingUsername = await userRepository.findByUsername(username);
        if(existingUsername){
            throw new Error('Username already exists');
        }
        // checks if user exists with that email
        const existingEmail = await userRepository.findByEmail(email);
        if(existingEmail){
            throw new Error('Email already exists');
        }

        // checks if user exists with that phone number
        const existingPhone = await userRepository.findByPhone(phone);
        if(existingPhone){
            throw new Error('Phone already exists');
        }

        // hash password before storing
        const hashedPassword = await argon2.hash(password);

        // insert user into database if all is ok
        await userRepository.createUser(username,hashedPassword,firstName,lastName,email,phone);

        // gives user info to UserDTO to use, removed password because UserDTO doesnt have it, and doesn't need it
        return new UserDTO({username,firstName,lastName,email,phone});

    }

    // Login a user
    async login(username,password) {
        
        // find a user by username
        const user = await userRepository.findByUsername(username);
        if(!user){
            throw new Error('Invalid username or password');
        }

        // creates a password hash using given password and checks it against database password hash
        const checkPassword = await argon2.verify(user.password, password);
        if(!checkPassword){
            throw new Error('Invalid username or password');
        }

        return new UserDTO(user);
    }
    
}

export default new UserService();

// next stop AuthController