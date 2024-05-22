import React, { useEffect, useState } from 'react';
import { CiShare1 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const Mypost = ({ setShowNavbar }) => {
    setShowNavbar(true);
    const [data, setData] = useState([]);
    const [likes, setLikes] = useState([]);

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
        const user = JSON.parse(localStorage.getItem('USERDATA'));
        const allPosts = JSON.parse(localStorage.getItem('posts')) || [];

        const userPosts = allPosts.filter(post => post.email === user.email);
        setData(userPosts);

        const likedPostsFromLocalStorage = JSON.parse(localStorage.getItem('likedposts')) || [];
        setLikes(likedPostsFromLocalStorage);
    }, []);

    const handleLike = (id) => {
        let updatedLikes;
        let updatedPosts = [...data];
        let postIndex = updatedPosts.findIndex(post => post.id === id);

        if (likes.includes(id)) {
            updatedLikes = likes.filter(e => e !== id);
            if (updatedPosts[postIndex].likesCount > 0) {
                updatedPosts[postIndex].likesCount -= 1;
            }
        } else {
            updatedLikes = [...likes, id];
            if (updatedPosts[postIndex].likesCount) {
                updatedPosts[postIndex].likesCount += 1;
            } else {
                updatedPosts[postIndex].likesCount = 1;
            }
        }

        setData(updatedPosts);
        setLikes(updatedLikes);
        localStorage.setItem('likedposts', JSON.stringify(updatedLikes));
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return (
        <div className="container">
            {data.map((post) => (
                <div className="card mb-3" style={{ maxWidth: "540px" }} key={post.id}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={post.image} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.description}</p>
                                <p className="card-text"><small className="text-muted">{post.likesCount} likes</small></p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <button className="btn" onClick={() => handleLike(post.id)} style={{ color: likes.includes(post.id) ? "red" : "" }}>
                                <FaHeart />
                            </button>
                            <button className="btn" onClick={() => handleShare(post)} >
                                <CiShare1 />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Mypost;
