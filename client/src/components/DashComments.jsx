import React, { useEffect, useState }  from 'react'
import { useSelector } from 'react-redux'
import {Table, Modal, Button} from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';


export default function DashComments() {
  const {currentUser} = useSelector(state => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchComments =  async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if(res.ok){
          setComments(data.comments);
          if(data.comments.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(">>> check error: ", error);
      }
    };
    if(currentUser.isAdmin){
      fetchComments()
    }
  }, [currentUser._id]);
  const handleShowMore = async() =>{
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`); 
                              
      const data = await res.json();
      if(res.ok){
        setComments((prev) => [...prev, ...data.comments]);
        if(data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(">>> error: ", error.message);
    }
  }
  const handleDeleteComment = async () => {
    setShowModal(false)
    try {
        setShowModal(false);
        const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,{
            method: 'DELETE',
        });
        const data = await res.json();
        if(!res.ok) {
            console.log(">>> check error: ", data.message);
        }
        else{
            setComments((prev) => prev.filter((comment) =>comment._id !== commentIdToDelete));
        }
    } catch (error) {
        console.log(">>> check delete user: ", error.message);
    }
  }
  
  return (
    <div className='table-auto 
                    overflow-x-scroll 
                    md:mx-auto p-3 
                    scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
                    dark:scrollbar-track-slate-700
                    dark:scrollbar-thumb-slate-500
    '>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comments' Content</Table.HeadCell>
              <Table.HeadCell> Number of likes</Table.HeadCell>
              <Table.HeadCell> PostId</Table.HeadCell>
              <Table.HeadCell>userId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className='divide-y' key={comment._id}>
                <Table.Row className='bg-white dark:border-grey-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                        {comment.content}
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span onClick={() =>{setShowModal(true), setCommentIdToDelete(comment._id)}} 
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
        <p>No comments to show</p>
      )}
      < Modal show={showModal} 
                onClose={() => setShowModal(false)} 
                popup 
                size='md'
        >
            <Modal.Header  className='bg-red-300'/>
            <Modal.Body  className='bg-red-300'>
                <div className="text-center">
                    <HiOutlineExclamationCircle className='h-14 w-14 text-indigo-700 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-indigo-900 dark:text-gray-200'>Are you sure to delete this comment?</h3>
                </div>
                <div className="flex justify-center gap-4">
                    <Button className='bg-indigo-800' onClick={() => handleDeleteComment()}>
                        Yes, I'm Sure
                    </Button>
                    <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}
