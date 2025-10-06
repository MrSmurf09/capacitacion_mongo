import User from '../models/user.mjs';
import passport from 'passport';

export const signupForm = (req, res) => {
  res.render('auth/signup');
};

export const signinForm = (req, res) => {
  res.render('auth/signin');
};

export const signup = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (password !== confirm_password) {
    req.flash('error_msg', 'Passwords do not match!');
    res.redirect('/auth/signup');
  }
  if (!name) {
    errors.push({ text: 'Name is required!' });
  }
  if (!email) {
    errors.push({ text: 'Email is required!' });
  }
  if (!password) {
    errors.push({ text: 'Password is required!' });
  }
  if (!confirm_password) {
    errors.push({ text: 'Confirm Password is required!' });
  }
  if (errors.length > 0) {
    res.render('auth/signup', { errors, name, email });
    return;
  } else {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      req.flash('error_msg', 'Email already exists!');
      res.redirect('/auth/signup');
    } else {
      const user = new User({ name, email, password });
      user.password = await user.encryptPassword(password);
      await user.save();
      req.flash('success_msg', 'Account created successfully!');
      res.redirect('/auth/signin');
    }
  }
};

export const signin = passport.authenticate('local', {
  successRedirect: '/notes/all',
  failureRedirect: '/auth/signin',
  failureFlash: true,
});

export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'You have been logged out!');
    res.redirect('/');
  });
};
