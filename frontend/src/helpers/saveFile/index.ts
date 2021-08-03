export default async function saveFile(filename: string, dataUrl: string) : Promise<void> {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
  return
}