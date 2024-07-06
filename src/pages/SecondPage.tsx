// src/pages/SecondPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Post } from "../types";
import DepartmentList from "../components/DepartmentList";

const SecondPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      navigate("/");
    }
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Table
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={posts} columns={columns} pageSizeOptions={[10]} />
        <DepartmentList />
      </Box>
    </Box>
  );
};

export default SecondPage;
