import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";

function Profile() {
  const { profile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(profile?.name);
  const [editingField, setEditingField] = useState(null);

  async function handleLogout(e) {
    e.preventDefault();

    try {
      await logout();

      toast.success("Logged out successfully");
      navigate("/signIn");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  }

  async function editProfile() {
    if (editingField !== "name") return;

    if (!name.trim() || name === profile.name) {
      setEditingField(null);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("users")
        .update({ name: name.trim() })
        .eq("id", profile.id);

      if (error) throw error;

      toast.success("Profile updated");

      setEditingField(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-taupe-200 shadow-sm p-8">
          <h1 className="font-heading text-4xl text-taupe-700 font-bold mb-8">
            My Profile
          </h1>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-taupe-100 pb-4">
              <div className="flex-1">
                <p className="text-sm text-taupe-500">Name</p>

                {editingField === "name" ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                      mt-1
                      w-full
                      rounded-md
                      border border-taupe-300
                      px-3 py-2
                      text-taupe-800
                      outline-none
                      focus:border-taupe-500
                      focus:ring-2
                      focus:ring-taupe-200
                    "
                  />
                ) : (
                  <h2 className="text-lg font-medium text-taupe-800">
                    {name || profile?.name}
                  </h2>
                )}
              </div>

              {editingField === "name" ? (
                <button
                  disabled={loading}
                  onClick={editProfile}
                  className="
                    mt-6
                    ml-4
                    rounded-md
                    bg-taupe-700
                    px-4 py-2
                    text-md
                    font-medium
                    text-white
                    transition
                    hover:bg-taupe-600
                    cursor-pointer
                  "
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditingField("name")}
                  className="
                    rounded-md
                    p-2
                    text-xl
                    text-taupe-600
                    hover:bg-taupe-100
                    transition
                    cursor-pointer
                  "
                >
                  <FaEdit />
                </button>
              )}
            </div>

            <div className="border-b border-taupe-100 pb-4">
              <p className="text-sm text-taupe-500">Email</p>

              <h2 className="text-lg font-medium text-taupe-800">
                {profile?.email}
              </h2>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="
              mt-8
              w-full
              rounded-lg
              border
              border-red-200
              bg-red-50
              py-3
              font-medium
              text-red-600
              transition
              hover:bg-red-100
              cursor-pointer
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
