import React from 'react'
import ProductCard from '../../componens/ProductCard'
import mockData from "../../../core/mockData/mock";

const BestSell = () => {
    const pro = mockData.data.product;
    return (
        <div className="product__item-wrap">
            {pro?.slice(-3).map((item) => (
                <ProductCard data={item} />
            ))}
        </div>
    )
}

export default BestSell
