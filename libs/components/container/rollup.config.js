import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const config = {
  input: "./src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "esm",
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    babel({
      extensions,
      exclude: "node_modules/**",
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        "react-is": ["ForwardRef", "Memo"],
        "prop-types": [
          "array",
          "bool",
          "func",
          "number",
          "object",
          "string",
          "symbol",
          "any",
          "arrayOf",
          "element",
          "elementType",
          "instanceOf",
          "node",
          "objectOf",
          "oneOf",
          "oneOfType",
          "shape",
          "exact",
        ],
      },
    }),
  ],
};

export default config;
