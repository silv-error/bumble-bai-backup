import React, { useRef, useState } from 'react';
import useCreateProducts from '../../hooks/useCreateProducts';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        productDetails: "",
        productImg: ""
    });

    const [filename, setFileName] = useState("");
    const [isDragging, setIsDragging] = useState(false); // State to manage drag status
    const imgRef = useRef(null);

    const { createProduct, loading } = useCreateProducts();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProduct(formData);
        setFormData({
            title: "",
            price: "",
            category: "",
            productDetails: "",
            productImg: ""
        });
        setFileName("");
        // console.log(formData)
    }

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleImageInput = async (file) => {
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, productImg: reader.result }); // Update productImg in formData
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        handleImageInput(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false); // Reset dragging state
        const file = e.dataTransfer.files[0];
        handleImageInput(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Prevent default behavior to allow drop
        setIsDragging(true); // Set dragging state
    };

    const handleDragLeave = () => {
        setIsDragging(false); // Reset dragging state
    };

    return (
        <div className='w-full'>
            <h2 className='text-2xl font-medium'>Add New Products</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center mt-4'>
                    <label
                        className={`form-control w-full h-40 border border-black ${isDragging ? 'bg-gray-200' : ''}`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onDragLeave={handleDragLeave}
                    >
                        <div className="label">
                            <span className="label-text"></span>
                            <span className="label-text-alt"></span>
                        </div>
                        <div className='mx-auto my-auto'>
                            <img src='/upload.png' className='h-10 flex mx-auto' alt="Upload" />
                            <div className='flex gap-1 mt-1'>
                                <button
                                    type="button" // Change button type to prevent form submission
                                    className='bg-black text-white px-4 rounded-md'
                                    onClick={() => imgRef.current.click()}
                                >
                                    Select File
                                </button>
                                <h2>{filename || "or (Drag and Drop)"}</h2>
                            </div>
                        </div>
                        <input
                            type="file"
                            hidden
                            ref={imgRef}
                            className="file-input max-w-xs file-input-bordered w-96 flex mx-auto my-auto"
                            onChange={handleFileChange}
                        />
                        <div className="label">
                            <span className="label-text-alt"></span>
                            <span className="label-text-alt"></span>
                        </div>
                    </label>
                </div>
                <div className='mt-3'>
                    <div className='flex justify-between'>
                        <label className='flex flex-col'>
                            Title
                            <input
                                type="text"
                                placeholder="T-Shirt"
                                className="input input-bordered w-full max-w-xs"
                                name='title'
                                value={formData.title}
                                onChange={handleOnChange}
                            />
                        </label>
                        <label className='flex flex-col'>
                            Price
                            <input
                                type="number"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                defaultValue={0}
                                name='price'
                                value={formData.price}
                                onChange={handleOnChange}
                            />
                        </label>
                    </div>
                    <label className='flex flex-col'>
                        Category
                        <select
                            className='select rounded-md border'
                            defaultValue=""
                            name='category'
                            value={formData.category}
                            onChange={handleOnChange}
                        >
                            <option disabled value="">Select Category</option>
                            <option>Electronics</option>
                            <option>Clothing and Accessories</option>
                            <option>Home and Garden</option>
                            <option>Health and Beauty</option>
                            <option>Sports and Outdoors</option>
                            <option>Toys and Games</option>
                            <option>Automotive</option>
                            <option>Food and Beverages</option>
                        </select>
                    </label>
                    <label className='flex flex-col'>
                        Details
                        <textarea
                            className='textarea rounded-md border'
                            placeholder='Type here...'
                            name='productDetails'
                            value={formData.productDetails}
                            onChange={handleOnChange}
                        />
                    </label>
                    <button className='btn mt-10 w-full btn-primary'>
                        {loading? "Publishing..." : "Publish"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;