function readFile(file) {
  return new Promise((resolve) => {
    let fr = new FileReader()
    fr.onload = x=> resolve(fr.result)
    fr.readAsText(file)
  })
}

export default async function pickFile() {

}