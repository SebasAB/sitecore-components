import * as vscode from "vscode";

export const componentWithDatasourceRendering = () => {
  let componentWithDatasourceRendering = vscode.commands.registerCommand(
    "sitecore-xm-cloud-components.insertComponentWithDatasourceRendering",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const filename = editor.document.fileName.split(/[/\\]/).pop();
        if (filename) {
          const componentName = filename.replace(/\.[^/.]+$/, "");
          const propsTypeName = `${componentName}Props`;

          const componentTemplate = `import { withDatasourceRendering } from '@constellation4sitecore/foundation-enhancers';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
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
    
const ${componentName} = ({ fields, params }: ${propsTypeName}) => {
    return (
        <section className={params.styles}>
            {/* Component content */}
            <Text field={fields.heading} />
            $2
        </section>
    );
};
    
export default withDatasourceRendering()<${propsTypeName}>(${componentName});`;

          editor.insertSnippet(new vscode.SnippetString(componentTemplate));
        } else {
          vscode.window.showErrorMessage("Cannot determine the filename.");
        }
      } else {
        vscode.window.showErrorMessage("Editor is not active.");
      }
    }
  );

  return componentWithDatasourceRendering;
};
