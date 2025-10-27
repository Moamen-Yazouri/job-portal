// api.ts
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

export const apiCats = setupCache(
  axios.create({
    baseURL: "https://68fb3f0394ec960660253db2.mockapi.io",
    timeout: 10000,
  }),
  {
    ttl: 1000 * 60 * 30,   
    interpretHeader: true 
  }
);

export const apiJobs = setupCache(
  axios.create({
    baseURL: "https://68f8f8e8deff18f212b83fba.mockapi.io",
    timeout: 10000,
  }),
  {
    ttl: 1000 * 60 * 30,   
    interpretHeader: true 
  }
);


