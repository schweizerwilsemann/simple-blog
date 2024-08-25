import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex flex-col p-3 max-w-3xl mx-auto md:flex-row md:items-center gap-5">
      {/* left side */}
      <div className='flex-1'>
          <Link to="/" className='font-semibold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
            via-blue-300 to bg-green-300 rounded-lg text-yellow-50'>QQ </span>
            博客
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign up with email
            and password, or with Google
          </p>
        </div>
        <div className="flex-1">
          {/* right side */}
          <form className='flex flex-col gap-4'>
            <div className="">
              <Label value='Your Username'/>
              <TextInput 
                type='text'
                placeholder='Username'
                id='username'
              />
            </div>
            <div className="">
              <Label value='Your Email'/>
              <TextInput 
                type='text'
                placeholder='name@company.com'
                id='email'
              />
            </div>
            <div className="">
              <Label value='Your Password'/>
              <TextInput 
                type='text'
                placeholder='Password'
                id='password'
              />
            </div>
            <Button gradientDuoTone='tealToLime' type='submit'>Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-2">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-400'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
