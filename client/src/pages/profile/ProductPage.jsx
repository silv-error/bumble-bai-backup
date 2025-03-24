import React from 'react'
import Sidebar from '../../components/common/common/Sidebar';
import CreateProduct from './CreateProduct';
import Listing from './Listing';
import useGetMyProducts from '../../hooks/useGetMyProducts';

const ProductPage = () => {
  const {data:getMyProducts, isLoading} = useGetMyProducts();
  return (
    <div className='flex justify-between px-20 py-10 h-screen bg-slate-200 box-border'>
      <Sidebar />
      <div className='bg-white px-14 w-full drop-shadow-xl rounded-sm'>
        <div className='flex h-28 justify-between'>
            <div className='flex flex-col gap-1 self-center'>
            <h2 className='text-3xl font-medium cursor-default'>My Profile</h2>
            <p className='font-semibold text-slate-400 cursor-default'>Manage and protect your account</p>
            </div>

            <button className="btn border border-black mr-10 flex self-center" onClick={()=>document.getElementById('my_modal_1').showModal()}>Create Products</button>
              <dialog id="my_modal_1" className="modal">
                
                <div className="modal-box">
                  <div className="modal-action bg-blue-100 -mt-4">
                    <div className='flex  gap-2 flex-row-reverse'>
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-circle absolute -ml-2 btn-xs ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                    </form>
                    </div>
                  </div>
                  <CreateProduct />
                </div>
              </dialog>
        </div>
        <div className=''>
            <hr className='mx-auto'></hr>
        </div>
        <div className='flex flex-wrap gap-4 py-10 h-5/6 overflow-auto scrollbar-thin'>
          {!isLoading && getMyProducts.map((product) => (
            <Listing key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage