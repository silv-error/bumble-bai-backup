import React, { useRef, useState } from 'react'
import useUpdateImage from '../../hooks/useUpdateImage';
import { useAuthContext } from '../../context/UserAuthContext';

const EditProfileImage = () => {
    const {authUser} = useAuthContext();

    const [profileImg, setImg] = useState(null);
    const imgRef = useRef(null);

    const {updateImage, loading} = useUpdateImage();

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div className='w-5/12 p-4 flex flex-col items-center gap-4 border-l border-slate-400'>
            <img src={profileImg || authUser?.profileImg || '/boy1.png'} className='rounded-full overflow-hidden size-40' />
            {!profileImg ? (
                <button 
                className='btn border border-black'
                onClick={() => imgRef.current.click()}
            >Select Image</button>
            ) : 
            <button className='btn border border-black bg-yellow-300 hover:bg-yellow-400'
                onClick={async () => {
                    await updateImage({profileImg});
                    setImg(null);
                }}
            >
                {loading? "Loading..." : "Save Changes"}
            </button>}
            <input type='file' hidden ref={imgRef} accept='image/*' onChange={handleImgChange} />
            <div className='text-slate-500'>
                File size: maximum 5 MB<br></br>
                File extension: JPEG, PNG
            </div>
        </div>
  )
}

export default EditProfileImage