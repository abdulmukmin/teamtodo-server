const User = require('../models/user.js'),
      jwt = require('jsonwebtoken'),
      mailer = require('../helpers/mailer');
require('dotenv').config();

class UserController {

  static create(req, res) {
    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          let subject = `Pemberitahuan Account Team Todo Anda`
          let resultText = `Seseorang sedang mencoba mendaftarkan akun menggunakan email anda`
          mailer ( req.body.email, subject, resultText,(err) => {
            if (err) {
              console.log(err.message)              
              res.status(500).json({ error: "Uuupss something wrong, please call developer" });
            }
            else {
              res.status(400).json(
                "Please check your email for next registration process!"
              )
            }
          });

        } else {
          let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          });
          newUser.save((err, result) => {
            if (err) {
              console.log(err.message)              
              res.status(500).json({ error: "Uuupss something wrong, please call developer" });
            }
            else res.status(201).json({
              result: "Success create new user.."
            });
          });
        };
      })
      .catch(error => {
        console.log(error.message)
        res.status(500).json({
          error: "Uuupss something wrong, please call developer"
        })
      });
  }

  static login(req, res) {
    if (req.body.identity && req.body.password) {
      User.findOne({
          $or: [{
            username: req.body.identity
          }, {
            email: req.body.identity
          }]
        })
        .then(user => {
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) res.status(500).json({
              error: "email or password didn't match, please try again!"
            })
            else {
              if (isMatch) {
                let data = {
                  id: user._id,
                  email: user.email
                }
                jwt.sign(data, process.env.jSecret, (err, token) => {
                  if (err) {
                    console.log(err)
                    res.status(500).json({
                      error: "Something wrong, please contact developer!"
                    })
                  } else {
                    res.status(200).json(token)
                  }
                });
              } else {
                res.status(400).json({
                  error: "email or password didn't match, please try again!"
                })
              };
            };
          });
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({
            error: "Something wrong, please contact developer!"
          })
        })
      } else {
        res.status(400).json({
          error: "Please insert valid email or username or password!"
        })
      }
  }
  
};

module.exports = UserController;