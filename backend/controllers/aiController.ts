import { GoogleGenAI } from "@google/genai";
import sql from "../config/db.js";
import { Request, Response } from "express";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { PDFParse } from 'pdf-parse';



const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateArticle = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;
    const free_usage_of_premium_features = req.free_usage_of_premium_features;

    if (plan !== "premium" && free_usage >= 15) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: length*10,
      },
    });

    const content = response.text;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'Generate article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
          free_usage_of_premium_features: free_usage_of_premium_features,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error: any) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateBlogTitle = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;
    const free_usage_of_premium_features = req.free_usage_of_premium_features;

    if (plan !== "premium" && free_usage >= 15) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    const content = response.text;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
          free_usage_of_premium_features: free_usage_of_premium_features,
        },
      });
    }

    res.json({ success: true, message: content });
  } catch (error: any) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;
    const free_usage_of_premium_features = req.free_usage_of_premium_features;

    if (plan !== "premium" && free_usage_of_premium_features >= 7) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'Image Generation', ${publish ?? false})
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage,
          free_usage_of_premium_features: free_usage_of_premium_features + 1,
        },
      });
    }

    res.json({ success: true, content: secure_url });
  } catch (error: any) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const removeBackground = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();
    const image = req.file;

    const plan = req.plan;
    const free_usage = req.free_usage;
    const free_usage_of_premium_features = req.free_usage_of_premium_features;

    if (plan !== "premium" && free_usage_of_premium_features >= 7) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }
    if(!image) {
        return res.json({
            succes: false,
            message: "Image not found"
        })
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId},'Remove Background', ${secure_url}, 'Remove Background')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage,
          free_usage_of_premium_features: free_usage_of_premium_features + 1,
        },
      });
    }

    res.json({ success: true, content: secure_url });
  } catch (error: any) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const removeImageObject = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const {object} = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;
    const free_usage_of_premium_features = req.free_usage_of_premium_features;

    if (plan !== "premium" && free_usage_of_premium_features >= 7) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }
    if(!image) {
        return res.json({
            succes: false,
            message: "Image not found"
        })
    }
    console.log(object)
    const {secure_url} = await cloudinary.uploader.upload(image.path, {
      transformation:[{
        effect: `gen_remove:${object}`
      }]
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove Object', ${secure_url}, 'Remove Object')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage,
          free_usage_of_premium_features: free_usage_of_premium_features + 1,
        },
      });
    }

    res.json({ success: true, content: secure_url });
  } catch (error: any) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const reviewResume = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const {object} = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;
    const free_usage_of_premium_features = req.free_usage_of_premium_features;

    if (plan !== "premium" && free_usage_of_premium_features >= 7) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }
    if(!resume) {
        return res.json({
            succes: false,
            message: "Resume not found"
        })
    }
    if(resume.size > 5*1024*1024) {
        return res.json({
            success: false,
            message: "resume file size exceeds allowed size (5MB)"
        })
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await new PDFParse({data: dataBuffer}) 
    const result = await  pdfData.getText()
    //console.log(result.text)

    const prompt = `Review the following resume and provide honest and brutal truthful feedback on its strengths, weakness,
    and areas for improvement.and if u think this is not resume file/text, just say "This isnt any resume". Resume Content: \n\n${result.text}`

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    const content = response.text;
    if(!content) {
      return res.json({success: false, message: "Something went wrong"})
    }

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Review Resume', ${content}, 'Resume Review')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage,
          free_usage_of_premium_features: free_usage_of_premium_features + 1,
        },
      });
    }

    res.json({ success: true, content: content });
  } catch (error: any) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
