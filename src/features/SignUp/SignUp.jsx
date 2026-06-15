import { supabase } from "@/utils/supabase";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { name },
        },
      });

      if (error) throw error;

      const authUser = data.user;

      const { error: userError } = await supabase.from("users").insert({
        name,
        email: email.trim(),
        auth_id: authUser.id,
      });

      if (userError) throw userError;

      setName("");
      setEmail("");
      setPassword("");

      toast.success("Account created!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignupWithGoogle() {
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

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl tracking-wide text-taupe-700 font-extrabold">
            Create Account
          </h1>

          <p className="font-cute text-lg mt-4 max-w-xl mx-auto text-taupe-600">
            Get started and join a community built for cat lovers.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-taupe-200 p-8">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-cute text-sm font-medium text-taupe-700">
                Username
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-lg border border-taupe-300 px-4 py-3 font-cute outline-none transition focus:border-taupe-500 focus:ring-2 focus:ring-taupe-200"
              />
            </div>

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
              <label className="block mb-2 font-cute text-sm font-medium text-taupe-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-taupe-300 px-4 py-3 font-cute outline-none transition focus:border-taupe-500 focus:ring-2 focus:ring-taupe-200"
              />
            </div>

            <button
              type="submit"
              onClick={handleSignup}
              disabled={loading}
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
              Create Account
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
              onClick={handleSignupWithGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 px-4 font-cute font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-[0.98]cursor-pointer cursor-pointer"
            >
              <FaGoogle className="text-lg" />
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-sm text-taupe-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-taupe-700 hover:text-taupe-900"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
