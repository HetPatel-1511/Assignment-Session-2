import React, { useContext, type MouseEventHandler } from "react"
import { CartContext } from "../provider/CartContext"

const ProductListItem = React.memo(({
    id,
    name,
    price,
    category,
    quantity,
}: {
    id: string,
    name: string,
    price: number,
    category: string,
    quantity: number
}) => {
    const { addToCart } = useContext(CartContext)
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-700">
            <div className="px-6 pt-4">
                <div className="font-bold text-xl mb-2 text-white">
                    {name}
                    {price >= 500 ? <span className="inline-block bg-green-400 rounded-full px-3 py-1 text-xs font-semibold text-white ml-2 mb-2">
                        #premium
                    </span> : <></>}
                </div>
                <p className="text-white text-base">
                    Price: {price}
                </p>
            </div>
            <div className="px-6">
                <span className="inline-block text-sm font-semibold text-white mr-2 mb-2">
                    Quantity: {quantity}
                </span>
            </div>
            <div className="px-6">
                {category ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{category}
                </span> : <></>}
            </div>
            <div className="flex gap-2 px-6 py-2">
                <button
                    className="text-white cursor-pointer bg-blue-600 rounded box-border border border-transparent shadow-xs font-medium leading-5 rounded-base text-sm px-2 py-1"
                    onClick={() => addToCart({
                        id: id,
                        name: name,
                        price: price,
                        category: category,
                        quantity: quantity
                    })}
                >
                    Add To Cart
                </button>
            </div>
        </div>
    )
})

export default ProductListItem
