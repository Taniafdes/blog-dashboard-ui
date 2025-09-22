import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

function DeleteDialogComponent({ open, setOpen, post, setPosts }) {
  // Function to handle deletion of the selected post
  const handleDelete = () => {
    // Update posts state by filtering out the post to delete
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
    
    // Close the delete confirmation dialog
    setOpen(false);
  };

  return (
    // Delete Confirmation Dialog
    <Dialog 
      open={open} // Controls visibility
      onClose={() => setOpen(false)} // Close dialog on clicking outside or cancel
    >
      {/* Dialog title */}
      <DialogTitle>
        Are you sure you want to delete this post?
      </DialogTitle>

      {/* Dialog action buttons */}
      <DialogActions>
        {/* Cancel button - closes the dialog without deleting */}
        <Button onClick={() => setOpen(false)}>Cancel</Button>

        {/* Delete button - deletes the post and closes dialog */}
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialogComponent;
