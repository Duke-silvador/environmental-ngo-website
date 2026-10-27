import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * This project lives inside the user profile directory, and a stray
   * `package-lock.json` sits in the home directory. Without an explicit root,
   * Turbopack resolves the workspace to the home directory and ignores the
   * project's own lockfile. Pinning the root keeps resolution correct and
   * silences the "would include your home directory" warning.
   */
  turbopack: {
    root: path.resolve("."),
  },
};

export default nextConfig;