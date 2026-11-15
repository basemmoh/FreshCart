import type * as zod from "zod";
import { loginSchema } from "./login.zod";

export type LoginFormType = zod.infer<typeof loginSchema>;

export interface LoginResponse {
  message?: string;
  statusMsg?: string;
  token?: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export interface LoginResult {
  success: boolean;
  message: string;
}
