module.exports = function(app){
    app.get('/', function(req, res){
        if(req.isAuthenticated()){
            res.render('index');
        }else{
            res.render('login');
        }
    });
}