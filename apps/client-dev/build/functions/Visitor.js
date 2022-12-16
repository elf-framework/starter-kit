export class Visitor {
  start(node) {
    this.collects = [];
    this.visitNode(node);
  }

  /* Deal with nodes in an array */
  visitNodes(nodes) {
    for (const node of nodes) this.visitNode(node);
  }
  /* Dispatch each type of node to a function */
  visitNode(node) {
    // console.log(node);
    switch (node.type) {
      case "Program":
        return this.visitProgram(node);
      case "ExportNamedDeclaration":
        return this.visitExportNamedDeclaration(node);
      case "VariableDeclaration":
        return this.visitVariableDeclaration(node);
      case "VariableDeclarator":
        return this.visitVariableDeclarator(node);
      case "Identifier":
        return this.visitIdentifier(node);
      case "Literal":
        return this.visitLiteral(node);
    }
  }

  getArrayExpression(node) {
    const arr = [];

    node.elements.forEach((it) => {
      if (it.type === "ObjectExpression") {
        arr.push(this.getObjectExpression(it));
      } else if (it.type === "ArrayExpression") {
        arr.push(this.getArrayExpression(it));
      } else {
        arr.push(it.value);
      }
    });

    return arr;
  }

  getObjectExpression(node) {
    const obj = {};
    node.properties.forEach((prop) => {
      if (prop.value.type === "ObjectExpression") {
        obj[prop.key.name] = this.getObjectExpression(prop.value);
      } else if (prop.value.type === "ArrayExpression") {
        obj[prop.key.name] = this.getArrayExpression(prop.value);
      } else {
        obj[prop.key.name] = prop.value.value;
      }
    });
    return obj;
  }

  /* Functions to deal with each type of node */
  visitExportNamedDeclaration(node) {
    node.declaration.declarations.forEach((it) => {
      if (it.init.type === "Literal") {
        this.collects.push({
          [it.id.name]: it.init.value,
        });
      } else if (it.init.type === "ObjectExpression") {
        const obj = this.getObjectExpression(it.init);
        this.collects.push({
          [it.id.name]: obj,
        });
      }
    });
    // return this.visitNode(node.declaration);
  }
  visitProgram(node) {
    return this.visitNodes(node.body);
  }
  visitVariableDeclaration(node) {
    return this.visitNodes(node.declarations);
  }
  visitVariableDeclarator(node) {
    this.visitNode(node.id);
    return this.visitNode(node.init);
  }
  visitIdentifier(node) {
    return node.name;
  }
  visitLiteral(node) {
    return node.value;
  }

  toJSON() {
    return Object.assign(...this.collects);
  }
}
