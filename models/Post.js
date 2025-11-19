const mongoose = require('mongoose');

// This defines the structure of a single Lost/Found item
const PostSchema = new mongoose.Schema({
    // 1. What was lost/found (e.g., Keys, Wallet, Dog)
    title: { 
        type: String, 
        required: true 
    },
    // 2. Is it a Lost or Found item?
    type: { 
        type: String, 
        required: true, 
        enum: ['Lost', 'Found'] 
    },
    // 3. Details/Description 
    details: { 
        type: String, 
        required: true 
    },
    // 4. Location where it was lost/found 
    location: { 
        type: String, 
        required: true 
    },
    // 5. The URL for the uploaded image  (using Cloudinary, as suggested [cite: 12])
    image: { 
        type: String, 
        required: true 
    },
    // 6. Date the post was created
    postDate: { 
        type: Date, 
        default: Date.now 
    },
    // 7. Admin approval status [cite: 8, 11] (Default is false, so it goes to the Admin Approval Queue)
    approved: { 
        type: Boolean, 
        default: false 
    } 
});

// This line registers the schema as a usable model named 'Post'

module.exports = mongoose.model('Post', PostSchema);
