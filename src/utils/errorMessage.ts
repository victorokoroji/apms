export const errorMessage = ({
  error,
}: {
  error: unknown;
  falbackMessage?: string;
}) => {
  return error instanceof Error
    ? error.message
    : 'Something went wrong, please check your connection and try again.';
};
