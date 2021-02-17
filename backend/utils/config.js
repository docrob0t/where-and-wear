import dotenv from "dotenv";

dotenv.config();

// Read from .env file and set API key constants
export default {
  PORT: 9000,
  MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
  CLIMACELL_API_KEY: process.env.CLIMACELL_API_KEY
};
