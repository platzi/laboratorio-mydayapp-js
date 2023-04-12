const incrementer = () => {
  let counter = 0;
  return () => {
    counter++;
    return counter;
  };
};

export const idGenerator = incrementer();
