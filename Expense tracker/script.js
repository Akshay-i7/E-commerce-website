console.log("Javascript is connected");
//taking date value as current date
let entryDate=document.querySelector("#entry-date");
entryDate.value=new Date().toISOString().split("T")[0];

//taking input values
let entryDesc=document.querySelector("#entry-desc");
let entryAmount=document.querySelector("#entry-amount");
let entryCategory=document.querySelector("#entry-category");
let entriesList=document.querySelector("#entries-list");



//taking add button when we click on it we will add the entry to the list
let addBtn=document.querySelector(".add-btn");


//when we click on add button we will add the entry to the list
addBtn.addEventListener("click", function() {
    console.log("Add button clicked");
    let desc=entryDesc.value;
    let amount=Number(entryAmount.value);
    let category=entryCategory.value;
    let date=entryDate.value;
    let formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit"
    });
    let type=document.querySelector('input[name="type"]:checked').value;
    console.log(desc, amount, category, date);
    let row=document.createElement("tr");
    let dateCell=document.createElement("td");
    let descCell=document.createElement("td");
    let categoryCell=document.createElement("td");
    let amountCell=document.createElement("td");
    let deleteBtn=document.createElement("button");
    deleteBtn.textContent="Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.hidden=true;
    let categoryTag=document.createElement("span");
    dateCell.textContent=formattedDate;
    descCell.textContent=desc;
    dateCell.classList.add("date");
    categoryTag.textContent=category;
    categoryTag.classList.add("tag");
    categoryCell.appendChild(categoryTag);
    amountCell.textContent=`${type === "income" ? "+" : "-"}₹${amount.toFixed(2)}`;
    amountCell.classList.add("amount", type === "income" ? "credit" : "debit");
    row.append(dateCell,descCell,categoryCell,amountCell,deleteBtn);
    entriesList.prepend(row);
    updateTotals();
});

//take the values from entries list and calculate the total income, total expense and balance
let totalIncome=document.querySelector(".credit");
let totalExpense=document.querySelector(".debit");
let balance=document.querySelector(".balance");
totalIncome.textContent="₹0.00";
totalExpense.textContent="₹0.00";
balance.textContent="₹0.00";

//update the total income, total expense and balance when we add a new entry
function updateTotals() {
    let income=0;
    let expense=0;
    let rows=entriesList.querySelectorAll("tr");
    rows.forEach(row => {
        let amountCell=row.querySelector(".amount");
        let amount=Number(amountCell.textContent.replace(/[^0-9.-]+/g,""));
        if(amountCell.classList.contains("credit")) {
            income+=amount;
        } else {
            expense+=amount;
        }
    });
    totalIncome.textContent=`₹${income.toFixed(2)}`;
    totalExpense.textContent=`₹${expense.toFixed(2)}`;
    balance.textContent=`₹${(income - expense).toFixed(2)}`;
};
let currentDate=new Date();
let currentMonth=currentDate.getMonth();
let currentYear=currentDate.getFullYear();
let showDate=document.querySelector(".app-header .date");
showDate.textContent=`${currentDate.getDate()}${currentDate.getDate() === 1 ? "st" : currentDate.getDate() === 2 ? "nd" : currentDate.getDate() === 3 ? "rd" : "th"} ${currentDate.toLocaleString("default", { month: "long" })} ${currentYear}`;  

//when we click on the row in recent entries we will delete the entry from the list
entriesList.addEventListener("click", function(event) {
    let row =event.target.closest("tr");
    if(!row) {
        return;
    }
    let deleteBtn=row.querySelector(".delete-btn");
    if(event.target === deleteBtn) {
        row.remove();
        updateTotals();
        return;
    }
    deleteBtn.hidden=!deleteBtn.hidden;
});