document.addEventListener(
    "DOMContentLoaded",
    () =>
    {

        currentFilter = "all";

        setup();

        render();

    }
);



let currentFilter = "all";







function setup()
{

    document
    .getElementById(
        "filter-category"
    )
    .addEventListener(
        "change",
        e =>
        {

            currentFilter =
            e.target.value;


            render();

        }
    );

}







function render()
{

    renderFilter();

    renderShopping();

    updateCount();

}








function renderFilter()
{

    const filter =
        document
        .getElementById(
            "filter-category"
        );



    const categories =
    getCategories();




    filter.innerHTML =
    `
    <option value="all">

    すべて

    </option>
    `;



    categories.forEach(
        category =>
        {

            filter.innerHTML +=
            `
            <option value="${category}">

            ${category}

            </option>
            `;

        }
    );



    filter.value =
    currentFilter;

}








function renderShopping()
{

    const area =
        document
        .getElementById(
            "shopping-list"
        );



    area.innerHTML="";



    let items =
    getItems();






    items =
    items.filter(
        item =>
        !item.stock
    );






    if(
        currentFilter !== "all"
    )
    {

        items =
        items.filter(
            item =>
            item.category === currentFilter
        );

    }








    if(items.length === 0)
    {

        area.innerHTML =
        `
        <div class="empty">

        買い物はありません

        </div>
        `;


        return;

    }








    items.forEach(
        item =>
        {


            const div =
            document.createElement(
                "div"
            );



            div.className =
            "item no-stock";






            div.onclick =
            () =>
            {

                completeBuy(
                    item.id
                );

            };







            div.innerHTML =
`
<div class="item-info">


<span class="item-name">

${item.name}

</span>



<span class="item-category">

${item.category}

</span>



</div>

`;



            area.appendChild(div);


        }
    );

}








function completeBuy(id)
{

    const items =
    getItems();



    const item =
    items.find(
        x =>
        x.id === id
    );



    if(!item)
    {
        return;
    }



    item.stock =
    true;



    item.shopping =
    false;



    updateItem(item);



    render();

}








function updateCount()
{

    const count =
    getItems()
    .filter(
        item =>
        !item.stock
    )
    .length;



    const area =
    document
    .getElementById(
        "shopping-count"
    );



    if(area)
    {

        area.textContent =
        `買い物 ${count}件`;

    }

}
