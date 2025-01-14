'use client'
import { notifySuccess } from "@/toast/toastify";
import { Product } from "@/types/product.js";
import React, { createContext, useContext, useState, ReactNode, useEffect} from "react";

export interface CartContextType{
    cart:Product[],
    handleAddToCart:(product:Product)=>void,
    handleRemoveFromCart:(product_id:string)=>void
    handleEmptyCart:()=>void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartContextProvider = ({children}:{children:ReactNode})=>{
    const [cart, setCart] = useState<Product[]>(()=>{
        if (typeof window !== 'undefined')
        {
            const storedData = localStorage.getItem("cart")
            return storedData? JSON.parse(storedData):[]
        }
        return []
    })

    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    },[cart])

    const handleAddToCart=(newItem:Product)=>{
        setCart(prevCartItems=>[...prevCartItems,newItem])
        notifySuccess("Item added in cart successfully")
    }

    const handleRemoveFromCart=(product_id:string)=>{
        setCart(cart.filter((item)=>{
            return item._id!==product_id
        }))
        notifySuccess("Item remove from cart successfully")
    }

    const handleEmptyCart=()=>{
        setCart([])
    }

    return (
        <CartContext.Provider value={{cart, handleAddToCart, handleRemoveFromCart,handleEmptyCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = ():CartContextType=>{
    const context = useContext(CartContext)
    if(!context)
        throw new Error("use cart inside context")
    return context
}