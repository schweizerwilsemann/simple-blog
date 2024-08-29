import { FileInput, Select, TextInput, Button } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold '> 
            CREATE A TOPIC
        </h1>
        <form className='flex flex-col gap-4 '>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1 '/>
                <Select>
                    <option value='uncategorized'>Select a category</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='reactjs'>React.js</option>
                    <option value='nextjs'>Next.js</option>

                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-300 border-dashed p-3">
                <FileInput type='file' accept='image/*'/>
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>
                    Upload Image
                </Button>
            </div>
                <ReactQuill required theme='snow' placeholder='Write something in your mind . . .' className='h-72 mb-12'/>
                <Button type='submit' gradientDuoTone='tealToLime'><div className="text-lg text-purple-800">Post</div></Button>
        </form>
    </div>
  )
}
