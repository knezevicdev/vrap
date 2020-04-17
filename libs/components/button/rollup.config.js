import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

// Require understands JSON files.
const packageJson = require("./package.json");
const peerDependencies = Object.keys(packageJson.peerDependencies);
const dependencies = Object.keys(packageJson.dependencies);

const config = {
  input: "./src/index.jsx",
  output: [
    {
      file: "./dist/index.esm.js",
      format: "esm",
    },
    {
      file: "./dist/index.cjs.js",
      format: "cjs",
    },
  ],
  external: peerDependencies.concat(dependencies),
  plugins: [resolve(), babel(), commonjs()],
};

export default config;
