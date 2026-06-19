document.addEventListener(
    "DOMContentLoaded",
    () =>
    {
        initShopping();
    }
);



let shoppingFilter = "all";







function initShopping()
{

    const filter =
    document
    .getElementById(
        "filter-category"
    );



    if(filter)
    {

        filter.addEventListener(
            "change",
            e =>
            {

                shoppingFilter =
                e.target.value;


                renderShopping();

            }
        );

    }



    renderShopping();

}










function renderShopping()
{

    renderShoppingFilter();


    const area =
    document
    .getElementById(
        "shopping-list"
    );



    if(!area)
    {
        return;
    }



    area.innerHTML="";



    let items =
    getItems();






    /*
    在庫なしのみ表示
    */

    items =
    items.filter(
        item =>
        !item.stock
    );






    /*
    フィルター
    */

    if(
        shoppingFilter !== "all"
    )
    {

        items =
        items.filter(
            item =>
            item.category === shoppingFilter
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


        updateShoppingCount();

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





            /*
            タップ購入
            */

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



    updateShoppingCount();

}









function renderShoppingFilter()
{

    const filter =
    document
    .getElementById(
        "filter-category"
    );



    if(!filter)
    {
        return;
    }



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
    shoppingFilter;

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



    renderShopping();

}









function updateShoppingCount()
{

    const area =
    document
    .getElementById(
        "shopping-count"
    );



    if(!area)
    {
        return;
    }




    const count =
    getItems()
    .filter(
        item =>
        !item.stock
    )
    .length;




    area.textContent =
    `買い物 ${count}件`;

}
