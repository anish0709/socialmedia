import React, { useEffect, useState } from 'react';
import { CiShare1 } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

const Allpost = ({ setShowNavbar }) => {
    setShowNavbar(true);
    const [data, setData] = useState([]);
    const [likes, setLikes] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState({});

    const handleAddComment = (postId) => {
        if (!commentInput.trim()) {
            return;
        }
        const updatedComments = { ...comments };
        if (!updatedComments[postId]) {
            updatedComments[postId] = [];
        }
        updatedComments[postId].push(commentInput);
        setComments(updatedComments);
        setCommentInput('');
        localStorage.setItem('comments', JSON.stringify(updatedComments));
    };

    const handleShare = (post) => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.description,
                url: window.location.href,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log('Web Share API is not supported in your browser.');
        }
    };

    useEffect(() => {
        let postsFromStorage = JSON.parse(localStorage.getItem('posts')) || [];
        setData(postsFromStorage);

        // Load the user's liked posts from localStorage
        let userLikesFromStorage = JSON.parse(localStorage.getItem('userLikedPosts')) || []; // CHANGE: Updated key to 'userLikedPosts'
        setLikes(userLikesFromStorage);

        let usercommentsfromstorage = JSON.parse(localStorage.getItem('comments') || []);
        setComments(usercommentsfromstorage);
    }, []);

    const handleLike = (id) => {
        let updatedLikes;
        let updatedPosts = [...data];
        let postIndex = updatedPosts.findIndex(post => post.id === id);

        if (likes.includes(id)) {
            updatedLikes = likes.filter(e => e !== id);
            updatedPosts[postIndex].likesCount -= 1; // Decrement the global likes count
        } else {
            updatedLikes = [...likes, id];
            updatedPosts[postIndex].likesCount += 1; // Increment the global likes count
        }

        setData(updatedPosts);
        setLikes(updatedLikes);

        // Save the user's liked posts to localStorage
        localStorage.setItem('userLikedPosts', JSON.stringify(updatedLikes)); // CHANGE: Updated key to 'userLikedPosts'
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return (
        <div className="container">
            {data.map((e) => (
                <div className="card mb-3" style={{ maxWidth: '540px' }} key={e.id}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={e.image} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{e.title}</h5>
                                <p className="card-text">{e.description}</p>
                                <p className="card-text">
                                    <small className="text-muted">{e.likesCount} likes</small> {/* Global likes count */}
                                </p>
                                <input
                                    type="text"
                                    placeholder="add a comment"
                                    value={commentInput}
                                    onChange={(e) => {
                                        setCommentInput(e.target.value);
                                    }}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleAddComment(e.id)}
                                >
                                    add a comment
                                </button>
                                {comments[e.id] &&
                                    comments[e.id].map((comment, index) => (
                                        <p key={index} className="card-text">
                                            {comment}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        <div className="d-flex">
                            <button
                                className="btn btn"
                                onClick={() => handleLike(e.id)}
                                style={{ color: likes.includes(e.id) ? 'red' : '' }}
                            >
                                <FaHeart />
                            </button>
                            <button className="btn btn" onClick={() => handleShare(e)}>
                                <CiShare1 />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Allpost;
