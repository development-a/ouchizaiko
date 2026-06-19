document.addEventListener(
    "DOMContentLoaded",
    () =>
    {

        currentFilter =
            "all";


        setupFilter();

        render();


    }
);



let currentFilter = "all";







/*
--------------------------------
フィルター設定
--------------------------------
*/

function setupFilter()
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








/*
--------------------------------
全体表示
--------------------------------
*/

function render()
{

    renderFilter();

    renderShopping();


}









/*
--------------------------------
フィルター生成
--------------------------------
*/

function renderFilter()
{

    const select =
        document
        .getElementById(
            "filter-category"
        );



    const categories =
        getCategories();



    select.innerHTML =
    `
    <option value="all">
    すべて
    </option>
    `;




    categories.forEach(
        c =>
        {

            select.innerHTML +=
            `
            <option value="${c}">
            ${c}
            </option>
            `;

        }
    );



    select.value =
        currentFilter;


}









/*
--------------------------------
買い物表示
--------------------------------
*/

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



    /*
    在庫なしだけ表示
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
        currentFilter !== "all"
    )
    {

        items =
            items.filter(
                item =>
                item.category === currentFilter
            );

    }






    if(items.length===0)
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
                "item shopping-touch";



            /*
            タップで購入扱い
            */

            div.onclick =
                () =>
                {
                    buyItem(
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


<div class="item-actions">


<div class="switch">


<div class="slider">

</div>


</div>


</div>

`;



            area.appendChild(div);



        }
    );


}








/*
--------------------------------
購入完了
--------------------------------
*/

function buyItem(id)
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
