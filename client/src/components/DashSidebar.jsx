import { Sidebar } from 'flowbite-react'
import React from 'react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi'
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
        setTab(tabFromUrl);
        }
    }, [location.search]);
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
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup >
                <Sidebar.Item active={tab === "profile"}
                            as={Link}
                            to='/dashboard?tab=profile'
                            icon={HiUser} 
                            label={"User"} 
                            labelColor='dark'
                >
                        Profile
                    </Sidebar.Item>
                <Sidebar.Item onClick={handleSignout} className='cursor-pointer' icon={HiArrowSmRight}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
