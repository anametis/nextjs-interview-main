export const ErrorText = ({ message }: { message: string }) => (
  <div className="flex h-full items-center justify-center text-red-500">
    <p>{message}</p>
  </div>
);