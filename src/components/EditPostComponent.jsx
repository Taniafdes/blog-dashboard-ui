import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

function EditPostComponent({ open, setOpen, post, setPosts }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    status: "Draft",
  });

  useEffect(() => {
    if (post) setForm(post);
    else setForm({ title: "", author: "", content: "", status: "Draft" });
  }, [post]);

  const handleSave = () => {
    if (!form.title || !form.author || !form.content || !form.status) {
      alert("All fields are required!");
      return;
    }

    if (post) {
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...form, id: post.id } : p))
      );
    } else {
      setPosts((prev) => [
        ...prev,
        { ...form, id: Date.now(), date: new Date().toISOString().slice(0, 10) },
      ]);
    }
    setOpen(false);
  };

  return (
    
    // Edit Post Component

    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{post ? "Edit Post" : "Add Post"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Author"
          fullWidth
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Status"
          select
          fullWidth
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Published">Published</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSave}>{post ? "Update" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPostComponent