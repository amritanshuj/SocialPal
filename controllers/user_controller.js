module.exports.profile = function(req, res){
    res.render('users.ejs',{
        title: "Users"
    });
}