import { UseMutationOptions } from "@tanstack/react-query";

export type MutateType = "DELETE" | "UPDATE" | "CREATE";
export type MutationOptions<Data> = UseMutationOptions<unknown, unknown, Data>;
