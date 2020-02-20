import sort from "../sort";

const byNumber: sortableWithOption<number> = (
  options: sortOption = { desc: false }
): sortable<number> => {
  return (first: number, second: number) => sort(first - second, options);
};

export default byNumber;
