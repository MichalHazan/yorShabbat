// app/utils/locationUtils.ts
import axios from "axios";

export const fetchUserLocation = async () => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    const { latitude, longitude, city } = response.data;

    if (latitude && longitude) {
      return { latitude, longitude, city };
    }
    throw new Error("Location not found");
  } catch (error) {
    console.warn("Using default location: Jerusalem");
    return {
      latitude: 31.7683,
      longitude: 35.2137,
      city: "Jerusalem",
    };
  }
};
