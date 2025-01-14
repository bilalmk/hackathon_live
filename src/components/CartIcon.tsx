'use client'

import { useCart } from "@/context/CartContext";

export default function CartIcon() {
    const {cart} = useCart()
    return (
        <a href="">{cart.length>0?"Cart("+cart.length+")":"Cart"}</a>
    );
}