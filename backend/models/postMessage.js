import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },

})


// postSchema.pre('save', function (next) {
//     this.set('extraProp', 'hello', {
//         strict: false
//     });
//     next();
// });

const PostMassage = mongoose.model('PostMessage', postSchema)

export default PostMassage