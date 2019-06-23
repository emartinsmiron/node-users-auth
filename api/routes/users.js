const express = require('express');
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../middleware/checkauth');
const UserController = require('../controllers/users');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/signup', upload.single('profilePhoto'), UserController.signup);

router.post('/login', UserController.login);

router.get('/', checkAuth, UserController.findAllUsers);

router.put('/', checkAuth, UserController.updateUser);

router.delete('/:userId',checkAuth , UserController.deleteUserById);

module.exports = router;