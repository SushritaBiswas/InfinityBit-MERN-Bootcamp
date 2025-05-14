import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const blogsFile = './src/server/data/blogs.json';
const usersFile = './src/server/data/users.json';

// Reading and writing in JSON 
function readData(filePath) {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : '[]';
    return JSON.parse(data);
}

function writeData(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

//Routes

//Login
app.post('/login', (req, res) => {
    const { username } = req.body;
    const users = readData(usersFile);
    const user = users.find(u => u.username === username);

    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: 'User not found' });
    }
});

//Getting all blogs
app.get('/', (req, res) => {
    const blogs = readData(blogsFile);
    res.json(blogs);
});

//Creating a new blog
app.post('/api/blogs', (req, res) => {
    const blogs = readData(blogsFile);
    const newBlog = req.body;
    newBlog.id = Date.now();
    blogs.push(newBlog);
    writeData(blogsFile, blogs);
    res.status(201).json({ message: 'Blog added successfully' });
});

//Deleting a blog
app.delete('/api/blogs/:id', (req, res) => {
    const blogs = readData(blogsFile);
    const idToDelete = parseInt(req.params.id);
    const updatedBlogs = blogs.filter(blog => blog.id !== idToDelete);

    writeData(blogsFile, updatedBlogs);
    res.json({ message: 'Blog deleted' });
});

//Editing a blog
app.put('/api/blogs/:id', (req, res) => {
    const blogs = readData(blogsFile);
    const idToEdit = parseInt(req.params.id);
    const updatedData = req.body;

    const updatedBlogs = blogs.map(blog =>
        blog.id === idToEdit ? { ...blog, ...updatedData } : blog
    );

    writeData(blogsFile, updatedBlogs);
    res.json({ message: 'Blog updated' });
});

//Starting the server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
