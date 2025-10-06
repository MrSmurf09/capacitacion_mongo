export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  req.flash('error_msg', 'You must be logged in to access this page!');
  return res.redirect('/auth/signin');
};
