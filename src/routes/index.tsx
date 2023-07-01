import React from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout, NoMatch } from "../components";
import { Posts, StreamerDetails, StreamerList } from "../pages";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="posts" element={<Posts />} />
        <Route path="streamers" element={<StreamerList />} />
        <Route path="Streamers/:id" element={<StreamerDetails />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
