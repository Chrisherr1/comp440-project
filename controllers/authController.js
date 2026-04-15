import userService from '../services/userService.js';


class AuthController {

    //register a new user
    async register(req,res) {

        const {username,password,confirmedPassword,firstName,lastName,email,phone} = req.body;

        // check if the password and confirmedPassword match
        if (password !== confirmedPassword){
            return res.status(400).json({message: 'Passwords do not match'});
        }

        try {
            const user = await userService.register(username,password,firstName,lastName,email,phone);
            return res.status(201).json({message: 'User Registered Successfully' , user });
        }catch (error) {
            return res.status(400).json({message: error.message});
        }

    }

    // Login a user
    async login(req, res) {

        // grabs the username and password from the request body
        const {username , password} = req.body;

        try {
            const user = await userService.login(username,password);

            // store user in session
            req.session.user = user;

            return res.status(200).json({message: 'Login Successful', user});
        }catch (error) {
            return res.status(401).json({message: error.message});
        }

    }
    async logout(req,res) {
        // destroys the session and logs the user out
        req.session.destroy(function(error){
            if (error) {
                return res.status(500).json({message: 'Error logging out'});
            }
                return res.status(200).json({message: 'Logged out successfully'});
        });
    }

}

export default new AuthController();