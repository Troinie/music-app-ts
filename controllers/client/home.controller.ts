import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        status: "active",
        deleted: false
    }).select("avatar title slug singerId like");

    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });

        song["infoSinger"] = infoSinger;
    }
    
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        songs: songs
    });
}