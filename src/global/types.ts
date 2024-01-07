type TaskType = {
  id: number;
  desc: String;
  estimateAt: Date;
  toggleTask?: (id: number) => void;
  doneAt?: Date;
};

export type {TaskType};
