// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv'); // Require dotenv if using a .env file

// dotenv.config(); // Load environment variables from .env file (if used)

// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Use Gmail's SMTP server
//     auth: {
//         user: process.env.EMAIL_USER, // Use environment variable for username
//         pass: process.env.EMAIL_PASS  // Use environment variable for password
//     }
// });

// const sendEmail = async (formData) => {
//     try {
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: 'shrushti.samant@gmail.com,chunamariom@gmail.com',
//             subject: 'Email Form Submission',
//             text: `
//             Form details:

//             Name: ${formData.name}
//             Email: ${formData.email}
//             Message: ${formData.message}
//             `
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log(`Email sent: ${info.messageId}`);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false })); // Parse form data

// app.get('/', (req, res) => {  // Serve index.html for GET requests
//     res.sendFile('index.html', { root: __dirname });
//   });

// app.post('/submit', async (req, res) => {
//     const { name, email, message } = req.body;

//     try {
//         await sendEmail({ name, email, message });
//         res.status(200).send('Form submitted successfully!');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error submitting form.');
//     }
// });

// app.listen(3000, () => console.log('Server listening on port 3000'));

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure multer for file uploads with validation
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpeg', '.jpg', '.heic', '.png'];
    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, HEIC, or PNG files are allowed!'), false);
    }
  }
});

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Route to handle file upload
app.post('/upload', upload.single('myfile'), (req, res) => {
  if (req.file) {
    console.log(`File uploaded: ${req.file.filename}`);
    res.send('File uploaded successfully!');
  } else if (req.error) { // Handle multer validation error
    console.error(req.error.message);
    res.status(400).send(req.error.message); // Send bad request with error message
  } else {
    console.error('Error uploading file');
    res.status(500).send('Error uploading file.');
  }
});

const port = process.env.PORT || 9001; // Use environment variable for port or default to 3000
app.listen(port, () => console.log(`Server listening on port ${port}`));

