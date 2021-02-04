import dotenv from "dotenv";

dotenv.config();

// Read from .env file and set API key constants
export default {
  PORT: 9000,
  MAPBOX_API_KEY: "pk.eyJ1Ijoiam4zMjMiLCJhIjoiY2trcXo4dTd0MXJycTJvbnNydTVmb253ZiJ9.pm8KAkIR9Uv-UIPQdKjAjg",
  CLIMACELL_API_KEY: process.env.CLIMACELL_API_KEY,
};
