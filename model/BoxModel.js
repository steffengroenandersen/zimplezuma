export class BoxModel {
  constructor() {
    this.prev = null;
    this.next = null;
    this.data = this.getRandomColor();
  }

  getRandomColor() {
    const colors = ["Red", "Green", "Blue"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
}
