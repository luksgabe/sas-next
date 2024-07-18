import { router } from "./trpc";
import { userRouter } from "./routers/user-route";
import { fileRouter } from "./routers/file-route";

export const appRouter = router({
    user: userRouter,
    file: fileRouter,
})

export type AppRouter = typeof appRouter;