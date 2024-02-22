import * as vscode from "vscode";

export const componentWithDynamicPlaceholder = () => {
  let componentWithDynamicPlaceholder = vscode.commands.registerCommand(
    "sitecore-xm-cloud-components.insertComponentWithDynamicPlaceholder",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const filename = editor.document.fileName.split(/[/\\]/).pop();
        if (filename) {
          const componentName = filename.replace(/\.[^/.]+$/, "");
          const propsTypeName = `${componentName}Props`;

          const componentTemplate = `import { Field, withDatasourceCheck, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { ComponentProps } from 'lib/component-props';
    
interface Fields {
    // Define your fields here
    heading: Field<string>;
    $1
}
    
type ${propsTypeName} = ComponentProps & {
    fields: Fields;
};
    
const ${componentName} = ({ fields, params, rendering }: ${propsTypeName}) => {
    const id = params.RenderingIdentifier;
    return (
        <section className={params.styles}>
            {/* Component content */}
            <Text field={fields.heading} />
            <Placeholder name={\`$2-\${params.DynamicPlaceholderId}\`} rendering={rendering} />
            $3
        </section>
    );
};
    
export default withDatasourceCheck()<${propsTypeName}>(${componentName});`;

          editor.insertSnippet(new vscode.SnippetString(componentTemplate));
        } else {
          vscode.window.showErrorMessage("Cannot determine the filename.");
        }
      } else {
        vscode.window.showErrorMessage("Editor is not active.");
      }
    }
  );

  return componentWithDynamicPlaceholder;
};
