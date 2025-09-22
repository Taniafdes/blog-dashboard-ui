import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import EditPostComponent from "./EditPostComponent";
import DeleteDialogComponent from "./DeleteDialogComponent";

// Initial dummy posts (used if localStorage is empty)
const initialPosts = [
  {
    id: 1,
    title: "My First Post",
    author: "Temra Fernandes",
    date: "2025-09-21",
    status: "Published",
    content: "This is the content of the first post.",
  },
  {
    id: 2,
    title: "My Second Post",
    author: "Tania Fernandes",
    date: "2025-09-20",
    status: "Draft",
    content: "Content of the second post.",
  },
];

function JobTableComponent() {
  // State to hold all blog posts
  // Initialize from localStorage if available, otherwise use initialPosts
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("blogPosts");
    return saved ? JSON.parse(saved) : initialPosts;
  });

  // State for search input
  const [search, setSearch] = useState("");

  // State for currently selected post (for edit or delete)
  const [selectedPost, setSelectedPost] = useState(null);

  // State to control edit dialog visibility
  const [openDialog, setOpenDialog] = useState(false);

  // State to control delete confirmation dialog visibility
  const [openDelete, setOpenDelete] = useState(false);

  // posts to localStorage whenever posts state changes
  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  // Filter posts based on search input (title or author)
  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  // Define columns for the DataGrid
  const columns = [
    { field: "title", headerName: "Title", width: 200, sortable: true },
    { field: "author", headerName: "Author", width: 150 },
    { field: "content", headerName: "Content", width: 300 },
    { field: "date", headerName: "Date", width: 150, sortable: true },
    { field: "status", headerName: "Status", width: 150 },
    {
      // Actions column with Edit and Delete buttons
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Box>
          {/* Edit button */}
          <Button
            size="small"
            onClick={() => {
              setSelectedPost(params.row);
              setOpenDialog(true); 
            }}
          >
            Edit
          </Button>

          {/* Delete button */}
          <Button
            size="small"
            color="error"
            onClick={() => {
              setSelectedPost(params.row); // set the post to delete
              setOpenDelete(true); // open delete confirmation
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

 

  return (
    <Box>
      {/* Search input for filtering posts */}
      <input
        placeholder="Search by Title or Author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "15px",
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid #efefef",
          borderRadius: "5px",
        }}
      />

      {/* Button to add a new post */}
      <Button
        variant="contained"
        onClick={() => {
          setSelectedPost(null); 
          setOpenDialog(true); 
        }}
        style={{ marginBottom: "15px", marginTop: "10px" }}
      >
        Add Post
      </Button>

      {/* DataGrid to display blog posts */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredPosts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick 
        />
      </div>

      {/* Component to edit/add a post */}
      <EditPostComponent
        open={openDialog}
        setOpen={setOpenDialog}
        post={selectedPost}
        setPosts={setPosts}
      />

      {/* Component to delete a post */}
      <DeleteDialogComponent
        open={openDelete}
        setOpen={setOpenDelete}
        post={selectedPost}
        setPosts={setPosts}
      />
    </Box>
  );
}

export default JobTableComponent;
