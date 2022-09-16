export class RBNode {
  constructor(val, color = "red") {
    this.value = val;
    this.parent = null;
    this.left = null;
    this.right = null;
    this.color = color;
  }
  rotateRightNode(tree) {
    const parent = this.parent;
    const child = this.left;
    if (parent) {
      const type = parent.left === this ? "left" : "right";
      parent[type] = child;
      child.parent = parent;
    } else {
      tree.root = child;
    }
    this.left = null;
    child.parent = parent;
    this.parent = child;
    const childRight = child.right;
    child.right = this;
    if (childRight) {
      childRight.parent = null;
      this.left = childRight;
    }
  }
  rotateLeftNode(tree) {
    const parent = this.parent;
    const child = this.right;
    if (parent) {
      const type = parent.left === this ? "left" : "right";
      parent[type] = child;
      child.parent = parent;
    } else {
      tree.root = child;
    }
    this.right = null;
    child.parent = parent;
    const childLeft = child.left;
    child.left = this;
    this.parent = child;
    if (childLeft) {
      childLeft.parent = null;
      this.right = childLeft;
    }
  }
  checkColor(tree) {
    if (this.parent && this.parent.color === "red") {
      if (
        this.parent.parent &&
        this.parent.parent.left &&
        this.parent.parent.left.color === "red" &&
        this.parent.parent.right &&
        this.parent.parent.right.color === "red"
      ) {
        if (this.parent.parent && this.parent.parent !== tree.root) {
          this.parent.parent.color = "red";
          this.parent.parent.checkColor(tree);
        }
        if (this.parent.parent.left) {
          this.parent.parent.left.color = "black";
        }
        if (this.parent.parent.right) {
          this.parent.parent.right.color = "black";
        }
      } else {
        let type = 1;
        if (
          this.parent.right === this &&
          this.parent.parent.left === this.parent
        ) {
          type = 2;
          this.parent.rotateLeftNode(tree);
          this.parent.rotateRightNode(tree);
        } else if (
          this.parent.left === this &&
          this.parent.parent.right === this.parent
        ) {
          this.parent.rotateRightNode(tree);
          this.parent.rotateLeftNode(tree);
          type = 2;
        } else if (
          this.parent.left === this &&
          this.parent.parent.left === this.parent
        ) {
          this.parent.parent.rotateRightNode(tree);
        } else {
          this.parent.parent.rotateLeftNode(tree);
        }
        if (type === 1) {
          this.parent.color = "black";
          this.parent.left.color = "red";
          this.parent.right.color = "red";
        } else {
          this.color = "black";
          this.left.color = "red";
          this.right.color = "red";
        }
      }
    }
  }
  addNode(node, tree) {
    if (!this.left && !this.right) {
      if (this.value > node.value) {
        this.left = node;
      } else {
        this.right = node;
      }
      node.parent = this;
      node.checkColor(tree);
    } else if (this.left && this.right) {
      if (this.value > node.value) {
        this.left.addNode(node, tree);
      } else {
        this.right.addNode(node, tree);
      }
    } else {
      if (this.value > node.value) {
        if (this.left) {
          this.left.addNode(node, tree);
        } else {
          this.left = node;
          node.parent = this;
          node.color = "red";
          node.checkColor(tree);
        }
      } else {
        if (this.right) {
          this.right.addNode(node, tree);
        } else {
          this.right = node;
          node.parent = this;
          node.color = "red";
          node.checkColor(tree);
        }
      }
    }
  }
}

export class RBTree {
  constructor() {
    this.root = null;
  }

  addNode(val) {
    const node = new RBNode(val);
    if (this.root) {
      this.root.addNode(node, this);
    } else {
      this.root = node;
      this.root.color = "black";
    }
  }
}
