import * as ts from "typescript";

export class Visitor {
  start(sourceFile) {
    const metaInfo = {};
    const nodes = sourceFile?.statements || [];

    // export 대상을 찾는다.
    nodes.forEach((node) => {
      if (node?.declarationList?.declarations) {
        node.declarationList.declarations.forEach((it) => {
          const obj = this.visitNode(it);

          Object.assign(metaInfo, obj);
        });
      }
    });

    return metaInfo;
  }

  visitProperty(properties) {
    const metaInfo = {};
    properties.forEach((property) => {
      const key = property.name.escapedText;
      let value = {};

      switch (property.initializer.kind) {
        case ts.SyntaxKind.ObjectLiteralExpression:
          value = this.visitProperty(property.initializer.properties);
          metaInfo[key] = value;
          break;
        case ts.SyntaxKind.ArrayLiteralExpression:
          metaInfo[key] = [];
          property.initializer.elements.forEach((element) => {
            metaInfo[key].push(this.visitProperty(element.properties));
          });

          break;
        default:
          value = property.initializer.text;
          metaInfo[key] = value;
          break;
      }
    });

    return metaInfo;
  }

  visitNode(node) {
    if (node.name.escapedText === "frontmatter") {
      const properties = node.initializer.properties;

      return this.visitProperty(properties);
    }

    return {};
  }
}
