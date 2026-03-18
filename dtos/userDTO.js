
// shapes the data from model to give to controller
class UserDTO {
    username;
    firstName;
    lastName;
    email;
    phone;

    constructor(user){
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phone = user.phone;
    }
}
export default UserDTO;
// next step would be AuthController