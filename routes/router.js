import authRoutes from './authRoutes.js';
import pageRoutes from './pageRoutes.js';
import rentalUnitRoutes from './rentalUnitRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import queryRoutes from './queryRoutes.js';

export default function router(app) {

    //Page routes(no prefix)
    // Public page routes
    // Handles routes like '/' AKA 'login.html', '/register', ect
    app.use('/',pageRoutes);

    //API routes (versioned)
    // Auth API routes
    // Handles routes like '/api/v1/auth/login'
    app.use('/api/v1/auth', authRoutes);

    // Rental unit
    // Handles routes like '/api/v1/rental-units' and '/api/v1/rental-units/search'
    app.use('/api/v1/rental-units', rentalUnitRoutes);
    // Review routes
    // Handles routes like '/api/v1/reviews'
    app.use('/api/v1/reviews', reviewRoutes);

    // Query routes
    // Handles routes like '/api/v1/queries/most-expensive-by-feature'
    app.use('/api/v1/queries', queryRoutes);


}
