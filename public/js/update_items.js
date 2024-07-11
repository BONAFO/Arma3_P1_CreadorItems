(async() => {
    const response = (await axios.get("/create/nomencladores")).data.data
        // const response_item = (await axios.get("/get/item/" + )).data
    console.log(response_item);
    build_nomen(response)
})()

const build_nomen = (nomencladores) => {
    const selector = document.getElementById("select-nomen");
    nomencladores.map(nom => {
        const opt = document.createElement("option");
        opt.value = opt.text = nom;
        selector.append(opt)
    })




    selector.onchange = async(e) => {
        // evaluate_type(e.target.value)
        document.getElementById("items").textContent = "";
        try {
            const response = await axios.get('/get/' + e.target.value)
            if (response.status == 200) {
                response.data.data.map(item => {
                    show_items(item, response.data.type)
                })
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

}




const show_items = (item, type) => {
    const container = document.getElementById("items");
    let v_hidden = true;
    const item_card = document.createElement("div");
    item_card.className = "item-card";
    const img = document.createElement("img");
    img.src = item.imgUrl;

    const div1 = document.createElement("div");
    const table = document.createElement("table");
    table.className = "w-100 table-item";
    const tbody = document.createElement("tbody");
    tbody.id = 'item-data-' + item.id;
    const div3 = document.createElement("div");
    div3.className = "separator";

    const btn1 = document.createElement("button");
    btn1.className = "btn-item"
    btn1.id = "delete-btn";
    btn1.textContent = "UPDATE";

    btn1.onclick = async() => {
        window.location.href = "/update/" + item.id;
        // if (confirm('Delete ' + item.name + " ?")) {
        //     const response = await axios.delete('/delete/' + `?type=${type}&id=${item.id}`)
        //     if (response.status == 200) {
        //         item_card.remove()
        //     }
        //     alert(response.data.msj)
        // }
    }



    const btn2 = document.createElement("button");
    btn2.className = "btn-item"
    btn2.id = "show-btn";
    btn2.textContent = "SHOW VALUES";

    btn2.onclick = () => {
        if (v_hidden) {
            v_hidden = false;
            btn2.textContent = "HIDE VALUES";
            const not_show = ["id", "imgUrl"];

            Object.keys(item).map(k => {
                if (not_show.indexOf(k) == -1) {
                    const tr = document.createElement("tr");
                    tr.className = "tr-item";
                    const td1 = document.createElement("td");
                    td1.className = "w-50 text-center td-item";
                    td1.textContent = k;
                    const td2 = document.createElement("td");
                    td2.className = "w-50 text-center td-item";
                    td2.textContent = item[k];
                    tr.append(td1)
                    tr.append(td2)
                    tbody.append(tr)
                }
            })
        } else {
            tbody.textContent = "";
            v_hidden = true;
            btn2.textContent = "SHOW VALUES";

        }

    }

    container.append(item_card)
    item_card.append(img)
    item_card.append(div1)

    div1.append(table)
    table.append(tbody)
    div1.append(div3)
    div1.append(btn1)
    div1.append(btn2)


};