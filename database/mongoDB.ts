import mongoose from 'mongoose';

import {DB_URI} from '../config/env';
import logger from '../utils/logger';

if(!DB_URI){
    logger.error('Please define the DB_URI environment variable inside .env<development/production>.local file');
    throw new Error('Please define the DB_URI environment variable inside .env<development/production>.local file');
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI!);
        logger.info('Database connected successfully');
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Error: ${error.message}`);
        } else {
            logger.error('An unknown error occurred');
        }
    }
};


export default connectDB;