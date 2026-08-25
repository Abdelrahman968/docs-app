export function getUserColor(name: string) {
  const nameToNumber = name.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  const hue = Math.abs(nameToNumber) % 360;

  return `hsl(${hue}, 80%, 60%)`;
}
