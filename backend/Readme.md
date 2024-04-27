# Entry Guard Backend Code README

Hello, this is the backend code for a simple login and register pages built with NodeJS and ExpressJS.

## Getting Started

To get started with the backend code, follow these steps:

1. Run `npm i` to install dependencies.
2. Set up the `.env` file in the root folder. The `.env` file should contain the following code:

MONGODB_URL = 'your MongoDB url'
SMTP_MAIL = "your_gmail"
SMTP_PASSWORD = "your_password"
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = "587"
ACCESS_TOKEN_SECRET = "anything"
JWT_EXPIRES_IN = "2d"

Make sure to replace `"your_gmail"` and `"your_password"` with your actual Gmail credentials. For Gmail, you may need to generate an app password. Follow the instructions in this link: [How to generate an app password](https://support.google.com/mail/answer/185833?hl=en).

3. Once the `.env` file is set up, run `npm start` to start the backend server.

That's it! Your backend server should be up and running now. Happy coding!
