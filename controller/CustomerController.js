import CustomerModel from "../model/CustomerModel.js";

import {customerArray} from "../db/database.js";

import {loadCustomers} from "./OrderController.js";



/*------------  CUSTOMER SECTION  -------------*/

let selected_customer_index = null;

$(document).ready(function (){
    $("#customer_id").val(generateCustomerId());
})


//EMAIL VALIDATION

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

//MOBILE VALIDATION

const validateMobile = (mobile) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

//GENERATE CUSTOMER ID

let generateCustomerId = function generateCustomerId(){

    let id = customerArray.length + 1;
    return "C0" + id;
}

let setCustomerId = () => {
    $("#customer_id").val(generateCustomerId());
}


//LOAD CUSTOMER TABLE

const loadCustomerTable = () => {
        $("#customerTableBody").empty();
        customerArray.map((item,index) =>{
        console.log(item);

        let data = `<tr><td>${item.customer_id}</td><td>${item.name}</td><td>${item.address}</td><td>${item.email}</td><td>${item.contact}</td></tr>`
        $('#customerTableBody').append(data);
    })
}

let customerCount = 0;
$('#customer-count').text(customerCount);

//SAVE CUSTOMER

$('#cusSaveBtn').on('click',function (){

    let customer_id = generateCustomerId();
    let name = $('#customer_name').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let contact = $('#contact').val();

   if (name.length == 0){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Customer Name",
        });
    }else if(address.length == 0){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Address",
        });
    }else if(!validateEmail(email)){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Email",
        });
    }else if(!validateMobile(contact)){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Contact Number",
        });
    }
    else{
        let customer = new CustomerModel(
            customer_id,
            name,
            address,
            email,
            contact
        );

        if (customerArray.push(customer)){

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Customer has been saved successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            loadCustomerTable();
            loadCustomers();
            clearForm();
            setCustomerId();

            customerCount += 1;
            $('#customer-count').text(customerCount);

        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Customer not been saved!!",

            });
        }

    }

});


//GET CUSTOMER DETAILS USING TABLE ROW

$('#customerTableBody').on('click','tr',function (){

    let index = $(this).index();

    selected_customer_index = index;

    let customerObj = customerArray[index];

    let customerId = customerObj.customer_id;
    let customerName = customerObj.name;
    let address = customerObj.address;
    let email = customerObj.email;
    let contact = customerObj.contact;

    $('#customer_id').val(customerId);
    $('#customer_name').val(customerName);
    $('#address').val(address);
    $('#email').val(email);
    $('#contact').val(contact);

});


//UPDATE CUSTOMER

$('#cusUpdateBtn').on('click',function (){

    let index = selected_customer_index;

    let customer_id = $('#customer_id').val();
    let name = $('#customer_name').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let contact = $('#contact').val();

    let customer = new CustomerModel(
        customerArray[index].customer_id,
        name,
        address,
        email,
        contact
    );


   customerArray[selected_customer_index] = customer

    loadCustomerTable();
    clearForm();
    setCustomerId();

});


//DELETE CUSTOMER

$('#cusDeleteBtn').on('click',function (){

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"

    }).then((result) => {
        if (result.isConfirmed) {

            customerArray.splice(selected_customer_index);

            loadCustomerTable();
            clearForm();
            setCustomerId();

            Swal.fire({
                title: "Deleted!",
                text: "Customer has been deleted.",
                icon: "success"
            });
        }
    });

});


//SEARCH CUSTOMER

$('#cusSearchBtn').on('click', function () {
    let searchName = $('#customer_search').val().toLowerCase();

    let filteredCustomers = customerArray.filter(customer =>
        customer.name.toLowerCase().includes(searchName)
    );

    loadCustomerTable2(filteredCustomers.length ? filteredCustomers : customerArray);
});


//Update loadCustomerTable function
function loadCustomerTable2(customers) {
    $('#customerTableBody').empty();
    customers.forEach(customer => {
        $('#customerTableBody').append(`
            <tr>
                <td>${customer.customer_id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.email}</td>
                <td>${customer.contact}</td>
            </tr>
        `);
    });
}

//CLEAR CUSTOMER FORM

$('#cusClearBtn').on('click',function (){

    clearForm();

});

function clearForm(){

    $('#customer_id').val("");
    $('#customer_name').val("");
    $('#address').val("");
    $('#email').val("");
    $('#contact').val("");
}
