import axios from "axios";
import { attachInterceptors } from "./interceptors";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

attachInterceptors(api);
