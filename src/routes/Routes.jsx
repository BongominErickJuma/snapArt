import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/AuthContex";
import HeaderSidebar from "../components/layouts/HeaderSidebar";
import ProtectedRoute from "../protect/ProtectedRoute";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Sign Up/SignUp";
import Homepage from "../pages/homepage/Homepage";
import Profile from "../pages/profile/Profile";
import Alltasks from "../pages/tasks/all/Alltasks";
import MyTasks from "../pages/tasks/myTasks/MyTasks";
import TasksCompleted from "../pages/tasks/complete/TasksCompleted";
import TaskParticipants from "../pages/tasks/complete/TaskParticipants";
import Taskscategories from "../pages/tasks/categories/Taskscategories";
import Alladverts from "../pages/adverts/all/Alladverts";
import Products from "../pages/adverts/products/Products";
import ProductDetail from "../pages/adverts/products/ProductDetail";
import Subscriptions from "../pages/adverts/subscriptions/Subscriptions";
import AllComps from "../pages/competitions/all/AllComps";
import Completedcomps from "../pages/competitions/completed/Completedcomps";
import Upcomingcomps from "../pages/competitions/upcoming/Upcomingcomps";
import Ongoingcomps from "../pages/competitions/ongoing/Ongoingcomps";
import Competitors from "../pages/competitions/competitors/Competitors";
import CompetitorDetail from "../pages/competitions/competitors/CompetitorDetails";
import History from "../pages/transactions/history/History";
import Deposit from "../pages/transactions/deposit/Deposit";
import Widthdraw from "../pages/transactions/widthdraw/Widthdraw";
import Reward from "../pages/transactions/reward/Reward";
import Payments from "../pages/transactions/payments/Payments";
import Exchanges from "../pages/wallet/exchanges/Exchanges";
import Account from "../pages/wallet/account/Account";
import Assets from "../pages/wallet/assets/Assets";
import Holding from "../pages/wallet/holding/Holding";
import Youtube from "../pages/recommendations/youtube/Youtube";
import Twitter from "../pages/recommendations/twitter/Twitter";
import Tiktok from "../pages/recommendations/tiktok/Tiktok";
import Facebook from "../pages/recommendations/facebook/Facebook";
import Instagram from "../pages/recommendations/instagram/Instagram";
import Telegram from "../pages/recommendations/telegram/Telegram";
import Snapchat from "../pages/recommendations/snapchat/Snapchat";
import Users from "../pages/users/Users";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    { path: "/snapArt", element: <Login /> },
    { path: "/snapArt/signup", element: <SignUp /> },
  ];
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/snapArt/dashboard",
          element: (
            <HeaderSidebar>
              <Homepage />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/profile",
          element: (
            <HeaderSidebar>
              <Profile />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/allTasks",
          element: (
            <HeaderSidebar>
              <Alltasks />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/myTasks",
          element: (
            <HeaderSidebar>
              <MyTasks />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/completedTasks",
          element: (
            <HeaderSidebar>
              <TasksCompleted />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/task_participants",
          element: (
            <HeaderSidebar>
              <TaskParticipants />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/verifiedTasks",
          element: (
            <HeaderSidebar>
              <Taskscategories />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/taskCategories",
          element: (
            <HeaderSidebar>
              <Taskscategories />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/allAdverts",
          element: (
            <HeaderSidebar>
              <Alladverts />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/products",
          element: (
            <HeaderSidebar>
              <Products />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/advertisedProduct",
          element: (
            <HeaderSidebar>
              <ProductDetail />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/subscriptions",
          element: (
            <HeaderSidebar>
              <Subscriptions />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/allCompetitions",
          element: (
            <HeaderSidebar>
              <AllComps />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/completeCompetitions",
          element: (
            <HeaderSidebar>
              <Completedcomps />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/upcomingCompetitions",
          element: (
            <HeaderSidebar>
              <Upcomingcomps />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/ongoingCompetitions",
          element: (
            <HeaderSidebar>
              <Ongoingcomps />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/competitors",
          element: (
            <HeaderSidebar>
              <Competitors />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/competitor_details",
          element: (
            <HeaderSidebar>
              <CompetitorDetail />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/widthdrawTrans",
          element: (
            <HeaderSidebar>
              <Widthdraw />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/depositTrans",
          element: (
            <HeaderSidebar>
              <Deposit />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/rewardTrans",
          element: (
            <HeaderSidebar>
              <Reward />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/paymentTrans",
          element: (
            <HeaderSidebar>
              <Payments />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/transactionsHistory",
          element: (
            <HeaderSidebar>
              <History />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/exchanges",
          element: (
            <HeaderSidebar>
              <Exchanges />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/assets",
          element: (
            <HeaderSidebar>
              <Assets />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/myAccount",
          element: (
            <HeaderSidebar>
              <Account />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/holding",
          element: (
            <HeaderSidebar>
              <Holding />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/youtube",
          element: (
            <HeaderSidebar>
              <Youtube />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/twitter",
          element: (
            <HeaderSidebar>
              <Twitter />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/tiktok",
          element: (
            <HeaderSidebar>
              <Tiktok />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/facebook",
          element: (
            <HeaderSidebar>
              <Facebook />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/instagram",
          element: (
            <HeaderSidebar>
              <Instagram />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/telegram",
          element: (
            <HeaderSidebar>
              <Telegram />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/snapchat",
          element: (
            <HeaderSidebar>
              <Snapchat />
            </HeaderSidebar>
          ),
        },
        {
          path: "/snapArt/users",
          element: (
            <HeaderSidebar>
              <Users />
            </HeaderSidebar>
          ),
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(token ? routesForAuthenticatedOnly : []),
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
