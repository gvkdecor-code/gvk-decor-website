import { useSyncExternalStore } from "react";
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (notify) => {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", notify);
  return () => preference.removeEventListener("change", notify);
};
const snapshot = () => window.matchMedia(query).matches;
export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
