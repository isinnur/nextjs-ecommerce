import { getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";

export const metadata = {
    title: "Your Cart - Flowmazon"
}
export default async function CartPage() {
    const cart = await getCart();
    return(
        <div className="mb-6 text-3xl ">
            <h1 className="font-bold">Shopping Cart</h1>
            {cart?.items.map(cartItem =>(
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity} />
            ))}
          <div className="text-2xl">
          {!cart?.items.length && <p>Your cart is empty.</p>}
          </div>
            <div className="text-lg flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Total: { formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">Checkout</button>
            </div>
        </div>
    )
}