/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
    // Type check TypeScript files
    '**/*.(ts|js|tsx|jsx)': () => 'yarn tsc --noEmit',

    // Lint then format TypeScript and JavaScript files
    '**/*.(ts|js|tsx|jsx)': (filenames) => [
        `yarn eslint --fix ${filenames.join(' ')}`,
        `yarn prettier --write ${filenames.join(' ')}`,
    ],

    // Format MarkDown and JSON
    '**/*.(md|json)': (filenames) =>
        `yarn prettier --write ${filenames.join(' ')}`,
};
