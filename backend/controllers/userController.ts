import { Errback, Request, Response } from "express";
import sql from "../config/db.js";




export const getUserCreations = async (req: Request, res: Response) =>{
    try {
        const {userId} = req.auth()
        const userData = await sql`Select * from creations where user_id = ${userId} order by created_at desc`;
        res.json({success: true, userData});

    } catch (error: any) {
        res.json({success: false, message: error.message})
    }
}


export const getPublishedCreations = async (req: Request, res: Response) => {
    try {
        const publishedCreations = await sql`Select * from creations where publish = true order by created_at desc`;
        res.json({success: true, publishedCreations});
    } catch (error: any) {
        res.json({success: false, message: error.message})
    }
}


export const toggleLikeCreation = async (req: Request, res: Response) => {
    try {
        const {userId} = req.auth();
        const {creationId} = req.body;

        const [creation] = await sql`Select * from creations where id= ${creationId}`
        if(!creation) {
            return res.json({success: false, message: "Creation not found"})
        }
        const currentLikes = creation.likes;
        const userIdString = userId.toString();
        let message;
        let updatedLikes;
        if(currentLikes.includes(userIdString)) {
            updatedLikes = currentLikes.filter((user: string)=>user !== userIdString);
            message = "Creation Unliked";
        }
        else{
            updatedLikes = [...currentLikes, userIdString];
            message = "Creation liked"
        }

        const formattedArray = `{${updatedLikes.join(',')}}`;
 
        await sql`
        update creations 
        set likes = ${formattedArray}::text[] 
        where id = ${creationId}
        `;
        res.json({success: true, message});
    } catch (error: any) {
        res.json({success: false, message: error.message})
    }
}