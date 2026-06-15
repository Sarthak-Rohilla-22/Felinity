import { supabase } from "@/utils/supabase";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSigninWithGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google sign in failed");
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      toast.success("Signed in successfully");

      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl tracking-wide text-taupe-700 font-extrabold">
            Welcome Back
          </h1>

          <p className="font-cute text-lg mt-4 max-w-xl mx-auto text-taupe-600">
            Sign in to continue exploring adorable cats.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-taupe-200 p-8">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-cute text-sm font-medium text-taupe-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-taupe-300 px-4 py-3 font-cute outline-none transition focus:border-taupe-500 focus:ring-2 focus:ring-taupe-200"
              />
            </div>

            <div>
              <div className="mb-2">
                <label className="font-cute text-sm font-medium text-taupe-700">
                  Password
                </label>
              </div>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-taupe-300 px-4 py-3 font-cute outline-none transition focus:border-taupe-500 focus:ring-2 focus:ring-taupe-200"
              />
            </div>

            <button
              disabled={loading}
              onClick={handleSignIn}
              className="
            w-full
            rounded-lg
            bg-taupe-700
            py-3
            font-cute
            font-medium
            text-white
            transition-all
            hover:bg-taupe-600
            cursor-pointer
          "
            >
              Sign In
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-taupe-200"></div>
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-taupe-500">OR</span>
              </div>
            </div>

            <button
              disabled={loading}
              onClick={handleSigninWithGoogle}
              className="
            w-full
            flex items-center justify-center gap-3
            rounded-lg
            border border-taupe-300
            bg-white
            py-3 px-4
            font-cute font-medium
            text-taupe-700
            transition-all duration-200
            hover:border-taupe-400
            hover:bg-taupe-50
            hover:shadow-sm
            active:scale-[0.98]
            cursor-pointer
          "
            >
              <FaGoogle />
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-sm text-taupe-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-taupe-700 hover:text-taupe-900"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
