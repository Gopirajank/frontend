import { useContext, useEffect, useState } from "react";
import "./singlepost.css";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";
import ReactQuill from "react-quill";
import ReactMarkdown from "react-markdown";
import "react-quill/dist/quill.snow.css";
import { Remarkable } from 'remarkable';


const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://backend-3aqf.onrender.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("https://backend-3aqf.onrender.com/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://backend-3aqf.onrender.com/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      // Convert Markdown to HTML
      const markdownToHtml = new Remarkable();
      const htmlContent = markdownToHtml.render(desc);

      await axios.put(`https://backend-3aqf.onrender.com/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc: htmlContent, // Set the HTML content
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <ReactQuill
            value={desc}
            onChange={setDesc}
            placeholder="Enter text here"
          />
        ) : (
          <div className="singlePostDesc">
            <div dangerouslySetInnerHTML={{ __html: desc }} />
          </div>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
      {updateMode && (
        <div className="markdown-preview">
          <h2 style={{ color: 'teal' }}>Preview</h2>
          <div className="preview-content">
            <ReactMarkdown>{desc}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
