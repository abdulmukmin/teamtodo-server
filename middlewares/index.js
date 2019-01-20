const jwt = require('jsonwebtoken'),
      User = require('../models/user.js');
require('dotenv').config();

class Middleware {
  static authentication(req, res, next) {
    let token = req.headers.jtoken
    if (token) {
      jwt.verify(token, process.env.jSecret, (err, result) => {
        if (err) {
          console.log(err)
          res.status(500).json({
            error: "Something wrong, please contact developer!"
          })
        } else {
          req.decode = result
          User.findById(req.decode.id)
            .then(result => {
              if (result) {
                next()
              } else {
                res.status(500).json({
                  error: "Something wrong, please contact developer!"
                })
              }
            })
            .catch(error => {
              console.log(error)
              res.status(500).json({
                error: "Something wrong, please contact developer!"
              })
            })
        };
      });
    } else {
      res.status(400).json({
        error: "Please login!"
      })
    }
  }

  static authorization(req, res, next) {
    User.findOne({
        _id: req.decode.id
      })
      .then(user => {
        let isUserTask = user.TaskId.filter(task => task._id == req.params.id)
        if (isUserTask.length !== 0) {
          next()
        } else {
          res.status(500).json({
            error: "Something wrong, please contact developer!"
          })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          error: "Something wrong, please contact developer!"
        })
      })
  }

  static authorizationProjectMember(req, res, next) {
    Project.findOne({
        _id: req.headers.projectid
      })
      .then(project => {
        let isUserCreatedProject = project.CreatedId == req.decode.id
        let isUserMemberProject = project.MemberId.filter(project => project._id == req.decode.id)
        if (isUserCreatedProject || isUserMemberProject.length !== 0) {
          next()
        } else {
          res.status(500).json({
            error: "Something wrong, please contact developer!"
          })
        }
      })
  }

};

module.exports = Middleware;