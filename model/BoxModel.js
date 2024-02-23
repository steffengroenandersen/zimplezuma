export class BoxModel {
  constructor() {
    this.color = this.getRandomColor();
  }

  // Method to get a random color (Red, Green, or Blue)
  getRandomColor() {
    const colors = ["Red", "Green", "Blue"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
}
