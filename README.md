# Social Media App

This project is a full-featured social media application designed to deliver a seamless and interactive user experience. Built with Next.js 15, TailwindCSS, Neon DB, Prisma ORM, and Clerk for authentication, it supports essential social networking functionalities like user posts, comments, likes, stories, and follow requests. The app is optimized for performance and scalability, offering real-time updates and a responsive design for both desktop and mobile devices.

## Tech Stack

- Frontend: Next.js 15, TailwindCSS
- Backend: Server Actions, Prisma ORM
- Database: Neon DB (PostgreSQL)
- Authentication: Clerk
- File Upload: Cloudinary

## Features

- Responsive Layout: Fully optimized for desktop and mobile devices.
- User Authentication: Secure and seamless auth with Clerk.
- Home Page: Dynamic and interactive user feed.
- Stories: Stories: Create, view, and manage stories in real-time using Optimistic UI.
- Story Visibility: Control who can view specific stories.
- Post Management: Add, update, and delete posts with images.
- Post Interactions: Like and comment on posts in real-time using Optimistic UI.
- Commenting System: Nested comments and threaded replies in real-time using Optimistic UI.
- User Profile: View and update dynamic user data.
- Friendship Management: Follow, unfollow, and block users in real-time using Optimistic UI.
- Optimistic UI: Instant feedback for user actions without page reload.
- Performance Optimization: Prisma indexes (@@index) on key fields like StoryViews ensure fast and efficient data retrieval.

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
