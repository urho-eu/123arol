/**
 * Checks if a user session exists.
 * Used by protected pages.
 */
function checkSession(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

export { checkSession };