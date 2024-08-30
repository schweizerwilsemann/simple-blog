import React, { useEffect, useState }  from 'react'
import { useSelector } from 'react-redux'
import {Table, Modal, Button} from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';


export default function DashUsers() {
  const {currentUser} = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers =  async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if(res.ok){
          setUsers(data.users);
          if(data.users.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(">>> check error: ", error);
      }
    };
    if(currentUser.isAdmin){
      fetchUsers()
    }
  }, [currentUser._id]);
  const handleShowMore = async() =>{
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`); 
                              
      const data = await res.json();
      if(res.ok){
        setUsers((prev) => [...prev, ...data.users]);
        if(data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(">>> error: ", error.message);
    }
  }
  const handlieDeleteUser = async () => {

  }
  
  return (
    <div className='table-auto 
                    overflow-x-scroll 
                    md:mx-auto p-3 
                    scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
                    dark:scrollbar-track-slate-700
                    dark:scrollbar-thumb-slate-500
    '>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Users' Image</Table.HeadCell>
              <Table.HeadCell> Usernname</Table.HeadCell>
              <Table.HeadCell> Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className='divide-y' key={user._id}>
                <Table.Row className='bg-white dark:border-grey-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                      <img src={user.profilePicture} alt={user.username} className=' w-10 h-10 object-cover bg-gray-500 rounded-full'/>
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-rose-500'/>)} </Table.Cell>

                  <Table.Cell>
                    <span onClick={() =>{setShowModal(true), setUserIdToDelete(user._id)}} 
                          className='font-medium text-red-500 dark:text-orange-500 hover:underline cursor-pointer
                    '>Delete</span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                Show More
              </button>
            )
          }
        </>
      ) : (
        <p>You have no post yet</p>
      )}
      < Modal show={showModal} 
                onClose={() => setShowModal(false)} 
                popup 
                size='md'
        >
            <Modal.Header  className='bg-lime-200'/>
            <Modal.Body  className='bg-lime-200'>
                <div className="text-center">
                    <HiOutlineExclamationCircle className='h-14 w-14 text-cyan-500 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-indigo-900 dark:text-gray-200'>Are you sure to delete this user?</h3>
                </div>
                <div className="flex justify-center gap-4">
                    <Button className='bg-cyan-500' onClick={() => handleDeleteUser()}>
                        Yes, I'm Sure
                    </Button>
                    <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}
