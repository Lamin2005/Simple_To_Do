function Error() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600">
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <p className="text-gray-600 mt-2">
        Please check the URL and try again, or return to the{" "}
        <a href="/" className="text-blue-500 hover:underline">
          home page
        </a>
        .
      </p>
    </div>
  );
}

export default Error;
