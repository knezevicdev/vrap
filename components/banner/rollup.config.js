import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

// Require understands JSON files.
// const packageJson = require("./package.json");
// const external = Object.keys(packageJson.peerDependencies);

const isProd = process.env.NODE_ENV === "production";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
};

const config = {
  input: "./src/index.tsx",
  output: [
    {
      file: "./dist/js/index.js",
      format: "umd",
      name: "Banner",
      globals,
      sourcemap: true,
    },
    {
      file: "./dist/esm/index.js",
      format: "es",
      globals,
      // sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    babel({
      extensions,
      include: ["src/**/*"],
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
  // external,
};

export default config;
