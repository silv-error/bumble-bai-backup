import React from 'react'
import useDeleteProduct from '../../hooks/useDeleteProduct'
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Listing = ({product}) => {
    const {deleteProduct, isPending} = useDeleteProduct();
    
    return (
      <>
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
            <div className='flex justify-between'>
            <div onClick={() => deleteProduct(product._id)} className='flex items-center'>
                {isPending? <LoadingSpinner /> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 hover:text-red-400 self-center"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>}
            </div>
            <div className="card-actions justify-end">
                <div className="btn ">₱{product.price.toLocaleString()}.00</div>
            </div>
            </div>
            </div>
        </div>
      </>
    )
}

export default Listing

