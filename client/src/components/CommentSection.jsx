import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import { useNavigate } from 'react-router-dom';

export default function CommentSection({postId}) {
    const {currentUser} = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([])
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(comment.length > 200){
            return;
        }
        try {
            const res = await fetch (`/api/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({content: comment, postId, userId: currentUser._id}),
            });
            const data = await res.json();
            console.log(data);
            if(res.ok){
                setComment('');
                setCommentError(null);
                setComments([data, ...comments])
            }
            
        } catch (error) {
            setCommentError(error.message);        
        }
    };

    const handleLike = async(commentId) => {
        try {
            if(!currentUser){
                navigate('/sign-in');
                return; 
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`,{
                method: 'PUT',
            });
            if(res.ok){
                const data = await res.json();
                setComments(
                    comments.map((comment) => 
                        comment._id === commentId ? 
                        {
                            ...comment,
                            likes: data.likes,
                            numberOfLikes: data.likes.length,
                        }
                        : comment
                    )
                )
            };
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if(res.ok){
                    const data = await res.json();
                    setComments(data);
                }

            } catch (error) {
                console.log(">>>Check comments error: ", error.message);
            }
        }
        getComments();
    }, [postId])
    return (
    <div className='max-w-2xl mx-auto w-full p-3 '>
        {currentUser ? (
            <div className="flex items-center gap-1 my-5 text-gray-500 text-sm ">
                <p>Logged in as: </p>
                <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
                <Link to={`/dashboard?tab=profile`} className='text-xs text-cyan-700 dark:text-teal-200 hover:underline'>
                    @{currentUser.username}
                </Link>
            </div>
        ) : (
            <div className="text-sm text-cyan-700 dark:text-teal-200 flex gap-1">
                You must be logged in to comment!
                <Link to='/sign-in' className='text-rose-500 hover:underline'>
                    Log in 
                </Link>
            </div>
        )}
        {currentUser && (
            <>
                <form onSubmit={handleSubmit}
                    className='border border-teal-500  rounded-md p-3'>
                    <Textarea placeholder='Add a comment . . .' 
                            rows='3' 
                            onChange={(event) => setComment(event.target.value) }
                            value={comment}
                            maxLength='200' 
                    />
                    <div className="flex justify-between items-center mt-5">
                        <p className='text-gray-500 text-xs'> 
                            {200 - comment.length} characters remaining
                        </p>
                        <Button outline gradientDuoTone='purpleToBlue' type='submit'>Comment</Button>
                    </div>
                </form>
                {commentError && (
                    <Alert color='failure' className='mt-5'>
                        {commentError}
                    </Alert>
                )}
                {comments.length  === 0 ? (
                    <p className='text-sm my-5'>No comments yet!</p>
                ): (
                    <>
                        <div className="text-sm my-5 flex items-center gap-1">
                            <p>Comments</p>
                            <div className="border border-gray-400 py-2 px-3 rounded-sm">
                                <p>{comments.length}</p>
                            </div>
                        </div>
                        {
                            comments.map((comment) => (
                                <Comment key={comment._id}
                                    comment={comment}
                                    onLike={handleLike}
                                />
                            ))
                        }
                    </>
                )}
            </>
        )}
    </div>
  )
}
