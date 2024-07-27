"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
function activate(context) {
    let panel;
    const filePath = `${os.homedir()}/.solbalance.txt`;
    function updateContent() {
        if (panel) {
            try {
                const content = fs.readFileSync(filePath, 'utf-8');
                panel.webview.html = `<pre>${content}</pre>`;
            }
            catch (err) {
                panel.webview.html = `Error reading file: ${err}`;
            }
        }
    }
    let disposable = vscode.commands.registerCommand('extension.showSolBalance', () => {
        panel = vscode.window.createWebviewPanel('solBalance', 'Sol Balance', vscode.ViewColumn.One, {});
        updateContent();
        setInterval(updateContent, 1000);
        panel.onDidDispose(() => {
            panel = undefined;
        }, null, context.subscriptions);
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map