import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {prisma} from "~/server/db";
import {z} from "zod";

export const malletRouter = createTRPCRouter({
    listMallets: protectedProcedure.query(async ({ctx}) => {
        const mallets = await ctx.prisma.mallet.findMany({})
        return mallets
    }),
    createMallet: protectedProcedure
        .input(z.object({name: z.string()}))
        .mutation(async ({
                             ctx,
                             input
        }) => {
            console.log('CREANDO UN MALLET')
            const mallet = await ctx.prisma.mallet.create({
                data: {
                    name: input.name,
                    userId: ctx.session.user.id
                }
            })

            return mallet
        })
})