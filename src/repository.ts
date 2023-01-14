import { PrismaClient } from "@prisma/client"
export module repository {

    const prisma = new PrismaClient()

    export const selectAllGamesFromDataBase = async () => await prisma.game.findMany() 

}