import { BoxModel } from "./BoxModel.js";

export class BoxSnake {
  constructor() {
    this.head = new BoxModel();

    this.tail = new BoxModel();

    this.head.data = "HEAD";
    this.tail.data = "TAIL";

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  traverse(callback) {
    let currentBox = this.head.next; // Start from the first box after the head
    while (currentBox !== this.tail) {
      callback(currentBox);
      currentBox = currentBox.next;
    }
  }

  dumpList() {
    console.log("dumpList()");

    let aNode = this.head;

    while (aNode != null) {
      console.log(`
        node: ${aNode.data}
        ------------
        prev: ${aNode.prev ? aNode.prev.data : null}
        next: ${aNode.next ? aNode.next.data : null}
      `);

      aNode = aNode.next;
    }
  }

  addFirst(newNode) {
    console.log("addFirst()");

    newNode.prev = this.head;
    newNode.next = this.head.next;
    newNode.next.prev = newNode;
    this.head.next = newNode;
  }

  addLast(newNode) {
    console.log("addLast()");

    newNode.prev = this.tail.prev;
    newNode.prev.next = newNode;
    newNode.next = this.tail;
    this.tail.prev = newNode;
  }

  insertBeforeIndex(node, index) {
    console.log("insertBeforeIndex()");

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null && currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    if (currentNode !== null) {
      node.prev = currentNode.prev;
      node.next = currentNode;
      currentNode.prev.next = node;
      currentNode.prev = node;
    } else {
      console.log("Index out of range");
    }
  }

  insertAfterIndex(newNode, index) {
    console.log("insertAfterIndex()");

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null && currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    if (currentNode !== null) {
      newNode.prev = currentNode;
      newNode.next = currentNode.next;
      currentNode.next = newNode;

      if (newNode.next !== null) {
        newNode.next.prev = newNode;
      }
    } else {
      console.log("Index out of range");
    }
  }
}
