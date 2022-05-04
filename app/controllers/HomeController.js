class HomeController {
    home(req, res) {
        console.log("test");
        res.render('home');
    }

}

module.exports = new HomeController