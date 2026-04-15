import rentalUnitService from "../services/rentalUnitService.js";

class RentalUnitController{

    async createRentalUnit(req,res) {

        const username = req.session.user.username; // Get the username from the session
        const {title, city, state, description, price_per_night, features} = req.body; // Get the rental unit details from the request body
        
        try { // Call the service to create the rental unit and get back its ID
            const rentalId = await rentalUnitService.createRentalUnit(username, title, city, state, description, price_per_night, features);
            return res.status(201).json({message: 'Rental Unit Created Successfully', rentalId});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    async searchByFeature(req,res) {
        const {feature_name} = req.query; // Get the feature name from the query parameters

        try {
            const rentalUnits = await rentalUnitService.searchByFeature(feature_name); // Call the service to search for rental units by feature
            return res.status(200).json({rentalUnits});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
}
export default new RentalUnitController();