const isLoggedIn = (req, res, next) => {
  if(req.cookies.username) {
    // Pasar al siguiente paso de la petición
    next();
  } else {
    res.redirect('/register');
  }
};

export default isLoggedIn;