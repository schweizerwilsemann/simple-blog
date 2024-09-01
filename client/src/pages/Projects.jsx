import React from 'react'
import AboutTheProject from '../components/AboutTheProject'

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <div className="">
        <p className='text-md text-gray-500 p-3'>Vite: A fast and lightweight build tool and development server optimized for modern web projects. It is used for both development (vite for development server) and production builds (vite build).</p>

        <p className='text-md text-gray-500 p-3 '>React: The core framework for building your user interface. React is accompanied by several related packages: React DOM for rendering React components to the DOM, React Router DOM for client-side routing, React Redux & Redux Toolkit for state management, React-Quill for a rich text editor, React Toastify for toast notifications, and React Circular Progressbar for displaying circular progress bars.</p>

        <p className='text-md text-gray-500 p-3'>Tailwind CSS: A utility-first CSS framework for styling your components, along with plugins like Flowbite React for UI components, Tailwind Scrollbar for styling scrollbars, and Tailwind Line Clamp for clamping text lines.</p>

        <p className='text-md text-gray-500 p-3'>Firebase: A comprehensive platform for building web and mobile applications, providing backend services like authentication, real-time database, and hosting.</p>

        <p className='text-md text-gray-500 p-3'>Draft.js: A React-based framework for building rich text editors.</p>

        <p className='text-md text-gray-500 p-3'>Moment.js: A library for handling and manipulating dates and times.</p>

        <p className='text-md text-gray-500 p-3'>ESLint: A static code analysis tool to ensure code quality and consistency, configured with React-specific rules and plugins.</p>

        <p className='text-md text-gray-500 p-3'>PostCSS & Autoprefixer: Tools for processing your CSS and automatically adding vendor prefixes to ensure compatibility across different browsers.</p>
      </div>

      <AboutTheProject />
    </div>
    
  )
}
