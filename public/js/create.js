(async() => {
    const response = (await axios.get("/create/nomencladores")).data.data
    build_nomen(response)
})()

const build_nomen = (nomencladores) => {
    const selector = document.getElementById("select-nomen");
    nomencladores.map(nom => {
        const opt = document.createElement("option");
        opt.value = opt.text = nom;
        selector.append(opt)
    })

    selector.onchange = (e) => {
        evaluate_type(e.target.value)
    }

}

const evaluate_type = (type) => {
    let elements = [

        document.createElement("input"),
        document.createElement("input"),
        document.createElement("input"),

    ];

    elements[0].type = "number";
    elements[2].type = "number";

    elements[0].name = "id";
    elements[1].name = "name";
    elements[2].name = "price";


    // "name"
    // "id"
    // "price"


    let aux;
    switch (type) {
        case "weapons":
        case "ammo":
            aux = document.createElement("input");
            aux.name = 'caliber';
            elements.push(aux)
            break;

        case "clothes":
            aux = document.createElement("input");
            aux.name = 'armour_rating';
            elements.push(aux)
        case "backpacks":
            aux = document.createElement("input");
            aux.name = 'capacity';
            elements.push(aux)
            break;

        case "aditaments":
            aux = document.createElement("input");
            aux.name = 'magnification';
            elements.push(aux)
            aux = document.createElement("input");
            aux.name = 'type';
            elements.push(aux)
            aux = document.createElement("input");
            aux.name = 'compatibility';
            elements.push(aux)
            break;


        case "":
            elements = [];
            break;

    }
    const tbody = document.getElementById("tbody");

    tbody.textContent = "";
    elements.map(element => {


        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const label = document.createElement("label");

        td1.className = "w-25";
        label.className = 'label-table';
        element.className += 'label-table';
        label.textContent = normalizate(element.name);

        tbody.append(tr)
        tr.append(td1)
        td1.append(label)
        tr.append(td2)
        td2.append(element)


    })
}