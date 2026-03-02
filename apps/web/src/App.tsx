export default function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <nav className="p-5 flex justify-between">
        <div className="flex justify-start gap-10 items-center">
          <div className="flex items-center gap-2">
            <img src="/quickhire.png" alt="QuickHire Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold font-heading">QuickHire</span>
          </div>
          <div className="flex justify-start gap-5">
            <a className="text-gray font-sans hover:underline">Find Jobs</a>
            <a className="text-gray font-sans">Browse Companies</a>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <a className="text-primary font-sans font-semibold p-3">Login</a>
          <a className="text-white bg-primary font-sans font-semibold px-4 py-3">Sign up</a>
        </div>
      </nav>
    </div>
  );
}
