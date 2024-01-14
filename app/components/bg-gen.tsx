export function BackgroundColour() {
    const colors = [
      "bg-violet-100",
      "bg-pink-100",
      "bg-red-100",
      "bg-orange-100",
      "bg-yellow-100",
      "bg-lime-100",
      "bg-cyan-100",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  }