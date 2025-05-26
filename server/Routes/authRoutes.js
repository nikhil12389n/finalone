const { register, login } = require("../Controllers/authControllers");
const { CheckUser } = require("../Middlewares/authMiddlewares");

const router=require("express").Router();

router.post('/register',register);

router.post('/',CheckUser);
router.post('/login',login);

module.exports=router;