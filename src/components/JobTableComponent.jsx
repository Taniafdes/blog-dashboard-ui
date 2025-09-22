import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import EditPostComponent from "./EditPostComponent";
import DeleteDialogComponent from "./DeleteDialogComponent";

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

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("blogPosts");
    return saved ? JSON.parse(saved) : initialPosts;
  });


  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "title", headerName: "Title", width: 200, sortable: true },
    { field: "author", headerName: "Author", width: 150 },
    { field: "content", headerName: "Content", width: 300 },
    { field: "date", headerName: "Date", width: 150, sortable: true },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Box>
          <Button
            size="small"
            onClick={() => {
              setSelectedPost(params.row);
              setOpenDialog(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => {
              setSelectedPost(params.row);
              setOpenDelete(true);
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  return (

    // main table 
    <Box>
      <input
        placeholder="Search by Title or Author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "15px",
          width: "100%",
          boxSizing: "border-box",
          border: '1px solid #efefef',
          borderRadius: '5px'
        }}
      />


      {/* button to add a new Post */}
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



      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredPosts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>


      {/* Component to edit the post */}

      <EditPostComponent
        open={openDialog}
        setOpen={setOpenDialog}
        post={selectedPost}
        setPosts={setPosts}
      />


      {/* Component to delete the post */}

      <DeleteDialogComponent
        open={openDelete}
        setOpen={setOpenDelete}
        post={selectedPost}
        setPosts={setPosts}
      />
    </Box>
  );
}
export default JobTableComponent