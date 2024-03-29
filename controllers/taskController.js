const Task = require('../models/task.js'),
	User = require('../models/user.js'),
	Project = require('../models/project.js');

class TaskController {

	static create(req, res) {
		//cek target date, harus lebih besar dari tanggal task dibuat
		let testDate = new Date(req.body.targetDate) > new Date()
		if (req.body.title && req.body.description && testDate) {
			let task = new Task({
				title: req.body.title,
				description: req.body.description,
				targetDate: req.body.targetDate
			})
			task.save().then(taskResult => {
					if (req.body.projectId) {
						Project.findById(req.body.projectId)
							.then(project => {
								project.update({
										$push: {
											TaskId: taskResult._id
										}
									})
									.then(result => {
										res.status(200).json("success create task on project")
									})
									.catch(error => {
										res.status(500).json({
											"error": "can't vote for your own article or comment! "
										})
									})
							})
							.catch(error => {
								res.status(500).json({
									error: error.message
								})
							})
					} else {
						User.update({
							_id: req.decode.id
						}, {
							$push: {
								TaskId: taskResult._id
							}
						}, (err) => {
							if (err) {
								console.log(error)
								res.status(500).json({
									"error": "can't vote for your own article or comment! "
								})
							} else {
								res.status(200).json("success create task on user")
							}
						})
					}
				})
				.catch(error => {
					console.log(error)
					res.status(500).json({
						error: error.message
					})
				})
		} else {
			res.status(400).json({
				error: "Please insert valid Todo Title, or description, or target date! "
			})
		}
	}

	static read(req, res) {
		User.findOne({
				_id: req.decode.id
			})
			.populate('TaskId')
			.populate('InvitationId')
			.then(result => {
				let userObj = {}
				userObj.invitation = result.InvitationId,
				userObj.task = result.TaskId,
				userObj.projects = result.ProjectId;
				res.status(200).json(userObj)
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({
					error: "Something wrong, please call developer!"
				})
			})
	}


	static readOne(req, res) {
		Task.findOne({
				_id: req.params.id
			})
			.then(task => {
				res.status(200).json(task)
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({
					error: "Something wrong, please call developer!"
				})
			})
	}

	static update(req, res) {
		let testDate = new Date(req.body.targetDate) > new Date()
		if (req.body.title && req.body.description && req.body.status && testDate) {
			Task.findOne({
					_id: req.params.id
				})
				.then(task => {
					task.title = req.body.title,
					task.description = req.body.description,
					task.status = req.body.status,
					task.targetDate = req.body.targetDate
					task.save().then(taskResult => {
							res.status(200).json({
								message: "Success change task!"
							})
						})
						.catch(error => {
							console.log(error)
							res.status(500).json({
								error: "Something wrong, please call developer!"
							})
						})
				})
				.catch(error => {
					console.log(error)
					res.status(500).json({
						error: "Something wrong, please call developer!"
					})
				})
		} else {
			res.status(400).json({
				error: "Please insert valid Todo Title, or description, or status, or target date! "
			})
		}
	}

	static delete(req, res) {
		Task.findOneAndRemove({
				_id: req.params.id
			})
			.then(result => {
				User.findOne({
						TaskId: req.params.id
					})
					.then(result_user => {
						result_user.update({
								$pull: {
									TaskId: req.params.id
								}
							})
							.then(result => {
								res.status(200).json("success delete task on user")
							})
							.catch(error => {
								res.status(500).json({
									"error": "can't vote for your own article or comment! "
								})
							})
					})
					.catch(error => {
						res.status(500).json({
							"error": "can't vote for your own article or comment! "
						})
					})
			})
			.catch(error => {
				res.status(500).json({
					error: "Something wrong, please call developer!"
				})
			})
	}

	static changeStatus(req, res) {
		Task.findOne({
				_id: req.params.id
			})
			.then(task => {
				if (task.status === 'done') {
					task.status = 'not done'
				} else {
					task.status = 'done'
					task.doneDate = new Date()
				}
				task.save().then(result_task => {
						res.status(200).json(result_task)
					})
					.catch(err => {
						console.log(error)
						res.status(500).json({
							error: "Something wrong, please call developer!"
						})
					})
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({
					error: "Something wrong, please call developer!"
				})
			})
	}

};

module.exports = TaskController;