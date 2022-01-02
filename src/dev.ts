import path from "path";
import { Spec } from "./lib";

async function main() {
  try {
    const specPath = path.resolve(process.cwd(), "definitions", "swagger.yaml");
    const spec = await Spec.createInstance(specPath);
    console.log(spec);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();