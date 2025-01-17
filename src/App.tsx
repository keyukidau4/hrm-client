import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import FollowCursor from "./hooks/FollowCursor";
import UserAuthCheck from "./components/UserAuth";
import AddNewReportPage from "./pages/ClientAddReport";
import "react-datepicker/dist/react-datepicker.css";
import ListReportClient from "./pages/ClientListReport";
import AdminCheck from "./components/UserAuth/admin";
import AdminListReportPage from "./pages/AdminListReport";
import AdminEditReportPage from "./pages/AdminEditReport";
import ClientEditReport from "./pages/ClientEditReoirt";

function App() {
  return (
    <>
      <FollowCursor />

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <UserAuthCheck>
              <HomePage />
            </UserAuthCheck>
          }
        />

        <Route path="/client">
          <Route
            path="add-report"
            element={
              <UserAuthCheck>
                <AddNewReportPage />
              </UserAuthCheck>
            }
          />

          <Route
            path="list-report"
            element={
              <UserAuthCheck>
                <ListReportClient />
              </UserAuthCheck>
            }
          />

          <Route
            path="report/edit/:id"
            element={
              <UserAuthCheck>
                <ClientEditReport />
              </UserAuthCheck>
            }
          />
        </Route>

        <Route path="/admin">
          <Route
            path="list-report"
            element={
              <UserAuthCheck>
                <AdminCheck>
                  <AdminListReportPage />
                </AdminCheck>
              </UserAuthCheck>
            }
          />
          <Route
            path="report-detail"
            element={
              <UserAuthCheck>
                <AdminCheck>
                  <AdminEditReportPage />
                </AdminCheck>
              </UserAuthCheck>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
