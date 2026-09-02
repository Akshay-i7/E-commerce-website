console.log("Javascript is connected");
//taking date value as current date
let entryDate=document.querySelector("#entry-date");
entryDate.value=new Date().toISOString().split("T")[0];

//taking input values
let entryDesc=document.querySelector("#entry-desc");
let entryAmount=document.querySelector("#entry-amount");
let entryCategory=document.querySelector("#entry-category");


//taking add button when we click on it we will add the entry to the list
let addBtn=document.querySelector(".add-btn");
    
//when we click on add button we will add the entry to the list
addBtn.addEventListener("click", function() {
    console.log("Add button clicked");
    let desc=entryDesc.value;
    let amount=Number(entryAmount.value);
    let category=entryCategory.value;
    let date=entryDate.value;
    console.log(desc, amount, category, date);
});
