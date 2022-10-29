import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./ProductTab.css";

const Product = require('../../../../models/product');

const base_url = process.env.REACT_APP_API_URL;

const ProductTab = () => {
    const [products, setProducts] = useState({});
    const [sort, setSort] = useState({sort: "price", order: "asc"});
    const [filterCategory, setFilterCategory] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() =>  {
        const getAllProducts = async () => {
            try {
                const url = `${base_url}?page=${page}&sort=${sort},${sort.order}&category=${filterCategory.toString()}&search=${search}`;
                const { data } = await axios.get(url);
                setProducts(data);
                console.log(data);
            } catch(err) {
                
            }
        };

        getAllProducts();
    }, [sort, filterCategory, page, search]);

    return (
        <div>
            
        </div>
    );
}

export default ProductTab;