// src/functional/index.ts
function Pipe(...fns) {
  return (...args) => fns.reduce((arg, fn) => arg.length ? fn(...arg) : fn(arg), args);
}

// src/module/importModule.ts
import { pathToFileURL } from "url";
async function importModule(fileAbsPath) {
  let module;
  try {
    module = await import(pathToFileURL(fileAbsPath).href);
  } catch (error) {
    module = await import(fileAbsPath);
  }
  return module;
}
var packageJsonDefault = () => ({
  name: "",
  version: "",
  description: "",
  main: "",
  module: "",
  types: "",
  files: [],
  scripts: {},
  dependencies: {},
  devDependencies: {},
  peerDependencies: {},
  optionalDependencies: {},
  bundledDependencies: [],
  keywords: []
});
async function importPackageJson(fileAbsPath) {
  const module = (await importModule(fileAbsPath)).default;
  const pkg = {
    ...packageJsonDefault(),
    ...module
  };
  return pkg;
}
export {
  Pipe,
  importModule,
  importPackageJson,
  packageJsonDefault
};
