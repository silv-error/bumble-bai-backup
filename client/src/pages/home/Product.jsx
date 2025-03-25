import React from 'react'
import '../../styles/swipe.css'
import useConversation from '../../zustand/useConversation.js'
import { useQueryClient } from '@tanstack/react-query'

const Product = ({product}) => {

    const queryClient = useQueryClient();
    const {setSelectedConversation} = useConversation();
    return (
        <>
        {/* <!-- item Card --> */}
        {/* {% for product in products %} */}
        <div className="swipe-card absolute w-full h-full bg-white rounded-2xl shadow-sm overflow-hidden"
            data-z-index="{{ loop.revindex }}"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}>
            
            {/* <!-- item Image --> */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
            <span className='absolute pl-2 text-white rounded-lg'>@{product.user.username}</span>
                <img 
                    src={product.productImg} 
                    alt="" 
                    className="w-full h-full object-cover object-center"
                />
            </div>
            
            {/* <!-- item Info --> */}
            <div className="p-4 w-full">
                <div className='flex justify-between flex-wrap'>
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <button className='btn btn-xs'
                    onClick={async () => {
                        await setSelectedConversation(product.user),
                        await queryClient.invalidateQueries({queryKey: ["messages"]})
                    }}
                > Message </button>
                </div>
                <p className='text-slate-400'>{product.category}</p>
                <p className="text-gray-600 text-sm float-left h-screen w-40 flex flex-wrap overflow-visible whitespace-normal"> 
                    {product.productDetails} 
                </p>
                <p className='flex justify-end'>₱{product.price.toLocaleString()}.00</p>
            </div>

        </div>
        {/* {% endfor %} */}
        </>
    )
}

export default Product