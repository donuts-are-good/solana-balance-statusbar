import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as util from 'util';

const execPromise = util.promisify(exec);

let statusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {
    // Check if Solana CLI is installed
    try {
        await execPromise('solana --version');
    } catch (error) {
        vscode.window.showErrorMessage('Solana CLI is not installed. Please install it to use this extension. Visit https://docs.solanalabs.com/cli/install for instructions.');
        return;
    }

    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(statusBarItem);

    updateStatusBar();
    let interval = setInterval(updateStatusBar, getUpdateInterval());

    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
        clearInterval(interval);
        interval = setInterval(updateStatusBar, getUpdateInterval());
    }));

    statusBarItem.show();
}

async function updateStatusBar() {
    try {
        const keyPath = vscode.workspace.getConfiguration('solanaBalance').get('walletPath') as string;
        const { stdout: balance } = await execPromise(`solana balance --keypair ${keyPath}`);
        const { stdout: address } = await execPromise(`solana address --keypair ${keyPath}`);
        const { stdout: config } = await execPromise('solana config get');
        
        const shortAddress = `${address.trim().slice(0, 4)}...${address.trim().slice(-4)}`;
        const displayFormat = vscode.workspace.getConfiguration('solanaBalance').get('displayFormat') as string;
        
        if (displayFormat === 'short') {
            statusBarItem.text = `◎ ${balance.trim()} [${shortAddress}]`;
        } else {
            statusBarItem.text = `Balance: ${balance.trim()} | Address: ${shortAddress} [Solscan]`;
        }

        // Determine the network from the RPC URL
        const rpcUrl = config.match(/RPC URL: (.*)/)?.[1].toLowerCase() || '';
        let network = 'mainnet';
        if (rpcUrl.includes('devnet')) {
            network = 'devnet';
        } else if (rpcUrl.includes('testnet')) {
            network = 'testnet';
        }

        statusBarItem.tooltip = `${config}\n\nClick to view wallet on Solscan (${network})`;
        statusBarItem.command = {
            title: "Open in Solscan",
            command: "vscode.open",
            arguments: [vscode.Uri.parse(`https://solscan.io/account/${address.trim()}${network !== 'mainnet' ? `?cluster=${network}` : ''}`)]
        };
    } catch (err) {
        statusBarItem.text = 'Error reading Solana data';
        statusBarItem.tooltip = 'Error executing Solana CLI commands';
    }
}


function getUpdateInterval(): number {
    return vscode.workspace.getConfiguration('solanaBalance').get('updateInterval', 10) * 1000;
}

export function deactivate() {}
