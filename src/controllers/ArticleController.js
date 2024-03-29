import { Article } from "../models/Articles.js";
import { User } from "../models/Users.js";

import fs from "fs";
import path from "path";

const create = async (req, res) => {
  try {
    const params = req.body;

    const article = await Article.create(params);
    article.author = req.user._id;

    article.save((error) => {
      if (error || !article) {
        return res.status(400).json({
          status: "error",
          message: "The article has not been saved.",
        });
      }
    });

    const user = await User.findById(req.user._id);
    user.articles.push(article._id);
    await user.save();

    return res.status(200).json({
      status: "success",
      article: article,
      message: "Article created successfully.",
    });
  } catch (e) {
    console.log(e);
  }
};

const getAll = async (req, res) => {
  try {
    const consulta = await Article.find({})
      .sort({ date: -1 })
      .exec((error, articles) => {
        if (error || !articles) {
          return res.status(404).json({
            status: "error",
            message: "No articles found.",
          });
        }

        return res.status(200).send({
          status: "success",
          articles,
        });
      });
  } catch (e) {
    console.log(e);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findById(id, (error, article) => {
      if (error || !article) {
        return res.status(404).json({
          status: "error",
          message: "No articles found.",
        });
      }
      res.status(200).json({
        status: "success",
        article,
      });
    });
  } catch (e) {
    console.log(e);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const articleRemove = await Article.deleteOne({ _id: id });

    if (articleRemove.deletedCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Article not found.",
      });
    }

    return res.sendStatus(204);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const params = req.body;

    await Article.findOneAndUpdate(
      { _id: id },
      params,
      { new: true },
      (error, articleUpdate) => {
        if (error || !articleUpdate) {
          return res.status(500).json({
            status: "error",
            message: "Error updating.",
          });
        }

        return res.status(200).json({
          status: "success",
          article: articleUpdate,
        });
      }
    );
  } catch (e) {
    console.log(e);
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file && !req.files) {
      return res.status(404).json({
        status: "error",
        message: "Invalid petition.",
      });
    }

    let archive = req.file.originalname;

    let archiveSplit = archive.split(".");
    let archiveExtension = archiveSplit[1];

    if (
      archiveExtension != "png" &&
      archiveExtension != "jpg" &&
      archiveExtension != "jpeg" &&
      archiveExtension != "gif"
    ) {
      fs.unlink(req.file.path, (error) => {
        return res.status(400).json({
          status: "error",
          message: "Invalid file extension.",
        });
      });
    } else {
      const { id } = req.params;

      await Article.findOneAndUpdate(
        { _id: id },
        { image: req.file.filename },
        { new: true },
        (error, articleUpdate) => {
          if (error || !articleUpdate) {
            return res.status(500).json({
              status: "error",
              message: "Error updating.",
            });
          }

          return res.status(200).json({
            status: "success",
            article: articleUpdate,
            file: req.file,
          });
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
};

const image = (req, res) => {
  try {
    let file = req.params.file;
    let routePhysical = "./src/images/articles/" + file;

    fs.stat(routePhysical, (error, exist) => {
      if (exist) {
        return res.sendFile(path.resolve(routePhysical));
      } else {
        return res.status(404).json({
          status: "error",
          message: "The image does not exist.",
          exist,
          file,
          routePhysical,
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const search = async (req, res) => {
  try {
    const { search } = req.params;

    await Article.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
    })
      .sort({ date: -1 })
      .exec((error, foundItems) => {
        if (error || !foundItems || foundItems.length <= 0) {
          return res.status(404).json({
            status: "error",
            message: "No articles found.",
          });
        }

        return res.status(200).json({
          status: "success",
          articles: foundItems,
        });
      });
  } catch (e) {
    console.log(e);
  }
};

export { getAll, getById, create, edit, remove, uploadImage, image, search };
