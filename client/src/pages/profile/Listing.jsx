import React from 'react'

const Listing = ({product}) => {
    return (
      <div className="card card-compact bg-base-100 w-80 shadow-xl h-96">
          <figure>
          <img
              src={product.productImg || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
              alt="Shoes" />
          </figure>
          <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <p className='text-slate-500'>{product.category}</p>
          <p>{product.productDetails}</p>
          <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
          </div>
          </div>
      </div>
    )
}

export default Listing