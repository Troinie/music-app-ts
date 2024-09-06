import Topic from '../../models/topic.model';
import { topics } from './../client/topic.controller';
import { Request, Response } from "express";

// [GET] /admin/topics
export const index = async (req: Request, res: Response) => {
   const topics = await Topic.find({
        deleted: false
   });

    res.render("admin/pages/topics/index", {
        pageTitle: "Quản lý chủ đề",
        topics: topics
    });
}