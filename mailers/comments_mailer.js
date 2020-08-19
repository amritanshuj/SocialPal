const nodeMailer = require('../config/nodemailer');
const Post = require('../models/post');
// this is another way of exporting a method
exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'contact.socialpal@gmail.com',
        to: comment.user.email,
        subject: "Your comment has been published!",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        } 
       // console.log('Message sent', info);
        return;
    })
} 

exports.newCommentonPost = (post, comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment: comment, post: post}, '/comments/new_comment_post.ejs');
    nodeMailer.transporter.sendMail({
        from: 'contact.socialpal@gmail.com',
        to: post.user.email,
        subject: "New Comment on Your Post!",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    })
} 