export default function NotFound() {
    return(
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-6xl font-bold mb-4">404</h1>
  
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist.
        </p>
  
        <Link
          to="/todo"
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Go Back Home
        </Link>
      </div>
    )
}