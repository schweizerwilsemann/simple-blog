import { Sidebar, Modal, Button } from 'flowbite-react';
import 'react-circular-progressbar/dist/styles.css';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import React from 'react'
import {HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiChartPie, HiAnnotation} from 'react-icons/hi'
import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';   

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tab = searchParams.get('tab');
        if (!searchParams.has('tab')) {
            navigate('/dashboard?tab=dash', { replace: true });
        }
        if(!tab) {
            navigate('/dashboard?tab=dash', { replace: true });
        }
    }, [location, navigate]);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
        setTab(tabFromUrl);
        }
    }, [location.search]);
    const handleSignout = async () => {
        setShowModal(false);
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
    };

    const handleConfirmSignout = () => {
        handleSignout(); // Gọi sự kiện sign out
        setShowModal(false); // Hiển thị modal
    };
    return (
        <>
            <Sidebar className='w-full md:w-56'>
                <Sidebar.Items>
                    <Sidebar.ItemGroup className='flex flex-col gap-2'>
                        {
                            currentUser && currentUser.isAdmin && (
                                 <Sidebar.Item active={tab === 'dash' || !tab}
                                            icon={HiChartPie}
                                            to='/dashboard?tab=dash'
                                            as={Link}
                                >
                                    Dashboard
                                </Sidebar.Item>
                            )
                        }
                        <Sidebar.Item active={tab === "profile"}
                                    as={Link}
                                    to='/dashboard?tab=profile'
                                    icon={HiUser} 
                                    label={currentUser.isAdmin ? 'admin' : 'user'} 
                                    labelColor='dark'
                        >
                                Profile
                            </Sidebar.Item>
                            {currentUser.isAdmin && (
                                <Sidebar.Item active={tab === 'posts'}
                                            icon={HiDocumentText}
                                            to='/dashboard?tab=posts'
                                            as={Link}
                                >
                                    Posts
                                </Sidebar.Item>
                                
                            )}
                            {currentUser.isAdmin && (
                                <Sidebar.Item active={tab === 'users'}
                                            icon={HiOutlineUserGroup}
                                            to='/dashboard?tab=users'
                                            as={Link}
                                >
                                    Users
                                </Sidebar.Item>
                                
                            )}
                            {currentUser.isAdmin && (
                                <Sidebar.Item active={tab === 'comments'}
                                            icon={HiAnnotation}
                                            to='/dashboard?tab=comments'
                                            as={Link}
                                >
                                    Comments
                                </Sidebar.Item>
                                
                            )}
                        <Sidebar.Item onClick={() => setShowModal(true)} 
                                    className='cursor-pointer' 
                                    icon={HiArrowSmRight}
                        >
                           Sign Out
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
            < Modal show={showModal} 
                onClose={() => setShowModal(false)} 
                popup 
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure to log out?</h3>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button className='bg-blue-600' onClick={() => handleConfirmSignout()}>
                            Yes, I'm Sure
                        </Button>
                        <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
  )
}


