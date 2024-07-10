const normalizate = (text) => {
    text = text.replace("_", " ");
    text = text.split(" ");
    let final = "";
    text.map(t => final += t[0].toUpperCase() + t.substring(1, t.length) + " ")
    return final.trim()
}