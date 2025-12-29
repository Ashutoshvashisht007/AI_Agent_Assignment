export const InlineError = ({
  message,
  onClose,
}: {
  message: string;
  onClose?: () => void;
}) => (
  <div className="rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 text-sm flex justify-between items-center">
    <span>{message}</span>
    {onClose && (
      <button onClick={onClose} className="opacity-70 hover:opacity-100">
        ✕
      </button>
    )}
  </div>
);
