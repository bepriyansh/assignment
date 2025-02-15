export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString();
};

export const formatTime = (timeStr: string) => {
  return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
