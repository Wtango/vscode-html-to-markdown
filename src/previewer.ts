import * as vscode from 'vscode';
import TurndownService from 'turndown';

import { log } from './logger';


export class Html2MarkdownPreviewer {

    private _context: vscode.ExtensionContext;
    private turndown: TurndownService;

    constructor(context: vscode.ExtensionContext) {
        this._context = context;
        this.turndown = new TurndownService();
        log('Html2MarkdownPreviewer is created.');
    }

    showPreviewer() {
        if (!vscode.window.activeTextEditor) {
            vscode.window.showWarningMessage('There is no active editor');
        } else {
            const currentText = vscode.window.activeTextEditor.document.getText();
            const md = this.turndown.turndown(currentText);
            this.showInNewEditor(md);
        }
    }

    private async showInNewEditor(content: string): Promise<void> {
        try {
            const doc = await vscode.workspace.openTextDocument({ language: 'markdown', content });
            // navigate to the new text document containing the markdown content
            vscode.commands.executeCommand('vscode.open', doc.uri);
        } catch (err) {
            console.error(err);
        }
    }
}
