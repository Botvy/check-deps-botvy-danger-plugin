import { checkIfStringIsInStringArray } from './helper';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export class PackageManager {
    private _dependencies: Record<string, string>;

    constructor(private _modifiedFiles: string[]) {}

    public loadData() {
        const { rawFileContent, content } = this.getPackageFileContent();

        const dependencies = this.pipe(
            content,
            (parsedFileContent) => parsedFileContent.dependencies,
        );

        console.log({ dependencies });
    }

    public get isPackageJSONFileFound() {
        return checkIfStringIsInStringArray(
            this._modifiedFiles,
            'package.json',
        );
    }

    public get isLockFileFound() {
        return (
            checkIfStringIsInStringArray(
                this._modifiedFiles,
                'package-lock.json',
            ) || checkIfStringIsInStringArray(this._modifiedFiles, 'yarn.lock')
        );
    }

    public get dependencies() {
        const dependencies = Object.keys(this._dependencies);
        return Object.keys(this._dependencies);
    }

    private getPackageFileContent() {
        const filePath = resolve(process.cwd(), 'package.json');
        const rawFileContent = readFileSync(filePath, 'utf8');
        const parsedFileContent = JSON.parse(rawFileContent);

        return {
            content: parsedFileContent,
            rawFileContent,
        };
    }

    private pipe<T, U, V>(
        initialValue: T,
        ...funcs: (<V>(arg: T | V) => T | V)[]
    ): T | V {
        return funcs.reduce((acc, func) => func(acc), initialValue);
    }
}
