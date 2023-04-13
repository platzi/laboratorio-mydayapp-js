import { taskPlanner } from "../data/Tasks";

const incrementer = () => {
  let counter = 0;
  return () => {
    const lastId = taskPlanner.getLastTaskId();
    counter = lastId ? lastId : 0;
    counter++;
    return counter;
  };
};

export const idGenerator = incrementer();
