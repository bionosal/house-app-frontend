import React from "react";
import { Route, Routes } from "react-router-dom";
import { Posts } from "../pages";
import { NoMatch } from "../components";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="posts" element={<Posts />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
