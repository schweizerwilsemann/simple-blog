import { timeStamp } from "console";
import mongoose from "mongoose";


const postChema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    } ,
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: 'https://optinmonster.com/wp-content/uploads/2015/04/typesofblogposts.png'
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
}, {timestamps:true});

const Post = mongoose.model('Post', postChema);
export default Post;