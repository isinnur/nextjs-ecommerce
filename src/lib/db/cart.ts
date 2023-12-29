import { prisma } from "./prisma";

export async function crateCart() {
    const newCart = await prisma.cart.create({
        data: {}
    })
}