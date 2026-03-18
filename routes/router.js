import authRoutes from './authRoutes.js';

export default function router(app) {
    app.use('/api/v1/auth', authRoutes);
}
