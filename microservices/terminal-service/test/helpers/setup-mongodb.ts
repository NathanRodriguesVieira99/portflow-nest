import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import mongoose from 'mongoose';

export let mongodb: StartedMongoDBContainer;

export const setupMongoDB = async () => {
  mongodb = await new MongoDBContainer('mongo:8').start();
  const uri = mongodb.getConnectionString();
  await mongoose.connect(uri, { directConnection: true });
};

export const resetMongoDBDatabase = async () => {
  await mongoose.connection.dropDatabase();
};

export const disconnectMongoDB = async () => {
  await mongoose.disconnect();
  if (!mongodb) return;
  await mongodb.stop();
};
