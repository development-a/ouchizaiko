const STORAGE_KEY =
    "homeInventoryManager";



/*
--------------------------------
初期ジャンル
--------------------------------
*/

const DEFAULT_CATEGORIES = [

    "食品",
    "飲料",
    "日用品",
    "その他"

];





/*
--------------------------------
全データ取得
--------------------------------
*/

function getData()
{

    const data =
        localStorage.getItem(
            STORAGE_KEY
        );



    if(!data)
    {

        return {

            items:[],

            categories:
                [...DEFAULT_CATEGORIES]

        };

    }



    return JSON.parse(data);

}





/*
--------------------------------
全データ保存
--------------------------------
*/

function saveData(data)
{

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}





/*
--------------------------------
商品取得
--------------------------------
*/

function getItems()
{

    return getData().items;

}





/*
--------------------------------
商品追加
--------------------------------
*/

function addItem(item)
{

    const data =
        getData();



    item.id =
        Date.now();



    item.stock =
        true;



    item.shopping =
        false;



    data.items.push(item);



    saveData(data);

}






/*
--------------------------------
商品更新
--------------------------------
*/

function updateItem(item)
{

    const data =
        getData();



    const index =
        data.items.findIndex(
            x =>
            x.id === item.id
        );



    if(index !== -1)
    {

        data.items[index] =
            item;

    }



    saveData(data);

}






/*
--------------------------------
商品削除
--------------------------------
*/

function deleteItem(id)
{

    const data =
        getData();



    data.items =
        data.items.filter(
            x =>
            x.id !== id
        );



    saveData(data);

}






/*
--------------------------------
並び替え
--------------------------------
*/


function moveItem(
    id,
    direction
)
{

    const data =
        getData();



    const items =
        data.items;



    const index =
        items.findIndex(
            x =>
            x.id === id
        );



    if(index === -1)
    {
        return;
    }




    const target =
        index + direction;



    if(
        target < 0 ||
        target >= items.length
    )
    {
        return;
    }




    [
        items[index],
        items[target]

    ] =
    [
        items[target],
        items[index]
    ];



    saveData(data);

}






/*
--------------------------------
ジャンル取得
--------------------------------
*/

function getCategories()
{

    return getData()
        .categories;

}






/*
--------------------------------
ジャンル追加
--------------------------------
*/

function addCategory(name)
{

    const data =
        getData();



    if(
        name === "" ||
        data.categories.includes(name)
    )
    {
        return;
    }



    data.categories.push(name);



    saveData(data);

}







/*
--------------------------------
ジャンル削除
--------------------------------
*/

function deleteCategory(name)
{

    const data =
        getData();



    data.categories =
        data.categories.filter(
            x =>
            x !== name
        );



    /*
    削除したジャンルの商品は
    その他へ移動
    */


    data.items.forEach(
        item =>
        {

            if(item.category === name)
            {

                item.category =
                    "その他";

            }

        }
    );



    saveData(data);

}
