import React, { useState } from "react";
import { match } from "path-to-regexp"; // Import the matching function
import { Route, Routes, useLocation } from "react-router-dom";
import validPaths from "./validPaths";
import Sidebar from "./components/layouts/sidebar/Sidebar";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import Login from "./pages/Login/Login";
import Profile from "./pages/profile/Profile";
import Homepage from "./pages/homepage/Homepage";
import SignUp from "./pages/Sign Up/SignUp";
import ProtectedRoute from "./protect/ProtectedRoute";
import Alltasks from "./pages/tasks/all/Alltasks";
import MyTasks from "./pages/tasks/myTasks/MyTasks";
import TasksCompleted from "./pages/tasks/complete/TasksCompleted";
import Taskscategories from "./pages/tasks/categories/Taskscategories";
import Alladverts from "./pages/adverts/all/Alladverts";
import Products from "./pages/adverts/products/Products";
import Ongoingcomps from "./pages/competitions/ongoing/Ongoingcomps";
import Upcomingcomps from "./pages/competitions/upcoming/Upcomingcomps";
import Completedcomps from "./pages/competitions/completed/Completedcomps";
import AllComps from "./pages/competitions/all/AllComps";
import History from "./pages/transactions/history/History";
import Deposit from "./pages/transactions/deposit/Deposit";
import Widthdraw from "./pages/transactions/widthdraw/Widthdraw";
import Exchanges from "./pages/wallet/exchanges/Exchanges";
import Account from "./pages/wallet/account/Account";
import Assets from "./pages/wallet/assets/Assets";
import Youtube from "./pages/recommendations/youtube/Youtube";
import Twitter from "./pages/recommendations/twitter/Twitter";
import Tiktok from "./pages/recommendations/tiktok/Tiktok";
import Facebook from "./pages/recommendations/facebook/Facebook";
import Instagram from "./pages/recommendations/instagram/Instagram";
import Telegram from "./pages/recommendations/telegram/Telegram";
import Snapchat from "./pages/recommendations/snapchat/Snapchat";
import Subscriptions from "./pages/adverts/subscriptions/Subscriptions";
import Competitors from "./pages/competitions/competitors/Competitors";
import Reward from "./pages/transactions/reward/Reward";
import Payments from "./pages/transactions/payments/Payments";
import Holding from "./pages/wallet/holding/Holding";
import Users from "./pages/users/Users";
import TaskParticipants from "./pages/tasks/complete/TaskParticipants";
import ProductDetail from "./pages/adverts/products/ProductDetail";
import CompetitorDetail from "./pages/competitions/competitors/CompetitorDetails";

// Function to check if the current path is valid, including dynamic segments
const isPathValid = (currentPath) => {
  return validPaths.some((path) => {
    const matcher = match(path, { decode: decodeURIComponent });
    return matcher(currentPath); // Returns true if the path matches
  });
};

const App = () => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleToggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
    if (!isSidebarToggled) {
      setIsSidebarHovered(false);
    }
  };

  // Show sidebar and header only for valid paths
  const showHeaderAndSidebar = isPathValid(currentPath);

  return (
    <div
      className={`${
        isSidebarToggled && !isSidebarHovered ? "toggle-sidebar" : ""
      } ${isSidebarHovered ? "hover-sidebar" : ""}`}
    >
      {showHeaderAndSidebar && (
        <>
          <Header handleToggleSidebar={handleToggleSidebar} />
          <Sidebar />
        </>
      )}

      <div className="min-vh-100 main" id={`${showHeaderAndSidebar && "main"}`}>
        <Routes>
          {/* Public route */}
          <Route exact path="/snapArt/" element={<Login />} />
          <Route path="/snapArt/signup" element={<SignUp />} />
          {/* Protected routes */}
          <Route
            path="/snapArt/dashboard"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/allTasks"
            element={
              <ProtectedRoute>
                <Alltasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/myTasks"
            element={
              <ProtectedRoute>
                <MyTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/completedTasks"
            element={
              <ProtectedRoute>
                <TasksCompleted />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/task_participants"
            element={
              <ProtectedRoute>
                <TaskParticipants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/taskCategories"
            element={
              <ProtectedRoute>
                <Taskscategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/allAdverts"
            element={
              <ProtectedRoute>
                <Alladverts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/advertisedProduct"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/subscriptions"
            element={
              <ProtectedRoute>
                <Subscriptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/allCompetitions"
            element={
              <ProtectedRoute>
                <AllComps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/completeCompetitions"
            element={
              <ProtectedRoute>
                <Completedcomps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/upcomingCompetitions"
            element={
              <ProtectedRoute>
                <Upcomingcomps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/ongoingCompetitions"
            element={
              <ProtectedRoute>
                <Ongoingcomps />
              </ProtectedRoute>
            }
          />

          <Route
            path="/snapArt/competitors"
            element={
              <ProtectedRoute>
                <Competitors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/competitor_details"
            element={
              <ProtectedRoute>
                <CompetitorDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/widthdrawTrans"
            element={
              <ProtectedRoute>
                <Widthdraw />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/depositTrans"
            element={
              <ProtectedRoute>
                <Deposit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/rewardTrans"
            element={
              <ProtectedRoute>
                <Reward />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/paymentTrans"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/transactionsHistory"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/exchanges"
            element={
              <ProtectedRoute>
                <Exchanges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/myAccount"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/assets"
            element={
              <ProtectedRoute>
                <Assets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/holding"
            element={
              <ProtectedRoute>
                <Holding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/youtube"
            element={
              <ProtectedRoute>
                <Youtube />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/twitter"
            element={
              <ProtectedRoute>
                <Twitter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/tiktok"
            element={
              <ProtectedRoute>
                <Tiktok />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/facebook"
            element={
              <ProtectedRoute>
                <Facebook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/instagram"
            element={
              <ProtectedRoute>
                <Instagram />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/telegram"
            element={
              <ProtectedRoute>
                <Telegram />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/snapchat"
            element={
              <ProtectedRoute>
                <Snapchat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          {/* 404 Route */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
