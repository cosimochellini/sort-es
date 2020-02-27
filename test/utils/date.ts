const withoutTime = (date: Date): Date => {
  date.setHours(0, 0, 0, 0);
  return date;
};

export { withoutTime };
