import mongodb from "mongodb";
import excelToJson from "../converter/excelToJson.js";

const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn){
        if (reviews){
            return
        }
        try{
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        } catch (e) {
            console.error('Unable to establish collection handles in userDAO: ' + e)
        }
    }

    static async addReview(restaurantId, user, review, date){
        try {
            const reviewDoc = { name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: new ObjectId(restaurantId), }

            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error('Unable to post review: ' + e)
            console.log(e)
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, text, date){
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: new ObjectId(reviewId)},
                { $set: { text: text, date: date } },
            )

            return updateResponse
        } catch (e) {
            console.error('Unable to update review: '+e)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId){
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
                user_id: userId,
            })

            return deleteResponse
        } catch (e) {
            return { error: e }
        }
    }
    /*
    static async importExcelData2MongoDB(filePath) {
        const excelData = excelToJson({
            sourceFile: filePath,
            sheets:[{
                name: 'Book',
                header:{
                    rows: 1
                },
                columnToKey:{
                    A: 'restaurant_id',
                    B: 'text',
                    C: 'user_id',
                    D: 'name'
                }
            }]
        });
    
        const reviewDocs = excelData.Reviews.map(row => ({
            name: row.name,
            user_id: row.user_id,
            date: new Date(row.date),
            text: row.text,
            restaurant_id: new ObjectId(row.restaurant_id)
        }));
        
    
        const insertResult = await reviews.insertMany(reviewDocs);
        return {
            status: 'success',
            count: insertResult.insertedCount
        };
    }
    */
    
}   