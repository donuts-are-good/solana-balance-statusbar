# Solana Balance Statusbar

A VS Code extension that shows your Solana balance right in the statusbar. No more switching windows to check your balance!

## What You Need

Before you get started, make sure you've got:

- VSCode
- Solana CLI

## What This Extension Does

This extension does a few cool things:

- Shows your Solana balance in the VS Code statusbar
- Updates automatically (you can set how often)
- Lets you choose between a short or long display format
- Gives you a quick link to view your account on Solscan

## What You'll See

After installing, you'll see something like this in your statusbar:

Short format: `◎ 8.42199968 [Avg1...fwTR]` 

Long format: `Balance: 8.42199968 SOL | Address: Avg1...fwTR [Solscan]`

Click on it to open your account on Solscan.


## How to Set It Up

- Install the extension
- Open VS Code settings
- Search for "Solana Balance"
- Set your wallet path (default is ~/.config/solana/id.json)
- Choose how often you want it to update (in seconds)
- Pick your preferred display format (short or long)

That's it! Your balance should now show up in the statusbar. If it doesn't, make sure your Solana CLI is working correctly.


## Troubleshooting

If you're not seeing your balance:

- Check if Solana CLI is installed (solana --version in terminal)
- Make sure your wallet path is correct in the settings
- Try reloading VS Code


Hope this helps :) Happy coding