export function LoadingSpinner({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin" />
  );
}
