import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./prisma";
import { Cart, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type CartWithProducts = Prisma.CartGetPayload<{
    include: {items: {include : {product: true}}}
}>
export type CartItemWithProduct = Prisma.CartItemGetPayload <{
    include: {product: true};
}>

export type ShoppingCart = CartWithProducts & {
    size: number,
    subtotal: number,
};

export async function getCart(): Promise<ShoppingCart | null> {
    const localCartId = cookies().get("localCartId")?.value
    const cart = localCartId ? 
    await prisma.cart.findUnique({
        where: {id: localCartId},
        include: {items: {include: {product: true}}}
    })
    : null;
    if(!cart) {
        return null;
    }

    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity,0),
        subtotal : cart.items.reduce(
            (acc,item) => acc + item.quantity * item.product.price,0
        )
    }
}

export async function createCart() : Promise <ShoppingCart> {
    const session = await getServerSession(authOptions);

    let newCart : Cart;
    if(session) {
newCart = await prisma.cart.create({
    data: {userId: session.user.id}
})
    }
    else{
        newCart = await prisma.cart.create({
           data: {}
        })
        cookies().set("localCartId", newCart.id);
    }

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0
    }

}