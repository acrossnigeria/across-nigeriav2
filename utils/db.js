import mongoose from 'mongoose';
import dns from 'node:dns/promises';

const connection = {}; // To track connection state

export async function connect() {
  dns.setServers(['8.8.8.8'])
  console.log(dns.getServers())
  // Return if already connected
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  // Use existing connections if available
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Using existing database connection");
      return;
    }
    // Disconnect if connection is not ready
    await mongoose.disconnect();
  }

  // Start a new connection
  console.log("Starting new connection to database...");
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("New database connection established:" + mongoose.connection.name);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error; // Propagate error for the caller to handle
  }
}

export async function disconnect() {
  // await mongoose.disconnect();
  // connection.isConnected = false;
  // console.log("Disconnected from database");
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
      console.log("Disconnected from database");
    } else {
      console.log("Not disconnecting in development mode");
    }
  }
}


function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  // doc.userId=doc.userId.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
