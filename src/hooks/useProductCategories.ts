import React, { useEffect, useReducer, useState } from 'react'

const productCategoryReducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_PRODUCTS_CATEGORY":
            return {
                ...state,
                status: "loading",
                error: ""
            }
        case "PRODUCTS_CATEGORY_SUCCESS":
            return {
                ...state,
                productsCategory: action.productsCategory,
                status: "success",
                error: ""
            }
        case "PRODUCTS_CATEGORY_ERROR":
            return {
                ...state,
                status: "error",
                error: action.error
            }
    }

}

const initialValue = {
    productsCategory: [],
    status: "idle",
    error: ""
}
export default function useProductCategories() {
    const [{ productsCategory, status, error }, dispatch] = useReducer(productCategoryReducer, initialValue)

    const fetchProductCategories = async () => {
        dispatch({ type: "FETCH_PRODUCTS_CATEGORY" })
        try {
            const res = await fetch("https://dummyjson.com/products/category-list");
            const json = await res.json();
            dispatch({ type: "PRODUCTS_CATEGORY_SUCCESS", productsCategory: json })
        } catch (err: any) {
            dispatch({ type: "PRODUCTS_CATEGORY_ERROR", error: err.message })
        }
    }

    return { productsCategory, status, error, fetchProductCategories }
}
