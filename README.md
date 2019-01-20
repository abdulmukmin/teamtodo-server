---
#My REST API App With MD 8-)
---
# Team Todo API

Feature :

- Password encryption using "bcryptjs"
- Login random token using "JSONWEBTOKEN"

Other API Feature :

- Nodemailer API for user notification when someone try to register with other registerd user email.

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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibXVtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NDMyMTcwNzJ9.0Vdz5QZwVLPEG_VnNvgKiHrk4eoQCe_jp_Ntc_gOwvQ"
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
