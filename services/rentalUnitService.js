import rentalUnitRepository from "../repositories/rentalUnitRepository.js";

class RentalUnitService {

    async createRentalUnit(username, title, city, state, description, price_per_night, features) {
        
        // Check if the user has reached the daily limit of 2 rental units
        const canPost = await rentalUnitRepository.checkDailyLimit(username);
        if (!canPost) {
            throw new Error('Daily limit of 2 rental units reached');
        }
        
        // Create the rental unit and get back its generated ID
        const rentalId = await rentalUnitRepository.createRentalUnit(username, title, city, state, description, price_per_night);

        // Add features to the rental unit
        for (const featureName of features) {
            await rentalUnitRepository.addFeature(featureName);
            const feature = await rentalUnitRepository.getFeatureByName(featureName);
            await rentalUnitRepository.addRentalFeature(rentalId, feature.feat_id);
        }

        return rentalId;
    }
    
    async searchByFeature(feature_name) {
    return await rentalUnitRepository.searchByFeature(feature_name);
}
}

export default new RentalUnitService();