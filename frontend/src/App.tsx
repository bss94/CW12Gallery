import { Route, Routes } from "react-router-dom";
import Layout from "./UI/Layout/Layout";
import { useAppSelector } from "./app/hooks.ts";
import { selectUser } from "./features/Users/usersSlice.ts";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute.tsx";
import { Typography } from "@mui/material";

import Register from "./features/Users/Register.tsx";
import Login from "./features/Users/Login.tsx";

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery_user/:id" element={<div />} />
        <Route
          path="/new-image"
          element={
            <ProtectedRoute isAllowed={user !== null}>
              <div />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Typography variant="h1">Not found</Typography>}
        />
      </Routes>
    </Layout>
  );
};

export default App;
