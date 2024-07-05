import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { z } from 'zod';

interface IAuthCallbackInput {
    input: string;
}

export const userRouter = router({
    authCallback: publicProcedure
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
        })

})