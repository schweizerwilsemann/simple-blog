import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});

  const {loading, error: errorMessage} = useSelector(state => state.user); 
  const disPatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim()});
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!formData.email || !formData.password){
      return disPatch(signInFailure('Please fill out all fields! '));
    }
    try {
      disPatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        disPatch(signInFailure(data.message));
      }
      
      if(res.ok) {
        disPatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      disPatch(signInFailure(data.message));

    }
  };
  return (
    <>
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
            This is a demo project. You can sign in with email
            and password, or with Google
          </p>
        </div>
        <div className="flex-1">
          {/* right side */}
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            
            <div className="">
              <Label value='Your Email'/>
              <TextInput 
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value='Your Password'/>
              <TextInput 
                type='password'
                placeholder='************'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button 
              gradientDuoTone='tealToLime' 
              type='submit' 
              disabled={loading} >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth></OAuth>
          </form>
          <div className="flex gap-2 text-sm mt-2">
            <span>Do not have an account?</span>
            <Link to='/sign-up' className='text-blue-400'>Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
      
    </div>
    
    </>
  )
}
