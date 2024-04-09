import { useContext, createContext } from "react";

export function useDefinedContext<T>(context: React.Context<T | undefined>) {
  const value = useContext(context);
  if (value === undefined) {
    throw new Error("context must be within provider");
  }
  return value;
}

export function createDefinedContext<T>(value: T | undefined = undefined) {
  return createContext<T | undefined>(value);
}
