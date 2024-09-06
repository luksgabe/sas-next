import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedure, router } from "../trpc";

export const fileRouter = router({
    getFile: privateProcedure
        .input(z.object({ key: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx

            const file = await db.file.findFirst({
                where: {
                    key: input.key,
                    userId
                }
            })

            if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

            return file
        }),

    deleteFileByUserId: privateProcedure.input(
        z.object({ id: z.string() })
    ).mutation(async ({ ctx, input }) => {
        const { userId } = ctx

        const file = await db.file.findFirst({
            where: {
                id: input.id,
                userId,
            }
        })

        if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

        await db.file.delete({
            where: {
                id: input.id,
            }
        })

        return file;
    }),


})