import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar' ;
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';



export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormdata] = useState({});
    const [publishError, setPublishError] = useState(null);
    const {postId} = useParams();


    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user);

    useEffect(() =>{
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                
                if(!res.ok){
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if(res.ok) {
                    setPublishError(null);
                    setFormdata(data.posts[0]);
                }
            };
            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    }, [postId])
    
    const handleUploadImage = async () => {
        try {
            if(!file){
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                setImageUploadProgress(progress.toFixed(0));
            }, (error) => {
                    setImageUploadError('Image upload fail!');
                    setImageUploadProgress(null);
                },
            () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormdata({...formData, image: DownloadURL});
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(">>> Check error: ", error);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok){
                setPublishError(data.message);
                return;
            }
            
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }

        } catch (error) {
            setPublishError('Something went wrong');
        }
    }
    
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold '> 
            UPDATE YOUR POST
        </h1>
        <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1'
                    onChange={(event) => setFormdata({...formData, title: event.target.value})}
                    value={formData.title}
                />
                <Select value={formData.category} onChange={(event) => setFormdata({...formData, category: event.target.value})}>
                    <option value='uncategorized'>Select a category</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='reactjs'>React.js</option>
                    <option value='nextjs'>Next.js</option>

                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-300 border-dashed p-3">
                <FileInput type='file' accept='image/*' onChange={(event)=>setFile(event.target.files[0])}/>
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                    {
                        imageUploadProgress ? 
                            <div className="w-16 h-16">
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress||0}%`}/>
                            </div> :
                       ( 'Upload Image')
                    }
                </Button>
            </div>
                {
                    imageUploadError && (
                        <Alert color='failure'>
                            {imageUploadError}
                        </Alert>
                    )
                }
                {formData.image && (
                    <img src={formData.image} alt="upload" className='w-full h-72 object-cover'/>
                )}
                <ReactQuill required 
                            value={formData.content}
                            theme='snow' 
                            placeholder='Write something in your mind . . .' 
                            className='h-72 mb-12'
                            onChange={(value) => setFormdata({...formData, content: value})}            
                />
                <Button type='submit' gradientDuoTone='tealToLime'><div className="text-lg text-purple-800">Update</div></Button>
                {
                    publishError && <Alert color='failure' className='mt-5'>{publishError}</Alert>
                }
        </form>
    </div>
  )
}
