// api.ts
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

export const api = setupCache(
  axios.create({
    baseURL: "https://68fb3f0394ec960660253db2.mockapi.io",
    timeout: 10000,
  }),
  {
    ttl: 1000 * 60 * 30,   
    interpretHeader: true 
  }
);
