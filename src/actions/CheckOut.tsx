import { client } from "@/sanity/lib/client";
import { Customer } from "@/types/customer.js";
import { Product } from "@/types/product.js";

const CreateCustomerInSanity = async (customerInfo:Customer)=>{
    try{
        const customer = {
            _type:"customer",
            name:customerInfo.name,
            email:customerInfo.email,
            phone:customerInfo.phone
        }
        const response = await client.create(customer)
        console.log("customer created in sanity",response)
        return response._id
    }
    catch(error)
    {
        console.log("error in creating customer in sanity",error)
        throw error
    }
}

const CreateOrderInSanity = async (cartData:Product[],customer_id:string)=>{
    try{
        let totalAmount=0
        const customer = {
            _type:"order",
            customer:{
                _type:"reference",
                _ref:customer_id
            },
            items:cartData.map((item)=>(
                totalAmount+=item.price,
                {
                _type:"items",
                _id:item._id,
                product_name:item.name,
                quantity:1,
                product_description:item.description,
                product_image:item.image_url,
                product_price:item.price
            })),
            total_amount:totalAmount,
            order_date:new Date().toISOString()
            
        }
        const response = await client.create(customer)
        console.log("order created in sanity",response)
        return response._id
    }
    catch(error)
    {
        console.log("error in creating customer in sanity",error)
        throw error
    }
}

const UpdateProductInventory = async (cartData:Product[])=>{
    try{
        for(const item of cartData)
        {
            const existingProduct:Product = await client.fetch(`*[_type=="product" && _id==$id][0]`,{id:item._id})
            if(existingProduct)
            {
                if(existingProduct.quantity>0)
                {
                    const updateQuantity = existingProduct.quantity-1
                    const response = await client.patch(existingProduct._id).set({quantity:updateQuantity}).commit()
                    console.log(`product ${existingProduct.name} quantity ${updateQuantity} updated in sanity`)    
                }
                else
                    console.log(`product ${existingProduct.name} out of stock`)
            }
            else
                console.log(`product ${item.name} not found in sanity`)
        }
        
    }
    catch(error)
    {
        console.log("error in updating inventory in sanity",error)
        throw error
    }
}

export default async function CheckOut(cartData:Product[], customerInfo:Customer) {
    try{
        //const customer_id = await CreateCustomerInSanity(customerInfo)
        //await CreateOrderInSanity(cartData, customer_id)
        await UpdateProductInventory(cartData)
    }
    catch(error)
    {
        console.log("error in creating customer and order on checkout",error)
        throw error
    }
}