type TaskType = {
  id: number;
  desc: String;
  estimateAt: Date;
  doneAt?: Date;
  onToggleTask?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export type {TaskType};
