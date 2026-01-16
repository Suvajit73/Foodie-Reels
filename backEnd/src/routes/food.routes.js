const express = require('express')
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middlewares")
const router = express.Router();
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
})

// post-- /api/food/   [for protecting the API....]
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood)

//get-- /api/food/ [protected] when reels scroll new video come....................
router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems)

router.post('/like', authMiddleware.authUserMiddleware, foodController.likeFood)

router.post('/save', authMiddleware.authUserMiddleware, foodController.saveFood)

router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
)


module.exports = router