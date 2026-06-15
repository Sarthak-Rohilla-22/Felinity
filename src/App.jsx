import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./AppLayout";
import CatImages from "./features/images/CatImages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorComp from "./ui/ErrorComp";
import Posts from "./features/posts/Posts";
import Post from "./features/posts/Post";
import SignUp from "./features/SignUp/SignUp";
import { useEffect } from "react";
import { supabase } from "./utils/supabase";
import SignIn from "./features/SignIn/SignIn";
import Profile from "./features/profile/Profile";
import SignedOutProtectedRoute from "./SignedOutProtectedRoute";
import SignedInProtectedRoute from "./SignedInProtectedRoute";
import CreatePost from "./features/posts/CreatePost";
import EditPost from "./features/posts/EditPost";
import Breeds from "./features/breeds/Breeds";
import Breed from "./features/breeds/Breed";
import Favourites from "./features/favourites/Favourites";
import Home from "./ui/Home";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorComp />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "images",
        element: <CatImages />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <Post />,
        errorElement: <ErrorComp />,
      },
      {
        path: "breeds",
        element: <Breeds />,
      },
      {
        path: "breeds/:id",
        element: <Breed />,
        errorElement: <ErrorComp />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        element: <SignedInProtectedRoute />,
        children: [
          {
            path: "signin",
            element: <SignIn />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
      {
        element: <SignedOutProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "createPost",
            element: <CreatePost />,
          },
          {
            path: "edit/:postId",
            element: <EditPost />,
          },
        ],
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    async function syncUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", user.id)
        .maybeSingle();

      if (existingUser) return;

      const { error } = await supabase.from("users").insert({
        name: user.user_metadata.full_name || user.user_metadata.name,
        email: user.email,
        auth_id: user.id,
      });

      if (error) {
        console.error(error);
      }
    }

    syncUserProfile();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
