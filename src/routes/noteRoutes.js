const express = require("express");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const noteRouter = express.Router();
const auth = require("../middlewares/auth");

// that end points when call/execute it validates token so that's why we use auth

noteRouter.get("/",auth,getNote);

noteRouter.post("/",auth,createNote);

noteRouter.delete("/:id",auth,deleteNote);

noteRouter.put("/:id",auth,updateNote);

module.exports = noteRouter;