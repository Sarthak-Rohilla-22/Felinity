import { supabase } from "./supabase";

const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY;

export async function fetAllCatsImages({ pageParam = 0 }) {
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=20&api_key=${CAT_API_KEY}&page=${pageParam}`,
  );
  const data = await res.json();
  return data;
}

export async function fetchAllBreeds() {
  const res = await fetch(
    `https://api.thecatapi.com/v1/breeds?api_key=${CAT_API_KEY}`,
  );
  const data = await res.json();
  return data;
}

export async function fetchBreedById(id) {
  const res = await fetch(
    `https://api.thecatapi.com/v1/breeds?api_key=${CAT_API_KEY}`,
  );

  const data = await res.json();
  const breed = data.find((breed) => breed.id === id);

  if (!breed) {
    throw new Error("Breed not found");
  }

  return breed;
}
export async function fetchAllPosts() {
  let { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cannot fetch posts!");
  }

  return data;
}

export async function fetchAllUsers() {
  let { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cannot fetch posts!");
  }

  return data;
}

export async function fetchPostById(id) {
  let { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:users(*),
      likes(
        userId
      ),
      comments:comments(
        *,
        author:users(*)
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cannot fetch posts!");
  }

  return {
    ...data,
    author: data.author,
    likes: data.likes || [],
    comments: data.comments || [],
  };
}

export async function fetchAllFavourites(profileId) {
  let { data, error } = await supabase
    .from("favourites")
    .select("*")
    .eq("userId", profileId);

  if (error) {
    console.error(error);
    throw new Error("Cannot fetch favourites");
  }

  return data;
}
