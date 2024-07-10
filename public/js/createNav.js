/*
{
text: ""
attr:[]

}

*/


const createNavTable = (idTable, arr = []) => {
    const table = document.getElementById(idTable)

    arr.map(i => {
        // const td = document.createElement("td");
        // const btn = document.createElement("button");
        // const a = document.createElement("a");

        const elements = {
            td: document.createElement("td"),
            btn: document.createElement("button"),
            a: document.createElement("a"),
        };

        Object.keys(i.attr).map(k => {
            const attrs = i.attr[k]
            Object.keys(attrs).map(attr => {
                elements[k].setAttribute(attr, attrs[attr])
            })
        })

        elements.a.textContent = i.text;

        table.append(elements.td)
        elements.td.append(elements.btn)
        elements.btn.append(elements.a)

    })

};

const parseStyle = (dataStyle) => {
    let style = "";
    Object.keys(dataStyle).map(sty => {
        style += `${sty}:${dataStyle[sty]};`
    })

    return style

}


// console.log(parseStyle({
//     color: "red",
//     "font-size": "10vh"
// }));