export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="relative w-18 h-18">
        <div className="absolute inset-0 border-4 border-dashed border-gray-400 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl font-bold font-poppins">MONKE</h1>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
