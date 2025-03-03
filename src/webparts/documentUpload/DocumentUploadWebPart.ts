import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'DocumentUploadWebPartStrings';
import DocumentUpload from './components/DocumentUpload';
import { IDocumentUploadProps } from './components/IDocumentUploadProps';
import {sp} from "@pnp/sp/presets/all"; 
export interface IDocumentUploadWebPartProps {
  ListName: string;
}

export default class DocumentUploadWebPart extends BaseClientSideWebPart<IDocumentUploadWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext:this.context
      });
    });
  }
  

  public render(): void {
    const element: React.ReactElement<IDocumentUploadProps> = React.createElement(
      DocumentUpload,
      {
       ListName:this.properties.ListName,
       siteurl:this.context.pageContext.web.absoluteUrl,
       context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  




  

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
