# Team Todo API

Feature :

- Password encryption using "bcryptjs"
- Login random token using "JSONWEBTOKEN"

Other API Feature :

- Nodemailer API for user notification when someone try to register with other registerd user email.

replace "/api/"  with http://localhost:3000/ 

# Users Collection

## Sign Up User
---
Sign up with new user info

+ URL

    /api/users

+ Method

    POST

+ Require:

    + body content :

            {
                "username": "name...",
                "email": "email..",
                "password": "password..."
            }

+ Success Response:

    + Code:201
    + Content:

            {
                "result": "Success create new user.."
            }

+ Error Response:

    + Code:500
    + Content:

            {
                error:"Uuupss something wrong, please call developer!"
            }
    
    OR

    + Code:400
    + Content:

            {
                "Please check your email for next registration process!"
            }
---
## Sign In User
---
Sign in user

+ URL

    /api/users/login

+ Method

    POST

+ Require:

    body content :

            {
                "identity": "name or email of registered user..",
                "password": "password of registered user.."
            }

+ Success Response:

    + Code:200
    + Content:  

            {
                <random token here..>
            }

+ Error Response:

    + Code:400
    + Content: 

            {
                "error": "Please insert valid email or username or password!"
            }

    OR

    + Code:400
    + Content:

            {
                error: "email or password didn't match, please try again!"
            }
    
    OR

    + Code:500
    + Content:

            {
                error: "Uuupss something wrong, please call developer!"
            }
---

# Todo Collection

## Create
---
Create new personal todo

+ URL

    /api/tasks

+ Method

    POST

+ Require:

    + header content :

            {
                "jtoken": "token from login user here..."
            }
    + body content :

            {
                "username": "name...",
                "email": "email..",
                "password": "password..."
            }

+ Success Response:

    + Code:201
    + Content:
    
	        "success create task on user"
    

+ Error Response:

    + Code:400
    + Content:

            {
                error: "Please login!"
            }
    
    OR

    + Code:400
    + Content:

            {
                "error": "Please insert valid Todo Title, or description, or target date! "
            }

    OR

    + Code:500
    + Content:

            {
                error:"Uuupss something wrong, please call developer!"
            }
---
## Read all user todos
---
Display all user todos (only owned by user)

+ URL

    /api/tasks

+ Method

    GET

+ Require:

    + header content :

            {
                "jtoken": "token from login user here..."
            }

+ Success Response:

    + Code:200
    + Content:
    
            {
                "invitation": [],
                "task": [
                    {
                    "status": "not done",
                    "_id": "5c445492f0f6974757d8bac1",
                    "title": "test",
                    "description": "test",
                    "targetDate": "2019-01-21T17:00:00.000Z",
                    "__v": 0
                    }
                ],
                "projects": []
            }
    

+ Error Response:

    + Code:400
    + Content:

            {
                error: "Please login!"
            }
    
    OR

    + Code:500
    + Content:

            {
                error:"Uuupss something wrong, please call developer!"
            }
---

## Read one user todo
---
Display one user todo (only owned by user)

+ URL

    /api/tasks/<: todoid_here>

+ Method

    GET

+ Require:

    + header content :

            {
                "jtoken": "token from login user here..."
            }

+ Success Response:

    + Code:200
    + Content:
    
            {
                "status": "not done",
                "_id": "5c445492f0f6974757d8bac1",
                "title": "test",
                "description": "test",
                "targetDate": "2019-01-21T17:00:00.000Z",
                "__v": 0
            }
    

+ Error Response:

    + Code:400
    + Content:

            {
                error: "Please login!"
            }
    
    OR

    + Code:500
    + Content:

            {
                error:"Uuupss something wrong, please call developer!"
            }
---
## Update
---
Update user todo (only owned by user)

+ URL

    /api/tasks/ <: todoid_here>

+ Method

    PUT

+ Require:

    + header content :

            {
                "jtoken": "token from login user here..."
            }
    + body content example :

            {
                "title": "test",
                "description": "test",
                "targetDate": "01/22/2019",
                "status": "not done"
            }

+ Success Response:

    + Code:200
    + Content:
                
            {
                "message": "Success change task!"
            }
                

+ Error Response:

    + Code:400
    + Content:

            {
                error: "Please login!"
            }
    
    OR

    + Code:400
    + Content:

            {
                "error": "Please insert valid Todo Title, or description, or status, or target date! "
            }

    OR

    + Code:500
    + Content:

            {
                error:"Uuupss something wrong, please call developer!"
            }
---
## Delete
---
Delete user todo (only owned by user)

+ URL

    /api/tasks/ <: todoid_here>

+ Method

    DELETE

+ Require:

    + header content :

            {
                "jtoken": "token from login user here..."
            }
    + body content example :

            {
                "title": "test",
                "description": "test",
                "targetDate": "01/22/2019",
                "status": "not done"
            }

+ Success Response:

    + Code:200
    + Content:
                
            "success delete task on user"
                

+ Error Response:

    + Code:400
    + Content:

            {
                error: "Please login!"
            }

    OR

    + Code:500
    + Content:

            {
                error:"Uuupss something wrong, please call developer!"
            }
---
## Change Todo Status
---
Change user todo completion status (only owned by user)

+ URL

    /api/tasks/ <: todoid_here>

+ Method

    PATCH

+ Require:

    + header content :

            {
                "jtoken": "token from login user here..."
            }

+ Success Response:
    
    + Code:200
    + Status before changed = "done"
    + Content:
                
            {
                "status": "not done",
                "_id": "5c445492f0f6974757d8bac1",
                "__v": 0,
                "description": "test",
                "targetDate": "2019-01-21T17:00:00.000Z",
                "title": "test",
                "doneDate": "2019-01-20T11:54:11.312Z"
            }
    
    + Code:200
    + Status before changed = "not done"
    + Content:
                
            {
                "status": "done",
                "_id": "5c445492f0f6974757d8bac1",
                "__v": 0,
                "description": "test",
                "targetDate": "2019-01-21T17:00:00.000Z",
                "title": "test",
                "doneDate": "2019-01-20T11:54:11.312Z"
            }

+ Error Response:

    + Code:400
    + Content:

            {
                error: "Please login!"
            }
    
    OR

    + Code:400
    + Content:

            {
                "error": "Please insert valid Todo Title, or description, or status, or target date! "
            }

    OR

    + Code:500
    + Content:

            {
                error:"Uuupss something wrong, please call developer!"
            }