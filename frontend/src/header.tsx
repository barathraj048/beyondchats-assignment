export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            BeyondChats
          </h1>
          <p className="text-sm text-gray-500">
            Article Enhancement Demo
          </p>
        </div>
        <div className="sm:flex items-center gap-3">
          <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
            Laravel + Node + LLM
          </span>
        </div>

      </div>
    </header>
  );
}
