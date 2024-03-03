"use client"

import { CartItemWithProduct } from "@/lib/db/cart"
import { formatPrice } from "@/lib/format"
import Image from "next/image"
import Link from "next/link"
import { useTransition } from "react"

interface CartEntryProps {
    cartItem: CartItemWithProduct
    setProductQuantity: (productId:string, quantity:number) => Promise <void>;
}

export default function CartEntry({cartItem:{product,quantity}, setProductQuantity} : CartEntryProps){
   const [isPending,startTransition] = useTransition();
    const quantityOptions : JSX.Element[] =[];
    for (let i = 1; i<=99; i++){
        quantityOptions.push(
            <option value={i} key={i}>
                {i}
            </option>
        )
    }
return (
    <div>
        <div className="flex flex-wrap items-center gap-3">
            <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-lg"/>
        <div>
            <Link href={"/products/" + product.id} className="font-bold text-3xl text-amber-600">
                <h1>{product.name}</h1>
                {/* <span className="text-amber-600">x{quantity}</span> */}
            </Link>
            <div  className="text-lg" >Price: {formatPrice(product.price)}</div>
            <div className="my-1 flex items-center gap-2 text-2xl">
                Quantity: 
                <select className="select select-border w-full max-w-[80px]" defaultValue={quantity} onChange={e => {
                    const newQuantity = parseInt(e.currentTarget.value)
                    startTransition(async() =>{
                        await setProductQuantity(product.id, newQuantity)
                    })
                }}>
                    <option value={0}>0 (Remove)</option>
            {quantityOptions}
                </select>
            </div>
            <div className="flex items-center gap-3 text-lg">
                Total: {formatPrice(product.price * quantity)}
            {isPending && <span className="loading loading-spinner loading-sm"/>}
            </div>
        </div>
        </div>
        <div className="divider"/>
    </div>
)
}