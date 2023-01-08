import { readdirSync } from "node:fs";
import { request } from "node:https";
import { resolve } from "node:path";
// @ts-ignore
import ora from "ora";

const packagesDir = resolve(process.cwd(), "packages");
const packages = readdirSync(packagesDir);

export const sync = (): Promise<void[]> => {
    // @ts-ignore
    const promises = packages.map((packageName) => import(`../packages/${packageName}/package.json`, {assert: { type: "json" },})
        .then(
            ({ default: content }: { default: Record<string, unknown> }) =>
                new Promise<void>((resolve) => {
                    const req = request(
                        new URL(
                            `https://registry-direct.npmmirror.com/${
                                content["name"] as string
                            }/sync?sync_upstream=true`
                        ),
                        {
                            method: "PUT",
                            headers: {
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                "Content-Length": 0,
                            },
                        }
                    );

                    req.write("");

                    req.on("close", () => {
                        resolve();
                    });

                    req.end();
                })
        )
    );

    return Promise.all(promises);
};

const npmmirrorSpinner = ora("Syncing npmmirror.com").start();

void sync().then(() => {
    npmmirrorSpinner.succeed();

    ora("Release complete").succeed();
});
