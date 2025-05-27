import { authClient } from "./auth-client";

const newUser = await authClient.admin.createUser({
  name: "Test User",
  email: "mjanderson1227@gmail.com",
  password: "password",
  role: "user", // this can also be an array for multiple roles (e.g. ["user", "sale"])
});
