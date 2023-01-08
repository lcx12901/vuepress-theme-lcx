import pc from "picocolors";
// @ts-ignore
import { execaCommand } from "execa";
// @ts-ignore
import ora from "ora";
// @ts-ignore
import pkg from "../package.json" assert { type: "json" };
// @ts-ignore
import inquirer from "inquirer";

const { version: currentVersion } = pkg;
const { prompt } = inquirer;

const tags = ["next", "test", "alpha", "beta", "latest"];

const release = async (): Promise<void> => {
  ora(`Current version: ${pc.green(currentVersion)}`).info();

  const { npmTag } = await prompt<{ npmTag: string }>([
    {
      name: "npmTag",
      message: "Input npm tag:",
      type: "list",
      default: tags[0],
      choices: tags,
    },
  ]);

  // release
  await execaCommand(`pnpm -r publish --tag ${npmTag}`, { stdio: "inherit" });
};

void release();
