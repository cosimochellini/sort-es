import sort from "../sort";

const byString: sortableWithOption<string> = (
  options: sortOption = { desc: false }
): sortable<string> => {
  return (first: string, second: string) =>
    sort(first.localeCompare(second), options);
};

export default byString;
