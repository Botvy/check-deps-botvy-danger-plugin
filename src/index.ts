// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from '../node_modules/danger/distribution/dsl/DangerDSL';
import { checkIfStringIsInStringArray } from './helper';
declare var danger: DangerDSLType;
export declare function message(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;
export declare function markdown(message: string): void;

/**
 * Checks the *dependencies in the package.json and changes in the lockfile
 */
export default function checkDepsBotvyDangerPlugin() {
    // Replace this with the code from your Dangerfile
    const title = danger.github.pr.title;

    const { modified_files } = danger.git;

    if (!checkIfStringIsInStringArray(modified_files, 'package.json')) {
        // package.json file was not modified
        return;
    }

    const file = danger.github.utils.fileContents('package.json');
    console.log({ file });

    switch (true) {
        // Failthrough when we know the package manager
        case checkIfStringIsInStringArray(modified_files, 'package-lock.json'):
        case checkIfStringIsInStringArray(modified_files, 'yarn.lock'):
            break;

        default:
            // No matching package manager found
            return;
    }
}
