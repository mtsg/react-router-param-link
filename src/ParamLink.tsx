import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import * as URLParse from "url-parse";
import { LocationDescriptorObject } from "history";


export class ParamLink extends React.Component<LinkProps, undefined> {
  render() {
    return (
      < Link to={new LinkComplementer(this.props.to).DEST_PATHNAME} >
        {this.props.children}
      </Link >
    )
  }
}

class LinkComplementer {
  readonly DEST_PATHNAME: string;

  constructor(linkToProp: string | LocationDescriptorObject) {
    const DESTINATION_PRE_PATHNAME = linkToProp.toString();
    if (this.isParameterIncluded(DESTINATION_PRE_PATHNAME)) {
      const CURRENT_PATHNAME = URLParse(window.location.href).pathname;
      const DESTINATION_PATHNAME = this.constructCompleteDestPath(DESTINATION_PRE_PATHNAME, CURRENT_PATHNAME);

      this.DEST_PATHNAME = DESTINATION_PATHNAME;
    } else
      this.DEST_PATHNAME = DESTINATION_PRE_PATHNAME;
  }

  private isParameterIncluded(pathname: string): boolean {
    if (pathname.indexOf(":") !== -1)
      return true;
    else
      return false;
  }

  private constructCompleteDestPath(destParamPath: string, currentPath: string) {
    return this.constructCompleteDestPathResources(destParamPath, currentPath).join("/");
  }

  private constructCompleteDestPathResources(destParamPath: string, currentPath: string): string[] {
    const DEST_PATH_PARAM_RESOURECES = destParamPath.split("/");
    const CURRENT_PATH_RESOURCES = currentPath.split("/");
    const DEST_PATH_RESOURECES: string[] = [];
    for (let i = 0; i < DEST_PATH_PARAM_RESOURECES.length; i++)
      if (this.isParameterIncluded(DEST_PATH_PARAM_RESOURECES[i]))
        DEST_PATH_RESOURECES.push(CURRENT_PATH_RESOURCES[i])
      else
        DEST_PATH_RESOURECES.push(DEST_PATH_PARAM_RESOURECES[i])
    return DEST_PATH_RESOURECES;
  }
}
