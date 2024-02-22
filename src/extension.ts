import * as vscode from "vscode";
import {basicComponentWithDatasource}  from "./commandsComponents/basicWithDataSource";
import { componentWithPlaceholder } from "./commandsComponents/componentWithPlaceholder";
import { componentWithDynamicPlaceholder } from "./commandsComponents/componentWithDynamicPlaceholder";
import { componentWithDatasourceRendering } from "./commandsComponents/componentWithDatasourceRendering";

export function activate(context: vscode.ExtensionContext) {
  
  let basicComponent = basicComponentWithDatasource();

  let withPlaceholder = componentWithPlaceholder();

  let withDynamicPlaceholder = componentWithDynamicPlaceholder();

  let withDatasourceRendering = componentWithDatasourceRendering();

  context.subscriptions.push(basicComponent);
  context.subscriptions.push(withPlaceholder);
  context.subscriptions.push(withDynamicPlaceholder);
  context.subscriptions.push(withDatasourceRendering);
}

export function deactivate() {}
