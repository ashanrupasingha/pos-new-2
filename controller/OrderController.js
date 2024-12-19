import {customerArray,itemArray,orderArray,orderDetailArray,cartArray} from "../db/database.js";
import OrderModel from "../model/OrderModel.js";
import OrderDetailModel from "../model/OrderDetailModel.js";

export function loadCustomers() {

    $("#customers").empty();
    customerArray.map((item, number) => {

        let data = ` <option>${item._customer_id}</option>`

        console.log(data);
        $("#customers").append(data);

    })
}
export function loadItems(){

    $("#items").empty();
    itemArray.map((item,number) =>{

        let data = `<option>${item._item_code}</option>`

        console.log(data);
        $("#items").append(data);

    })
}

$(document).ready(function (){
    $("#orderId").val(generateOrderId());
})


//GENERATE ORDER ID

let generateOrderId = function generateOrderId(){

    let id = orderArray.length + 1;
    return "O0" + id;
}

let setOrderId = () => {
    $("#orderId").val(generateOrderId());
}


//GET ITEM DETAILS WHEN ITEM CODE IS ENTERED

$("#items").on('input', function (){

    let id = $(this).val();
    let itemCode = itemArray.findIndex(item =>
                          item._item_code === id);

    if(itemCode !== 'item_code' ){
        
        $("#itemName").val(itemArray[itemCode]._description);
        $("#itemPrice").val(itemArray[itemCode]._unit_price);
        $("#itemQtyOnHand").val(itemArray[itemCode]._quantity);

    }else{
        $("#itemName").val("");
        $("#itemPrice").val("");
        $("#itemQtyOnHand").val("");
    }

});




// $("#customers").on('input',function (){
//
//     let id = $(this).val();
//     let customerId = customerArray.findIndex(item => item._customer_id === id);
//
//     if(customerId !== 'customer_id'){
//
//         $("#customerName").val(customerArray[customerId]._name);
//     }
//     else {
//         $("#customerName").val('');
//     }
//
// });


//GET CUSTOMER DETAILS WHEN CUSTOMER NAME IS ENTERED

$("#customerName").on('input', function () {

    let name = $(this).val().toLowerCase();

    let customer = customerArray.find(item => item._name.toLowerCase().includes(name));

    if (customer) {

        $("#customers").val(customer._customer_id);

    } else {

        Swal.fire({

            icon: "error",
            title: "Oops...",
            text: "Customer not found!",

        });

        $("#customers").val('');
    }

});



//LOAD CART TABLE

const loadCartTable = () =>{
    cartArray.map((item,index) =>{
        let data = `<tr><td>${item.item_code}</td><td>${item.description}</td><td>${item.unit_price}</td><td>${item.qty}</td><td>${item.total}</td></tr>`
        console.log(item);
        $('#orderTableBody').append(data);
    })
}


//ADD TO CART

$('#cartBtn').on('click',function (){

    let item_code = $("#items").val();
    let description = $("#itemName").val();
    let unit_price = $("#itemPrice").val();
    let qtyOnHand = $("#itemQtyOnHand").val();
    let qty = $("#itemQty").val();

    let order_id = generateOrderId();
    let date = $("#date").val();
    let customerId = $("#customers").val();
    let customerName = $("#customerName").val();
    let total = unit_price * qty;

    let payment = $("#inputTotal").val(total);


    if(qty > qtyOnHand){

        Swal.fire({

            icon: "error",
            title: "Oops...",
            text: "Not enough quantity!",

        });

    }else if((item_code.length == 0) || (description.length == 0) || (unit_price.length == 0) || (qtyOnHand.length == 0) || (qty.length == 0) || (order_id.length == 0) || (date.length ==0) || (customerId.length == 0) || (customerName.length == 0)){

        Swal.fire({

            icon: "error",
            title: "Oops...",
            text: "Empty fields!",

        });
    }
    else {

        let cart_item = {
            item_code:item_code,
            description:description,
            unit_price:unit_price,
            qty:qty,
            total:total
        }


        cartArray.push(cart_item);

        loadCartTable();
        updateItemArray();

        console.log(itemArray);
    }


});


//UPDATE ITEM ARRAY AFTER ORDER IS PLACED

function updateItemArray() {

    let item_code = $("#items").val();
    let qtyOnHand = parseInt($("#itemQtyOnHand").val());
    let qty = parseInt($("#itemQty").val());

    // Find the item in the array
    let item = itemArray.find(item => item._item_code === item_code);

    // Check that item is exists

    if (item) {
        item._quantity = qtyOnHand - qty; // Update the quantity

    } else {
        console.error(`Item not found in itemArray`);

    }
}

let orderCount = 0;
$('#order-count').text(orderCount);



//PLACE ORDER

$("#order_btn").on('click',function (){

    let item_code = $("#items").val();
    let unit_price = $("#itemPrice").val();
    let qty = $("#itemQty").val();

    let order_id = generateOrderId();
    let date = $("#date").val();
    let customerId = $("#customers").val();
    let customerName = $("#customerName").val();
    let total = unit_price * qty;

    let order = new OrderModel(
        order_id,
        customerId,
        date,
        total
    )

    let orderDetail = new OrderDetailModel(
        order_id,
        item_code,
        qty,
        unit_price
    )

   if(orderArray.push(order) && orderDetailArray.push(orderDetail)){

       console.log(order);
       console.log(orderDetail);

       Swal.fire({
           title: "Order Placed Successfully!",
           icon: "success"
       });

       clearOrderForm();
       setOrderId();

       orderCount += 1;
       $('#order-count').text(orderCount);

   }else{

       Swal.fire({
           icon: "error",
           title: "Oops...",
           text: "Order not placed!",

       });
   }

});

function clearOrderForm(){

    $("#items").val('');
    $("#itemPrice").val('');
    $("#itemName").val('');
    $("#itemQty").val('');
    $("#itemQtyOnHand").val('');
    $("#orderId").val('');
    $("#date").val('');
    $("#customers").val('');
    $("#customerName").val('');
    $("#inputTotal").val('');
    clearTable();
}


//CLEAR TABLE

function clearTable() {
    let tableBody = $("#orderTableBody")[0];
    tableBody.innerHTML = ''; // Clear all rows
}

