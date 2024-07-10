const nav_elements = [{
        text: "ADD ITEM",
        attr: {
            td: {},
            btn: {
                class: "h2 nav-btn"
            },
            a: {
                href: "/create"
            },

        }
    },
    {
        text: "REMOVE ITEM",
        attr: {
            td: {},
            btn: {
                class: "h2 nav-btn"
            },
            a: {
                href: "/remove"
            },

        }
    },
    {
        text: "UPDATE ITEM",
        attr: {
            td: {},
            btn: {
                class: "h2 nav-btn"
            },
            a: {
                href: "/update"
            },

        }
    },
    {
        text: "SHOW ITEM",
        attr: {
            td: {},
            btn: {
                class: "h2 nav-btn"
            },
            a: {
                href: "/show"
            },

        }
    },

];

createNavTable("table", nav_elements)

// document.getElementById("cosa").setAttribute("style", "color: red;")