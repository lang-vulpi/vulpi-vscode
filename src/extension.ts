import * as vscode from 'vscode';
import * as path from 'path';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient;

function hello() {
  vscode.window.showInformationMessage('Hello World from Vulpi!');
}

function initLSP() { // TODO: look for a better name
  const serverPath = path.join("/home/danitw/development/vulpi/target/debug/vulpi-cli"); // Replace with your LSP binary name

  const serverOptions: ServerOptions = {
    run: { command: serverPath, transport: TransportKind.stdio },
    debug: { command: serverPath, transport: TransportKind.stdio },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'plaintext' }], // Specify your language identifier
  };

  client = new LanguageClient(
    'vulpiLanguageServer', // Replace with your extension ID
    'Vulpi Language Server', // Replace with your extension name
    serverOptions,
    clientOptions
  );

  // context.subscriptions.push(client.start());
  client.start();
}

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('initializing Vulpi!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('vulpi.helloWorld', hello);

  context.subscriptions.push(disposable);

  initLSP();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
