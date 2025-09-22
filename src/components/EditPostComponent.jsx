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
  // Form state to hold input values for title, author, content, and status
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    status: "Draft",
  });

  // Update form state when a post is selected for editing
  // If no post is selected, reset to empty fields for adding a new post
  useEffect(() => {
    if (post) setForm(post);
    else setForm({ title: "", author: "", content: "", status: "Draft" });
  }, [post]);

  // Handle save action for both adding and updating posts
  const handleSave = () => {
    // Validate all fields are filled
    if (!form.title || !form.author || !form.content || !form.status) {
      alert("All fields are required!");
      return;
    }

    if (post) {
      // If editing an existing post, update it in the posts array
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...form, id: post.id } : p))
      );
    } else {
      // If adding a new post, append it to the posts array
      setPosts((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(), // generate a unique id
          date: new Date().toISOString().slice(0, 10), // set today's date
        },
      ]);
    }

    // Close the dialog after saving
    setOpen(false);
  };

  return (
    // Dialog for editing or adding a post
    <Dialog open={open} onClose={() => setOpen(false)}>
      {/* Dialog title changes based on whether it's editing or adding */}
      <DialogTitle>{post ? "Edit Post" : "Add Post"}</DialogTitle>

      {/* Dialog content: form fields */}
      <DialogContent>
        {/* Title input */}
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Author input */}
        <TextField
          margin="dense"
          label="Author"
          fullWidth
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        {/* Content textarea */}
        <TextField
          margin="dense"
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        {/* Status dropdown */}
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

      {/* Dialog action buttons */}
      <DialogActions>
        {/* Cancel button closes the dialog without saving */}
        <Button onClick={() => setOpen(false)}>Cancel</Button>

        {/* Save or Update button */}
        <Button onClick={handleSave}>{post ? "Update" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPostComponent;
