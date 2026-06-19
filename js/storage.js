const STORAGE_KEY =
    "homeInventoryData";



/*
-----------------------------
データ取得
-----------------------------
*/

function getItems()
{

    const data =
        localStorage.getItem(
            STORAGE_KEY
        );


    if(!data)
    {
        return [];
    }


    return JSON.parse(data);

}




/*
-----------------------------
データ保存
-----------------------------
*/

function saveItems(items)
{

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
    );

}




/*
-----------------------------
追加
-----------------------------
*/

function addItem(item)
{

    const items =
        getItems();


    item.id =
        Date.now();



    item.shopping =
        false;



    items.push(item);



    saveItems(items);

}




/*
-----------------------------
更新
-----------------------------
*/

function updateItem(updated)
{

    const items =
        getItems();


    const index =
        items.findIndex(
            item =>
                item.id === updated.id
        );



    if(index !== -1)
    {

        items[index] =
            updated;


    }


    saveItems(items);

}




/*
-----------------------------
削除
-----------------------------
*/

function deleteItem(id)
{

    let items =
        getItems();



    items =
        items.filter(
            item =>
                item.id !== id
        );



    saveItems(items);

}




/*
-----------------------------
買い物状態変更
-----------------------------
*/

function toggleShopping(id)
{

    const items =
        getItems();



    const item =
        items.find(
            item =>
                item.id === id
        );



    if(item)
    {

        item.shopping =
            !item.shopping;

    }



    saveItems(items);

}




/*
-----------------------------
全削除
-----------------------------
*/

function clearItems()
{

    localStorage.removeItem(
        STORAGE_KEY
    );

}
