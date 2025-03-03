import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDocumentUploadProps {
  ListName:string;
  siteurl:string;
  context:WebPartContext;
}
