const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');
const DATA_FILE_PATH = path.join(__dirname, '..', 'data', 'issues.json');

async function readIssues() {
    try {
        const text = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(text);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
            throw error;
        }
    }
}

async function writeIssues(issues) {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(issues, null, 2));
}

async function createIssues(input) {
    const issues = await readIssues();
    const issue = {
        id: randomUUID(),
        title: input.title.trim(),
        description: input.description.trim(),
        priority: input.priority,
        status: 'Open',
        createdAt: new Date().toISOString()
    };
    issues.push(issue);
    await writeIssues(issues);
    return issue;
}

async function updateIssueStatus(id, status) {
    const issues = await readIssues();
    const issue = issues.find(issue => issue.id === id);
    if (!issue) return null;
    issue.status = status;
    await writeIssues(issues);
    return issue;
}

module.exports = {
    readIssues,
    createIssues,
    updateIssueStatus
};


