import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { transformer } from '@/utils/transformer';

export const t = initTRPC.context<Context>().create({
    transformer,
    errorFormatter({ shape }) {
        return shape;
    },
});


export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;
export const createCallerFactory = t.createCallerFactory;