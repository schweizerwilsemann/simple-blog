import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import {useSelector, useDispatch} from "react-redux"
import { toggleTheme } from '../redux/theme/themeSlice.js'
import { signOutSuccess } from '../redux/user/userSlice.js'


export default function Header() {
    const path = useLocation().pathname;
    const {currentUser} = useSelector(state => state.user); 
    const dispatch = useDispatch();
    const {theme} = useSelector(state => state.theme);
    const handleSignout = async () => {
        try {
            const res = await fetch(`/api/user/signout`, {
                method: 'POST',
            });
            const data = await res.json()
            if(!res.ok){
                console.log(">>> Check sign out error: ", data.error);
            }
            else{
                dispatch(signOutSuccess());
            }
        } catch (error) {
            console.log(">>> check sign out error: ", error.message);
        }
    }
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm 
        sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
             via-blue-300 to bg-green-300 rounded-lg text-yellow-50'>QQ </span>
            博客
        </Link>
        <form>
            <TextInput type='text' 
                placeholder='Search...' 
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10' color='gray' pill>
            <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' 
                    color='grey' 
                    pill 
                    onClick={() => dispatch(toggleTheme())}
                    >
                {theme === 'light' ? <FaMoon/> : <FaSun/>}
            </Button>
            {currentUser ? (
                <Dropdown arrowIcon='false' inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded/>}>
                    <Dropdown.Header>
                        <span className=' block text-sm'>
                            <span className='font-bold'>Username: </span> 
                            {currentUser.username}
                        </span>
                        <span className=' block text-sm truncate'>
                            <span className='font-bold' >Email: </span> 
                            {currentUser.email}
                        </span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                </Dropdown>
            ): 
                <Link to='/sign-in' >
                    <Button gradientDuoTone='tealToLime'>
                        Sign In
                    </Button>
                </Link>
            }

            <Navbar.Toggle />
        </div>  
        <Navbar.Collapse>
                <Navbar.Link active={path=== "/"} as={'div'} >
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path=== "/about"} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path=== "/projects"} as={'div'}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}
