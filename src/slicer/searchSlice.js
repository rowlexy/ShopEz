import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchTerm: '',
        products: [],
        loading: false,
        error: null 
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setSearchTerm, setProducts, setLoading, setError } = searchSlice.actions

export const searchAllTerms = (state) => state.search.searchTerm

export const errorHandler = (state) => state.search.error

export const searchAllProducts = (state) => state.search.products

export const loadingHandler = (state) => state.search.loading

export default searchSlice.reducer