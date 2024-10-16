const Blog = require("../Models/Blog")
const express = require("express");
const router = express.Router();

router.post("/", async (req, res)=>{
    try{
        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        console.log(savedBlog);
        res.status(201).json({message: "Saved Successfully"});
    }catch(e){
        console.log(e);
        res.status(501).json({error: "Internal Server Error"});
    }
});

router.get('/', async (req, res) => {
    try{
        const blogs = Blog.find();
        res.status(200).json(blogs);
    }catch(e){
        console.log(e);
        res.status(500).json({error: "db error"});
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const blog = Blog.findById(req.params.id);
        if(!blog){
            res.status(404).json({error: "Not Found"});
            return;
        }
        res.status(200).json(blog);
    }catch(e){
        console.log(e);
        res.status(500).json({error: "db error"});
    }
})

router.put("/:id", async (req, res)=> {
    const {id} = req.params;
    const {title, description} = req.body;

    const updateData = {};
    if(title) updateData.title = title;
    if(description) updateData.description = description;

    try{
        const blog = await Blog.findByIdAndUpdate(id, updateData, {new: true, runValidators: true});
        if(!blog) {
            return res.status(404).json({error: "not found"});
        }
        res.status(201).json({message: "update Success"});
        console.log(blog);
    }catch(e){
        console.log(e);
        res.status(500).json({error: "db error"});
    }
});

router.delete("/:id", async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) return res.status(404).json({ error: "Blog not found" });
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;