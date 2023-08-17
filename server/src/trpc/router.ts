import { router } from "./trpc";
import { userController } from "../user/controllers/user.controller";

export const appRouter = router({
  user: userController, // put procedures under "user" namespace
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
