const { Router } = require('express');
const { adminRequired, loginRequired } = require('../middlewares');
const userController = require('../controllers/user-controller');
const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/mypage/:userId', loginRequired, userController.getUser); //TODO: admin 사용자가 다른 사용자정보 조회가능
userRouter.post('/mypage/:userId', userController.updateUser); //TODO: admin 사용자가 다른 사용자 업데이트 가능
userRouter.delete('/mypage/:userId', userController.deleteUser); //TODO: admin 사용자가 다른 사용자 탈퇴가능

module.exports = userRouter;
