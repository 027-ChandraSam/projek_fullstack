export default function ConfirmModal({ open, title, onConfirm, onCancel }) {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-200 ${
          open ? "bg-black/60 backdrop-blur-sm opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-80 shadow-xl transform transition-all duration-200 ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <h2 className="text-white text-lg font-semibold mb-5">
            {title}
          </h2>
  
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition"
            >
              Batal
            </button>
  
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-800 transition"
            >
              Ya
            </button>
          </div>
        </div>
      </div>
    );
  }
  