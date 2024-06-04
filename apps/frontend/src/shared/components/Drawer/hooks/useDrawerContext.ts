import { useContext } from "react";
import { DrawerContext } from "../context";

export function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("Invalid Usage of DrawerContext");
  return context;
}
