import ReviewsDAO from "../dao/reviewsDAO.js";
import mongodb from "mongodb";


const ObjectId = mongodb.ObjectId



export default class ReviewsController{
    
    static async apiPostReview(req, res, next){
        try{
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date,
            )
            res.json({ status: "success1" })
            
        }catch(e){
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date,
            )

            var { error } = ReviewResponse
            if(error){
                res.status(400).json({ error })
            }

            if(ReviewResponse.modifiedCount === 0){
                throw new Error(
                    "Unable to update review - user may not be original poster",
                )
            }
            
            res.json({ status: "success2" })
        }catch(e){
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next){
        try {
            const reviewId = req.query.id
            const userId = req.body.user_id
            console.log(reviewId)
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            )

            res.json({ status: "success3" })
        } catch (e) {
            res.status(500).json({ error: e.message})
        }
    }
    /*
    static async apiAddExcelFile(req, res, next) {
      try {
          const filePath = req.file.path;
          const data = await ReviewsDAO.importExcelData2MongoDB(filePath);
          res.json(data);
      } catch (e) {
          console.error(`Unable to import Excel data to MongoDB: ${e}`);
          res.status(500).json({ error: e.message });
      }
    }
    */
    static async apiAddExcelFile () {
        
    }
}