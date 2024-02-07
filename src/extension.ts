import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "sitecore-xm-cloud-components.insertReactComponent",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const filename = editor.document.fileName.split(/[/\\]/).pop();
        if (filename) {
          const componentName = filename.replace(/\.[^/.]+$/, "");
          const propsTypeName = `${componentName}Props`;

          const componentTemplate = `import React from 'react';
import { ComponentParams, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { ComponentProps } from 'lib/component-props';

interface Fields {
    // Define your fields here
    $1
}

type ${propsTypeName} = ComponentProps & {
    fields: Fields;
    params: ComponentParams;
};

const ${componentName} = ({ fields, params }: ${propsTypeName}) => {
    return (
        <section className={params.styles}>
            {/* Component content */}
            $2
        </section>
    );
};

export const Default = withDatasourceCheck()<${propsTypeName}>(${componentName});`;

          editor.insertSnippet(new vscode.SnippetString(componentTemplate));
        } else {
          vscode.window.showErrorMessage("Cannot determine the filename.");
        }
      } else {
        vscode.window.showErrorMessage("Editor is not active.");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
