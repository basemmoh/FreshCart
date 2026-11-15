import * as zod from "zod";
import { registerSchema } from "./register.zod";

export type RegisterFormType = zod.infer<typeof registerSchema>

export interface RegisterResponse {
  message?: string;
  statusMsg?: string;
  user: User
  token: string
}

export interface RegisterResult {
  success: boolean;
  message: string;
}

export interface User {
  name: string
  email: string
  role: string
}
