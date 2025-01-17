export const changeClassByStatus = (status: string) => {
  switch (status) {
    case "approved":
      return "text-green-400";
    case "pending":
      return "text-yellow-400";
    case "rejected":
      return "text-red-400";
    default:
      return "text-red-400";
  }
};
