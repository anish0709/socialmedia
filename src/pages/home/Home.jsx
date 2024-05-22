import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ setShowNavbar }) => {
    const [post, setPost] = useState({
        title: '',
        description: '',
        image: '',
        time: new Date().toLocaleTimeString(),
        likesCount: 0 // CHANGE: Initialize likesCount
    });

    const [savedPosts, setSavedPosts] = useState([]);
    setShowNavbar(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPost({ ...post, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let emailid = JSON.parse(localStorage.getItem('USERDATA'));
        let save = { ...post, ["email"]: emailid.email, ["id"]: uuidv4() };

        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = [...storedPosts, save];
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setSavedPosts(updatedPosts);
        setPost({ title: '', description: '', image: '', likesCount: 0 }); // CHANGE: Reset likesCount
    };

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setSavedPosts(storedPosts);
    }, []);

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h1 className="mb-4">Create a Post</h1>
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={post.title}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={post.description}
                        required
                        onChange={handleChange}
                        rows="3"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Attachment:</label>
                    <input
                        type="file"
                        className="form-control"
                        required
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>

            <div className="mt-5">
                <Link to="/allpost">
                    <button className="btn btn-success me-2">All Posts</button>
                </Link>
                <Link to="/mypost">
                    <button className="btn btn-secondary">My Posts</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
