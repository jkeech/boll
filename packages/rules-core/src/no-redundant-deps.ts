import { basename } from "path";
<<<<<<< HEAD
import {
  PackageRule,
  FileContext,
  asBollLineNumber,
  Result,
  Success,
  Failure,
  Logger,
  asPackageJson
} from "@boll/core";
=======
import { PackageRule, FileContext, asBollLineNumber, Result, Success, Failure, Logger } from "@boll/core";
>>>>>>> main

/**
 * NoRedundantDeps ensures that dependencies are not declared if they are already specified as peerDeps.
 */
const ruleName = "NoRedundantDeps";
export class NoRedundantDepsRule implements PackageRule {
  constructor(private logger: Logger) {}

  get name(): string {
    return ruleName;
  }

  async check(file: FileContext): Promise<Result[]> {
    if (basename(file.filename) !== "package.json") {
      return [new Success(ruleName)];
    }

<<<<<<< HEAD
    const packageJson = asPackageJson(file);

    if (!packageJson.peerDependencies || !packageJson.dependencies) {
      return [new Success(ruleName)];
    }

    const deps = Object.keys(packageJson.dependencies);
    const peerDeps = Object.keys(packageJson.peerDependencies);
=======
    const contents = JSON.parse(file.content);

    if (!contents.peerDependencies || !contents.dependencies) {
      return [new Success(ruleName)];
    }

    const deps = Object.keys(contents.dependencies);
    const peerDeps = Object.keys(contents.peerDependencies);
>>>>>>> main
    const duplicates = peerDeps.filter(pd => deps.includes(pd));
    if (duplicates.length > 0) {
      return duplicates.map(
        d =>
          new Failure(
            ruleName,
            file.filename,
            asBollLineNumber(0),
            `${d} is included in both dependencies and peerDependencies. It should only be declared once.`
          )
      );
    }
    return [new Success(ruleName)];
  }
}
