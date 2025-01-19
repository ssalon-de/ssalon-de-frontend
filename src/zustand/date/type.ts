import { StateCreator } from "zustand";
import { PersistOptions } from "zustand/middleware";

export interface DateStates {
  date: Date;
}

export interface DateActions {
  setDate: (date: Date) => void;
}

export type DatePersist = (
  config: StateCreator<DateStore>,
  options: PersistOptions<DateStates>
) => StateCreator<DateStore>;

export interface DateStore extends DateStates, DateActions {}
