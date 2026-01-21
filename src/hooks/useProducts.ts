import React, { useEffect, useReducer, useState } from 'react'

const productReducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_PRODUCTS":
            return {
                ...state,
                status: "loading",
                error: ""
            }
        case "PRODUCTS_SUCCESS":
            return {
                ...state,
                products: action.products,
                status: "success",
                error: ""
            }
        case "PRODUCTS_ERROR":
            return {
                ...state,
                status: "error",
                error: action.error
            }
    }

}

const initialValue = {
    products: [],
    status: "idle",
    error: ""
}
export default function useProducts() {
    const [{ products, status, error }, dispatch] = useReducer(productReducer, initialValue)

    const fetchProducts = async (search: string | null, category: string | null) => {
        dispatch({ type: "FETCH_PRODUCTS" })
        const API_URL = search ?
            `https://dummyjson.com/products/search?q=${search}` :
            (
                category && category.toLowerCase() != "all" ?
                `https://dummyjson.com/products/category/${category}` :
                "https://dummyjson.com/products"
            )
        try {
            const res = await fetch(API_URL)
            const json = await res.json();
            dispatch({ type: "PRODUCTS_SUCCESS", products: json.products })
        } catch (err: any) {
            dispatch({ type: "PRODUCTS_ERROR", error: err.message })
        }
    }

    return { products, status, error, fetchProducts }
}
