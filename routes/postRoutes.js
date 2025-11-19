const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig'); // Import the Cloudinary storage engine
const upload = multer({ storage: storage }); // Initialize multer with the Cloudinary storage engine
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); 
const path = require('path'); // <-- ADD THIS LINE
const Post = require(path.join(__dirname, '..', 'models', 'Post')); // <-- REPLACE LINE 4 WITH THIS

// @route   POST /api/posts
// @desc    Create a new Lost or Found post (MVP feature)
// @access  Public (Anyone can submit a post)
// @route   POST /api/posts
// @desc    Create a new Lost or Found post with image upload
// @access  Public
// Use the 'upload' middleware here, specifying the field name 'file' for the image
router.post('/', upload.single('file'), async (req, res) => {
    try {
        // 1. Check if the image file was uploaded
        if (!req.file) {
            // If the upload failed, Multer/Cloudinary will often return an error here.
            return res.status(400).json({ msg: 'Image file is required for the post.' });
        }

        // Get the secure image URL (This path is the URL from Cloudinary)
        const imageUrl = req.file.path; 
        
        // 2. Create the new post object using the uploaded URL and form data (req.body)
        const newPost = new Post({
            title: req.body.title,
            type: req.body.type,
            details: req.body.details,
            location: req.body.location,
            image: imageUrl, // Use the REAL URL from Cloudinary
            // approved defaults to false
        });

        // 3. Save the post (with the image URL) to MongoDB
        const post = await newPost.save();

        // 4. Send a success message back
        res.json({ msg: 'Post submitted successfully. Waiting for admin approval. Image uploaded.', post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during post submission or image upload.');
    }
});

// @route   GET /api/posts/public
// @desc    Get all APPROVED Lost and Found posts (The main feed for searching)
// @access  Public
router.get('/public', async (req, res) => {
    try {
        // Find all posts where the 'approved' field is set to true
        const posts = await Post.find({ approved: true }); 
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching public posts');
    }
});

// ----------------------------------------------------
// INSERT NEW CODE BLOCK 2 (ADMIN QUEUE) HERE
// ----------------------------------------------------

// @route   GET /api/posts/admin-queue
// @desc    Get all UNAPPROVED posts (Admin Approval Queue)
// @access  Private 
router.get('/admin-queue', async (req, res) => {
    try {
        // Find all posts where the 'approved' field is set to false
        const posts = await Post.find({ approved: false }); 
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching admin queue');
    }
});

// @route   PUT /api/posts/approve/:id
// @desc    Admin sets the 'approved' field to true for a post
// @access  Private (Admin Role)
router.put('/approve/:id', async (req, res) => {
    try {
        // ... inside the try block of router.put('/approve/:id', ...)
        const { id } = req.params; // Get the ID from the URL
        // 🚨 ADD THIS ID VALIDATION CHECK 🚨
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid Post ID format.' });
        }

        // Use Post.findByIdAndUpdate to find the post and update the field in one step
        let post = await Post.findByIdAndUpdate(
            id, 
            { $set: { approved: true } }, // $set tells MongoDB which fields to update
            { new: true } // { new: true } ensures the response returns the updated (approved) post
        );

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json({ msg: 'Post successfully approved and moved to public feed.', post });

    } catch (err) {
        console.error(err.message);
        // This often catches errors if the ID format is wrong
        res.status(500).send('Server Error during approval process');
    }
});

module.exports = router;