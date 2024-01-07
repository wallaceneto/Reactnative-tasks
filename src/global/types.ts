type TaskType = {
  id: number;
  desc: String;
  estimateAt: Date;
  toggleTask?: Function;
  doneAt?: Date;
};

export type {TaskType};
