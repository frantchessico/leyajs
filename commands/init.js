#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Function to copy files from a source directory to a target directory
async function copyFiles(sourceDir, targetDir) {
    const chalk = await import('chalk');
    
    console.log(chalk.default.blue('📁 Copying template files...'));
    try {
        fs.copySync(path.join(__dirname, '..', sourceDir), targetDir);
        console.log(chalk.default.green('✅ Template files copied successfully.'));
    } catch (err) {
        console.error(chalk.default.red('❌ Error copying template files:'), err);
        process.exit(1);
    }
}

// Function to create the project directory if it does not exist
function createProjectDirectory(projectDir) {
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir);
    }
}

// Function to install dependencies in the project
async function installDependencies(projectDir, dependencies) {
    const chalk = await import('chalk');
    console.log(chalk.default.blue('🔧 Installing dependencies...'));
    try {
        execSync(`npm install --save ${Object.entries(dependencies).map(([name, version]) => `${name}@${version}`).join(' ')}`, { stdio: 'inherit', cwd: projectDir });
        console.log(chalk.default.green('✅ Dependencies installed successfully.'));
    } catch (error) {
        console.error(chalk.default.red('❌ Error installing dependencies:'), error);
        process.exit(1);
    }
}

// Function to install development dependencies in the project
async function installDevDependencies(projectDir, devDependencies) {
    const chalk = await import('chalk');
    console.log(chalk.default.blue('🔧 Installing development dependencies...'));
    try {
        execSync(`npm install --save-dev ${Object.entries(devDependencies).map(([name, version]) => `${name}@${version}`).join(' ')}`, { stdio: 'inherit', cwd: projectDir });
        console.log(chalk.default.green('✅ Development dependencies installed successfully.'));
    } catch (error) {
        console.error(chalk.default.red('❌ Error installing development dependencies:'), error);
        process.exit(1);
    }
}

// Function to get the CLI version
function getVersion() {
    const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
    const packageJson = require(packageJsonPath);
    return packageJson.version;
}

// Function to show the CLI name and version
async function showCLIVersion() {
    const chalk = await import('chalk');
    console.log(chalk.default.yellow(`🚀 CLI Version: ${getVersion()}`));
}

// Main function to initialize the project
async function init() {
    const chalk = await import('chalk');
    // Target directory for the new project
    const projectDir = process.cwd();

    // Create project directory if it does not exist
    createProjectDirectory(projectDir);

    // Copy template files to the project directory
    await copyFiles('templates/', projectDir);

    // Dependencies and devDependencies to be installed
    const { dependencies, devDependencies } = require('../templates/package.json');

    // Install dependencies in the project
    installDependencies(projectDir, dependencies);

    // Install development dependencies in the project
    installDevDependencies(projectDir, devDependencies);

    // Show CLI version
    showCLIVersion();

    console.log(chalk.default.green('✨ Node.js project initialized successfully!'));
}

// Call the main function to initialize the project
module.exports = init;
