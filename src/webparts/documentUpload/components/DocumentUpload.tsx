import * as React from 'react';
import type { IDocumentUploadProps } from './IDocumentUploadProps';
import { Web } from "@pnp/sp/presets/all";
import { IDocumentUploadState } from './IDocumentUploadState';

export default class DocumentUpload extends React.Component<IDocumentUploadProps, IDocumentUploadState> {
  constructor(props: any) {
    super(props);
    this.state = {
      Attachements: []
    };
  }

  // Handle file selection
  private handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      this.setState({ Attachements: Array.from(files) });
    }
  };

  // Upload documents as attachments
  public async UploadDocuments() {
    try {
      let web = Web(this.props.siteurl);
      const list = web.lists.getByTitle(this.props.ListName);
      
      // Add an empty item first
      const item = await list.items.add({});
      const itemId = item.data.Id;
      
      // Upload each attachment
      for (const file of this.state.Attachements) {
        const arrayBuffer = await file.arrayBuffer();
        await list.items.getById(itemId).attachmentFiles.add(file.name, arrayBuffer);
      }
      
      console.log("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files", error);
    }
  }

  public render(): React.ReactElement<IDocumentUploadProps> {
    return (
      <div>
        <input type="file" multiple onChange={this.handleFileChange} />
        <button onClick={() => this.UploadDocuments()}>Upload</button>
      </div>
    );
  }
}
