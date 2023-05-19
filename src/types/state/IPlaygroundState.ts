export interface IPlaygroundState {
  queryEditorValue: string;
  variablesEditorValue: string;
  headersEditorValue: string;
  schemaIsOpen: boolean;
  isParamsOpen: boolean;
  responseEditorValue: string;
  paramsEditor: 'variables' | 'headers';
  status: string;
  isSuccess: boolean;
}
