/** @type {import('jest').Config} */
const config = {
	verbose: true,
	preset: 'ts-jest',
	testPathIgnorePatterns: ['/dist/'],
};

module.exports = config;
