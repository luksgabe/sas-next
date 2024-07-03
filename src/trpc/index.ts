import { createCallerFactory, publicProcedure, t } from './trpc-server';
import { authCallbackHandler } from './trpc-controllers';
import appRouter from 'next/dist/client/components/app-router';

const userRouter = t.router({
    authCallback: publicProcedure
        .query(() => { authCallbackHandler() })
})

export default userRouter;

