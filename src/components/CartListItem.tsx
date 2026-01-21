import React, { useContext, useState, type MouseEventHandler } from "react"
import { CartContext } from "../provider/CartContext"
import MinusSVG from "../assets/MinusSVG"
import PlusSVG from "../assets/PlusSVG"

const CartListItem = React.memo(({
    id,
    name,
    price,
    category,
    quantity,
    quantityInCart
}: {
    id: string,
    name: string,
    price: number,
    category: string,
    quantity: number,
    quantityInCart: number,
}) => {
    const { addToCart, removeFromCart, removeCompletelyFromCart } = useContext(CartContext)
    const [error, setError] = useState("")

    const handleAddProductClick = () => {
        if (quantityInCart >= quantity) {
            setError("No more items in stock.")
            return
        }
        addToCart({
            id: id,
            name: name,
            price: price,
            category: category,
            quantity: quantity
        })
    }

    const handleRemoveProductClick = () => {
        if (quantity > quantityInCart - 1) {
            setError("")
        }
        removeFromCart({
            id: id,
            name: name,
            price: price,
            category: category,
            quantity: quantity
        })
    }

    return (
        <div className="max-w-full rounded overflow-hidden shadow-lg bg-gray-700">
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
                    In Stock: {quantity}
                </span>
            </div>
            <div className="px-6">
                {category ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{category}
                </span> : <></>}
            </div>

            <div className="max-w-xs mx-6 text-white">
                <p className="block mb-2.5 text-sm font-medium text-heading">
                    Choose quantity:
                </p>
                <div className="relative flex items-center max-w-[9rem] shadow-xs rounded-base">
                    <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="quantity-input"
                        className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading cursor-pointer font-medium leading-5 rounded-s-base text-sm px-3 focus:outline-none h-10"
                        onClick={handleRemoveProductClick}
                    >
                        <MinusSVG />
                    </button>
                    <div
                        className="border-x-0 h-10 placeholder:text-heading text-center w-full bg-neutral-secondary-medium border-default-medium py-2.5 placeholder:text-body"
                    >{quantityInCart}</div>
                    <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="quantity-input"
                        className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading cursor-pointer font-medium leading-5 rounded-e-base text-sm px-3 focus:outline-none h-10"
                        onClick={handleAddProductClick}
                    >
                        <PlusSVG />
                    </button>
                </div>
                {error != "" ? <p className="mt-2.5 text-sm text-body shrink-0 text-red-600">
                    {error}
                </p> : <></>}
            </div>
            <div className="flex gap-2 px-6 py-2">
                <button
                    className="text-white cursor-pointer bg-red-600 rounded box-border border border-transparent shadow-xs font-medium leading-5 rounded-base text-sm px-2 py-1"
                    onClick={() => removeCompletelyFromCart({
                        id: id,
                        name: name,
                        price: price,
                        category: category,
                        quantity: quantity
                    })}
                >
                    Remove
                </button>
            </div>
        </div>
    )
})

export default CartListItem
