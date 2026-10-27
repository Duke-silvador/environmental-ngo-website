"use client";

import { useSyncExternalStore } from "react";

/**
 * `false` during server rendering and the first client render, `true` from the
 * moment hydration finishes.
 *
 * Persisted state (localStorage) only exists in the browser, so reading it in a
 * lazy `useState` initializer gives the client a different first render than
 * the server produced. Gate the real UI on this hook: both sides render the
 * same placeholder, so there is no hydration mismatch and no `setState` inside
 * an effect.
 */
const subscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}