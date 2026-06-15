# Felinity
Felinity, powered by React and Supabase, is a modern full-stack web application built for cat lovers. From browsing cat images and exploring breed information to saving favorites and participating in community discussions, Felinity combines entertainment and social interaction in one seamless experience.

## Live demo: 
https://felinity.vercel.app/

## Feature List

### Cat Image Gallery
- Fetches cat images from The Cat API using TanStack Query
- Infinite scrolling implemented with Infinite Query
- Allows authenticated users to favourite and unfavourite images
- Favourite images are stored in a Supabase database
- Dedicated Favourites page for viewing saved images
- Users can remove images from their favourites directly from the Favourites page

### Authentication
- User Sign Up and Sign In functionality
- Google Sign In using OAuth 2.0
- Authentication powered by Supabase Auth
- Session persistence across page refreshes

### Profile Management
- Displays the authenticated user's profile information
- Allows users to update their display name
- Displays the user's registered email address
- Logout functionality

### Community Hub
Full social media-style community platform. Supabase database contains interconnected Users, Posts, Comments, and Likes tables. Relationships managed through foreign key constraints.

#### Posts
- View all community posts
- Authenticated users can create new posts
- Upload post images directly from their device
- Images are stored in Supabase Storage Buckets
- Public image URLs are automatically generated and associated with posts
- Users can edit only their own posts
- Users can delete only their own posts

#### Likes
- Users can like posts
- Users can unlike posts
- Authentication required for liking functionality

#### Comments
- Users can comment on posts
- Authentication required for commenting
- Comments display an "Author" tag when posted by the account owner
- Users can edit only their own comments
- Users can delete only their own comments

### Cat Breed Explorer
- Fetches complete breed information from The Cat API
- Browse detailed information for all cat breeds
- Pagination
- Search breeds by name
- Sort breeds alphabetically (A-Z)
- Sort breeds alphabetically (Z-A)

### Protected Routes

#### Unauthenticated Users
- Attempting to access `/profile` redirects users to `/signin`

#### Authenticated Users
- Attempting to access `/signin` redirects users to `/profile`
- Attempting to access `/signup` redirects users to `/profile`

## Technologies Used

### Frontend
- React
- TanStack Query v5
- React Router v7
- Context API
- Tailwind CSS
- Shadcn UI

### Backend & Database
- Supabase Authentication
- Supabase Database
- Supabase Storage
- Supabase Row Level Security (RLS)

### Database Features

- Relational database design using PostgreSQL and Supabase
- User accounts linked directly to Supabase Authentication through a unique `auth_id`
- One-to-many relationship between Users and Posts
- One-to-many relationship between Users and Comments
- One-to-many relationship between Users and Likes
- One-to-many relationship between Users and Favourites
- One-to-many relationship between Posts and Comments
- One-to-many relationship between Posts and Likes
- Foreign key constraints used to maintain data integrity across all tables
- Row Level Security (RLS) policies implemented for secure user-specific access

### APIs Used
- **The Cat API**
  - Cat image gallery
  - Cat breed information
- **Supabase**
  - Authentication
  - Google OAuth 2.0
  - PostgreSQL database
  - Storage Buckets
  - Public file hosting
  - User profiles
  - Posts, comments, likes, and favourites management
