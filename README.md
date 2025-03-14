# Social Media App

This is a full-stack social media application built with Next.js 15, TailwindCSS, Neon DB, Prisma ORM, and Clerk for authentication. It features a responsive, dynamic, and fully interactive user experience, supporting posts, comments, likes, stories, follow requests, and more.

## Tech Stack

- Frontend: Next.js 15, TailwindCSS
- Backend: Server Actions, Prisma ORM
- Database: Neon DB (PostgreSQL)
- Authentication: Clerk
- File Upload: Cloudinary

## Features

- Responsive Layout: Fully optimized for desktop and mobile devices.
- Clerk Authentication: Seamless user authentication and management.
- Home Page: Dynamic and responsive feed.
- Stories: Post and view disappearing stories.
- Post Management: Add, update, and delete posts with images.
- Post Interactions: Like and comment on posts.
- Commenting System: Nested comments and replies.
- Profile Page: User profile with dynamic data.
- RightBar & LeftBar: Additional user info and navigation.
- Progress bar for viewing stories.
- Navigate between stories.
- Visual indicators for seen stories.
- Restrict seen list visibility to the story owner.
- Choose specific users who can view a story.
- Search and add users to visibility list.
- Add and view nested comment replies.
- Optimistic UI for instant updates.

## Database Schema

Built with Prisma and Neon DB (PostgreSQL), the schema includes models for users, posts, comments, likes, stories, followers, and more.

Key Models:
- User: Stores user profile and relationship data.
- Post: Contains post content, images, and interactions.
- Comment: Supports nested replies and likes.
- Like: Tracks likes on posts and comments.
- Follower, FollowRequest, Block: Manages user relationships.
- Story, StoryViews, StoryVisibility: Handles stories and visibility setting

## Installation & Setup

1. Clone the repository:
   <pre>git clone https://github.com/moeedrafi/social-media-app.git
   cd social-media-app</pre>
2. Install dependencies:
   <pre>npm install</pre>
3. Set up environment variables (create a .env file):
   <pre>DATABASE_URL=your_neon_db_url
   NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
   CLERK_API_KEY=your_clerk_api_key
   CLOUDINARY_URL=your_cloudinary_url</pre>
4. Push Prisma schema to the database:
   <pre>npx prisma db push</pre>
5. Run the development server: 
   <pre>npm run dev</pre>
