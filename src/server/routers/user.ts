import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { z } from 'zod';

export const userRouter = router({
    authCallback: publicProcedure
        .input(z.object({}).optional())
        .mutation(async (opts) => {
            const { getUser } = getKindeServerSession()
            const user = await getUser()

            if (!user?.id || !user?.email) {
                throw new TRPCError({ code: 'UNAUTHORIZED' })
            }

            // check if the user is in the database
            const dbUser = await db.user.findFirst({
                where: {
                    id: user?.id,
                },
            })

            if (!dbUser) {
                // create user in db
                await db.user.create({
                    data: {
                        id: user?.id,
                        email: user?.email,
                    },
                })
            }

            return { success: true }
        }),

    getUserFiles: privateProcedure.query(async ({ ctx }) => {
        const { userId, user } = ctx;

        return await db.file.findMany({
            where: {
                id: userId
            }
        });
    })
})