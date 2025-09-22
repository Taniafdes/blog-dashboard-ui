import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

function DeleteDialogComponent({ open, setOpen, post, setPosts }) {
  const handleDelete = () => {
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
    setOpen(false);
  };

  return (

    // Delete Post Component

    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialogComponent