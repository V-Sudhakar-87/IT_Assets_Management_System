if(
    localStorage.getItem("isLoggedIn")
    !== "true"
){

    window.location.replace(
    "index.html"
    );

}

history.pushState(
    null,
    null,
    location.href
);

window.onpopstate = function(){

    history.go(1);

};
function toggleSidebar(){

    document
    .getElementById("sidebar")
    .classList
    .toggle("show");

}
document.addEventListener("click", function(event){
     if(window.innerWidth <= 768){

        const sidebar =
        document.getElementById("sidebar");

        const menuBtn =
        document.querySelector(".menu-btn");

        if(
            !sidebar.contains(event.target)
            &&
            !menuBtn.contains(event.target)
        ){

            sidebar.classList.remove("show");

        }

    }
    else{
    const sidebar =
    document.getElementById("sidebar");

    const menuBtn =
    document.querySelector(".menu-btn");

    if(
        !sidebar.contains(event.target)
        &&
        !menuBtn.contains(event.target)
    ){

        sidebar.classList.remove("show");

    }
}
});

window.onload = () => {

    const user =
    JSON.parse(
        localStorage.getItem("user")
    );

    if(user){

        document.getElementById(
        "welcomeText"
        ).innerHTML =
        `Welcome ${user.name} 👋`;

        document.getElementById(
        "adminName"
        ).innerHTML =
        user.name;

    }
     const today = new Date();

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const dayName =
    days[today.getDay()];

    document.getElementById("dayName")
    .innerHTML = dayName;

    document.getElementById("dateText")
    .innerHTML =
    today.toLocaleDateString(
        "en-US",
        {
            month:"short",
            day:"numeric",
            year:"numeric"
        }
    );
   loadEmployees();
   loadAssets();
   loadAllocations();
   loadAllocatedAssetsCount();
   loadRecentAllocations();
   loadAllocationChart();
   loadMaintenanceRequests();
   loadNotificationCount();
   loadDashboardStats();
   loadRecentRequests()
}
function logout(){

    localStorage.removeItem("user");

    localStorage.removeItem(
    "isLoggedIn"
    );

    window.location.replace(
    "index.html"
    );

}
// Donut Chart

let assetChart;
let allocationChart;

async function loadAllocationChart(){

    const response =
    await fetch(
    "/api/allocations/stats/monthly"
    );

    const data =
    await response.json();

    const ctx =
    document.getElementById(
    "allocationChart"
    );

    if(allocationChart){

        allocationChart.destroy();

    }

    allocationChart =
    new Chart(ctx,{

        type:"line",

        data:{

            labels:[
                "Jan","Feb","Mar",
                "Apr","May","Jun",
                "Jul","Aug","Sep",
                "Oct","Nov","Dec"
            ],

            datasets:[{

                label:"Allocated Assets",

                data:
                data.monthlyData,

                borderColor:"#2563eb",

                backgroundColor:
                "rgba(37,99,235,0.1)",

                fill:true,

                tension:0.4

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{
                    display:true
                }

            }

        }

    });

}
function openAllocationModal(){

    document.getElementById(
    "allocationModal"
    ).style.display = "flex";

}

function closeAllocationModal(){

    document.getElementById(
    "allocationModal"
    ).style.display = "none";

}
function openMaintenanceModal(){

    document.getElementById(
    "maintenanceModal"
    ).style.display = "flex";

}

function closeMaintenanceModal(){

    document.getElementById(
    "maintenanceModal"
    ).style.display = "none";

}

function showEmployees(element){
    removeActive();
    element.classList.add(
    "active"
    );
    document.getElementById(
    "dashboardPage"
    ).style.display = "none";

    document.getElementById(
    "employeePage"
    ).style.display = "block";
    document.getElementById("assetsPage").style.display="none";
    document.getElementById(
    "allocationPage"
    ).style.display = "none";

    document.getElementById(
    "reportsPage"
    ).style.display =
    "none";

    document.getElementById(
    "settingsPage"
    ).style.display =
    "none";

    document.getElementById(
    "maintenancePage"
    ).style.display =
    "none";
}
function showDashboard(element){
    removeActive();
   element.classList.add(
    "active"
    );
    document.getElementById(
    "employeePage"
    ).style.display = "none";
    document.getElementById("assetsPage").style.display="none";
    document.getElementById(
    "dashboardPage"
    ).style.display = "block";
    document.getElementById(
    "allocationPage"
    ).style.display = "none";

    document.getElementById(
    "reportsPage"
    ).style.display =
    "none";

    document.getElementById(
    "settingsPage"
    ).style.display =
    "none";
    
    document.getElementById(
    "maintenancePage"
    ).style.display =
    "none";
}
function showAssets(element){
    removeActive();
   element.classList.add(
    "active"
    );
    document.getElementById(
    "employeePage"
    ).style.display = "none";
    document.getElementById("assetsPage").style.display="block";
    document.getElementById(
    "dashboardPage"
    ).style.display = "none";
    document.getElementById(
    "allocationPage"
    ).style.display = "none";
    document.getElementById(
    "reportsPage"
    ).style.display =
    "none";

    document.getElementById(
    "settingsPage"
    ).style.display =
    "none";

    document.getElementById(
    "maintenancePage"
    ).style.display =
    "none";

}
function openAssetPage(){

    removeActive();

    document.getElementById(
    "asset-menu"
    ).classList.add(
    "active"
    );

    document.getElementById(
    "employeePage"
    ).style.display = "none";

    document.getElementById(
    "assetsPage"
    ).style.display = "none";

    document.getElementById(
    "dashboardPage"
    ).style.display = "none";

    document.getElementById(
    "allocationPage"
    ).style.display = "block";

    document.getElementById(
    "reportsPage"
    ).style.display =
    "none";

    document.getElementById(
    "settingsPage"
    ).style.display =
    "none";

    document.getElementById(
    "maintenancePage"
    ).style.display =
    "none";

}
function showReports(element){

    removeActive();

    element.classList.add(
    "active"
    );

    document.getElementById(
    "dashboardPage"
    ).style.display =
    "none";

    document.getElementById(
    "employeePage"
    ).style.display =
    "none";

    document.getElementById(
    "assetsPage"
    ).style.display =
    "none";

    document.getElementById(
    "allocationPage"
    ).style.display =
    "none";

    document.getElementById(
    "reportsPage"
    ).style.display =
    "block";
    document.getElementById(
    "settingsPage"
    ).style.display =
    "none";

    document.getElementById(
    "maintenancePage"
    ).style.display =
    "none";
    generateReport(); // 🔥 default load

}
function showSettings(element){

    removeActive();

    element.classList.add(
    "active"
    );

    document.getElementById(
    "dashboardPage"
    ).style.display =
    "none";

    document.getElementById(
    "employeePage"
    ).style.display =
    "none";

    document.getElementById(
    "assetsPage"
    ).style.display =
    "none";

    document.getElementById(
    "allocationPage"
    ).style.display =
    "none";

    document.getElementById(
    "reportsPage"
    ).style.display =
    "none";

    document.getElementById(
    "settingsPage"
    ).style.display =
    "block";

    document.getElementById(
    "maintenancePage"
    ).style.display =
    "none";

    loadSettings();

}
function showMaintenance(element){

    removeActive();

    element.classList.add(
    "active"
    );

    document.getElementById(
    "dashboardPage"
    ).style.display =
    "none";

    document.getElementById(
    "employeePage"
    ).style.display =
    "none";

    document.getElementById(
    "assetsPage"
    ).style.display =
    "none";

    document.getElementById(
    "allocationPage"
    ).style.display =
    "none";

    document.getElementById(
    "reportsPage"
    ).style.display =
    "none";

    document.getElementById(
    "settingsPage"
    ).style.display =
    "none";

    document.getElementById(
    "maintenancePage"
    ).style.display =
    "block";

    loadMaintenanceRequests();

}
function viewMaintenanceDetails(){

    removeActive();

    document.querySelectorAll(
    ".menu-item"
    ).forEach(item=>{

        item.classList.remove(
        "active"
        );

    });

    document.querySelector(
    'li[onclick="showMaintenance(this)"]'
    ).classList.add(
    "active"
    );

    showMaintenance(
        document.querySelector(
        'li[onclick="showMaintenance(this)"]'
        )
    );

}
function removeActive(){

    document
    .querySelectorAll(".menu-item")
    .forEach(item => {

        item.classList.remove(
        "active"
        );

    });

}
function openEmployeeFromDashboard(){

    document.querySelectorAll(
    ".menu-item"
    ).forEach(item=>{

        item.classList.remove(
        "active"
        );

    });

    document.querySelectorAll(
    ".menu-item"
    )[1].classList.add(
    "active"
    );

    document.getElementById(
    "dashboardPage"
    ).style.display = "none";

    document.getElementById(
    "employeePage"
    ).style.display = "block";

    document.getElementById(
    "assetsPage"
    ).style.display = "none";
    
     document.getElementById(
    "allocationPage"
    ).style.display =
    "none";

    document.getElementById(
    "reportsPage"
    ).style.display =
    "none";

    document.getElementById(
    "settingsPage"
    ).style.display =
    "none";

    document.getElementById(
    "maintenancePage"
    ).style.display =
    "none";

}
function openAssetFromDashboard(elemt){

    document.querySelectorAll(
    ".menu-item"
    ).forEach(item=>{

        item.classList.remove(
        "active"
        );

    });

    document.querySelectorAll(
    ".menu-item"
    )[2].classList.add(
    "active"
    );

    document.getElementById(
    "dashboardPage"
    ).style.display = "none";

    document.getElementById(
    "employeePage"
    ).style.display = "none";

    document.getElementById("assetsPage").style.display="block";

     document.getElementById(
    "allocationPage"
    ).style.display =
    "none";

    document.getElementById(
    "reportsPage"
    ).style.display =
    "none";

    document.getElementById(
    "settingsPage"
    ).style.display =
    "none";
    
       document.getElementById(
    "maintenancePage"
    ).style.display =
    "none";
}
function openEmployeeModal(){

    document.getElementById(
    "employeeModal"
    ).style.display = "flex";

}

function closeEmployeeModal(){
   clearEmployeeForm();
    document.getElementById(
    "employeeModal"
    ).style.display = "none";

}
let editMode = false;


async function addEmployee(){
    
    const employeeId =
    document.getElementById(
    "empId"
    ).value;

    const name =
    document.getElementById(
    "empName"
    ).value;

    const email =
    document.getElementById(
    "empEmail"
    ).value;

    const password =
    document.getElementById(
    "empPassword"
    ).value;

    const role =
    document.getElementById(
    "empRole"
    ).value;

    const joinDate =
    document.getElementById(
    "joinDate"
    ).value;

    const status =
    document.getElementById(
    "empStatus"
    ).value;

    if(editMode){

    const response =
    await fetch(

        `/api/employees/${selectedEmployeeId}`,

        {

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                employeeId,
                name,
                email,
                role,
                joinDate,
                status

            })

        }

    );

    const data =
    await response.json();

    if(data.success){

        alert("Employee Updated");
        clearEmployeeForm();
        editMode = false;

        closeEmployeeModal();
         
        loadEmployees();
        
    }

    return;
    
    }
    const response =
await fetch(
"/api/employees",
{

    method:"POST",

    headers:{
        "Content-Type":"application/json"
    },

    body:JSON.stringify({

        employeeId,
        name,
        email,
        password,
        role,
        joinDate,
        status

    })

});

const data =
await response.json();

if(data.success){

    alert("Employee Added");

    closeEmployeeModal();

    loadEmployees();

}
}
function clearEmployeeForm(){

    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("empEmail").value = "";
    document.getElementById("empPassword").value = "";
    document.getElementById("empRole").value = "";
    document.getElementById("joinDate").value = "";
   document.getElementById("empStatus").value = "";
    

}
async function loadEmployees(){

    const response =
    await fetch(
    "/api/employees"
    );

    const data =
    await response.json();
   
    const table =
    document.getElementById(
    "employeeTable"
    );

    table.innerHTML = "";

    data.employees.forEach(emp=>{
        
        table.innerHTML += `

        <tr>

            <td>${emp.employeeId}</td>

            <td>${emp.name}</td>

            <td>${emp.email}</td>

            <td>${emp.role}</td>

            <td>${new Date(
                emp.joinDate
            ).toLocaleDateString()}</td>

            <td>
   <span class="${
      emp.status === "Active"
      ? "status-active"
      : "status-inactive"
   }">
      ${emp.status}
   </span>
</td>
  <td>

<button
class="action-btn"
onclick="openActionModal('${emp._id}')">

Action

</button>

</td>
        </tr>

        `;

    });
 document.getElementById(
    "totalEmployees"
).innerText =
data.employees.length;
}
let selectedEmployeeId = null;

function openActionModal(id){

    selectedEmployeeId = id;

    document.getElementById(
    "actionModal"
    ).style.display = "flex";

}
async function confirmDeleteEmployee(){
    console.log(selectedEmployeeId);
    const confirmDelete =
    confirm(
    "Are you sure you want to delete this employee?"
    );
    
    if(!confirmDelete) return;

    const response =
    await fetch(

        `/api/employees/${selectedEmployeeId}`,

        {
            method:"DELETE"
        }

    );

    const data =
    await response.json();

    if(data.success){

        alert("Employee Deleted");

        closeActionModal();

        loadEmployees();

    }

}

async function editEmployee(){
    editMode = true;
    
    const response =
    await fetch(
        `/api/employees/${selectedEmployeeId}`
    );

    const data =
    await response.json();
      console.log(data);
    const emp =
    data.employee;

    document.getElementById("empId")
    .value = emp.employeeId;

    document.getElementById("empName")
    .value = emp.name;

    document.getElementById("empEmail")
    .value = emp.email;

    document.getElementById("empRole")
    .value = emp.role;

    document.getElementById("joinDate")
    .value =
    emp.joinDate.split("T")[0];

    document.getElementById("empStatus")
    .value = emp.status;

    closeActionModal();

    openEmployeeModal();

}
function closeActionModal(){

    document.getElementById(
    "actionModal"
    ).style.display = "none";

}
function openAssetModal(){

    document.getElementById(
    "assetModal"
    ).style.display = "flex";

}
function closeAssetModal(){
     clearAssetForm();
    document.getElementById(
    "assetModal"
    ).style.display = "none";

}


let assetEditMode = false;
async function addAsset(){

    const assetId =
    document.getElementById(
    "assetId"
    ).value;

    const category =
    document.getElementById(
    "assetCategory"
    ).value;

    const brand =
    document.getElementById(
    "assetBrand"
    ).value;

    const model =
    document.getElementById(
    "assetModel"
    ).value;

    const serialNumber =
    document.getElementById(
    "serialNumber"
    ).value;

    const purchaseDate =
    document.getElementById(
    "purchaseDate"
    ).value;

    const warrantyExpiry =
    document.getElementById(
    "warrantyExpiry"
    ).value;
    if(assetEditMode){

    const response =
    await fetch(

        `/api/assets/${selectedAssetId}`,

        {

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                assetId,
                category,
                brand,
                model,
                serialNumber,
                purchaseDate,
                warrantyExpiry

            })

        }

    );

    const data =
    await response.json();

    if(data.success){

        alert("Asset Updated");

        assetEditMode = false;

        closeAssetModal();

        loadAssets();

    }

    return;
}
    const response =
    await fetch(

        "/api/assets",

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                assetId,
                category,
                brand,
                model,
                serialNumber,
                purchaseDate,
                warrantyExpiry

            })

        }

    );

    const data =
    await response.json();
 
    if(data.success){

        alert("Asset Added");

        closeAssetModal();

        loadAssets();

    }
    else{

    alert("Asset ID already exists");

}

}
let selectedAssetId = null;
function openAssetActionModal(id){

    selectedAssetId = id;

    document.getElementById(
    "assetActionModal"
    ).style.display = "flex";

}
function closeAssetActionModal(){

    document.getElementById(
    "assetActionModal"
    ).style.display = "none";

}
async function loadAssets(){

    const response =
    await fetch(
    "/api/assets"
    );

    const data =
    await response.json();
    
    // Count Cards

    document.getElementById("laptopCount")
    .innerText =
    data.assets.filter(
    a => a.category === "Laptop"
    ).length;

    document.getElementById("monitorCount")
    .innerText =
    data.assets.filter(
    a => a.category === "Monitor"
    ).length;
    document.getElementById(
"printerCount"
).innerText =
data.assets.filter(
a => a.category === "Printer"
).length;

document.getElementById(
"networkCount"
).innerText =
data.assets.filter(
a => a.category === "Network"
).length;
    // Table
   const filteredAssets =

selectedCategory === "All"

? data.assets

: selectedCategory === "Others"

? data.assets.filter(asset =>

    asset.category !== "Laptop" &&
    asset.category !== "Monitor" &&
    asset.category !== "Printer" &&
    asset.category !== "Network"

)

: data.assets.filter(asset =>

    asset.category === selectedCategory

);
    const table =
    document.getElementById(
    "assetTable"
    );
    
    table.innerHTML = "";

    filteredAssets.forEach(asset => {

        table.innerHTML += `

        <tr>

            <td>${asset.assetId}</td>
            <td>${asset.category}</td>
            <td>${asset.brand}</td>
    
            <td>${asset.model}</td>

            <td>

                <span class="status-notallocated">

                    ${asset.status}

                </span>

            </td>

            <td>

<button
class="action-btn"
onclick="openAssetActionModal('${asset._id}')">

Action

</button>

</td>

        </tr>

        `;

    });
document.getElementById(
"totalAssets"
).innerText =
data.assets.length;

const laptopCount =
data.assets.filter(
a => a.category === "Laptop"
).length;

const monitorCount =
data.assets.filter(
a => a.category === "Monitor"
).length;

const printerCount =
data.assets.filter(
a => a.category === "Printer"
).length;

const networkCount =
data.assets.filter(
a => a.category === "Network"
).length;

const othersCount =
data.assets.filter(
a =>
a.category !== "Laptop" &&
a.category !== "Monitor" &&
a.category !== "Printer" &&
a.category !== "Network"
).length;

if(assetChart){
    assetChart.destroy();
}

assetChart = new Chart(
document.getElementById("assetChart"),
{
    type:"doughnut",
    plugins:[ChartDataLabels],
    data:{
        labels:[
            "Laptop",
            "Monitor",
            "Printer",
            "Network",
            "Others"
        ],

        datasets:[{
            data:[
                laptopCount,
                monitorCount,
                printerCount,
                networkCount,
                othersCount
            ],

            backgroundColor:[
                "#2563eb",
                "#22c55e",
                "#f59e0b",
                "#ef4444",
                "#6b7280"
            ]
        }]
    },

    options:{
        
    responsive:true,

    plugins:{

        datalabels:{

            color:"#fff",

            font:{
                weight:"bold",
                size:14
            },

            formatter:(value, context)=>{

                const data =
                context.chart.data.datasets[0].data;

                const total =
                data.reduce(
                    (a,b)=>a+b,
                    0
                );

                const percentage =
                ((value / total) * 100)
                .toFixed(1);

                return percentage + "%";
            }
        }
    },

   onClick:(evt,elements)=>{

      if(elements.length > 0){

         const index =
         elements[0].index;

         const category =
         assetChart.data.labels[index];

         console.log(category);

         openAssetCategory(category);
      }

   }

}

});
}
function openAssetCategory(category){

    alert("Clicked: " + category);

    selectedCategory = category;

    document.getElementById(
    "assetTableTitle"
    ).innerText =
    category + " Assets";

    //loadAssets();

}
async function confirmDeleteAsset(){

    const confirmDelete =
    confirm(
    "Delete this asset?"
    );

    if(!confirmDelete) return;

    const response =
    await fetch(

        `/api/assets/${selectedAssetId}`,

        {
            method:"DELETE"
        }

    );

    const data =
    await response.json();

    if(data.success){

        alert("Asset Deleted");

        closeAssetActionModal();

        loadAssets();

    }

}
async function editAsset(){

    assetEditMode = true;

    const response =
    await fetch(

        `/api/assets/${selectedAssetId}`

    );

    const data =
    await response.json();

    const asset =
    data.asset;

    document.getElementById(
    "assetId"
    ).value =
    asset.assetId;

    document.getElementById(
    "assetCategory"
    ).value =
    asset.category;

    document.getElementById(
    "assetBrand"
    ).value =
    asset.brand;

    document.getElementById(
    "assetModel"
    ).value =
    asset.model;

    document.getElementById(
    "serialNumber"
    ).value =
    asset.serialNumber;

    document.getElementById(
    "purchaseDate"
    ).value =
    asset.purchaseDate?.split("T")[0];

    document.getElementById(
    "warrantyExpiry"
    ).value =
    asset.warrantyExpiry?.split("T")[0];

    closeAssetActionModal();

    openAssetModal();

}
function clearAssetForm(){

    document.getElementById("assetId").value = "";
    document.getElementById("assetBrand").value = "";
    document.getElementById("assetModel").value = "";
    document.getElementById("serialNumber").value = "";
    document.getElementById("purchaseDate").value = "";
    document.getElementById("warrantyExpiry").value = "";

    document.getElementById(
    "assetCategory"
    ).selectedIndex = 0;

}
let selectedCategory = "All";
function openAssetCategory(category){

    selectedCategory = category;

    document.getElementById(
    "assetTableTitle"
    ).innerText =
    category + " Assets";

    loadAssets();

}
//search
document.getElementById(
"searchEmployee"
).addEventListener("keyup", function(){

    const value =
    this.value.toLowerCase();

    const table =
    document.getElementById(
    "employeeTable"
    );

    const rows =
    Array.from(
        table.querySelectorAll("tr")
    );

    rows.forEach(row=>{
        if(value === ""){

    row.classList.remove(
    "highlight-row"
    );
    loadEmployees()
    
    return;
}
        row.style.border = "";

        row.style.order = "";

        if(

    row.innerText
    .toLowerCase()
    .includes(value)

){

    row.classList.add(
    "highlight-row"
    );

    table.prepend(row);

}
else{

    row.classList.remove(
    "highlight-row"
    );

}

    });

});
document.getElementById(
"searchAsset"
).addEventListener("keyup", function(){

    const value =
    this.value.toLowerCase().trim();

    const table =
    document.getElementById(
    "assetTable"
    );

    const rows =
    Array.from(
    table.querySelectorAll("tr")
    );

    rows.forEach(row => {

        row.classList.remove(
        "highlight-row"
        );

        if(value === ""){
            loadAssets();
            return;
        }

        if(

            row.innerText
            .toLowerCase()
            .includes(value)

        ){

            row.classList.add(
            "highlight-row"
            );

            table.prepend(row);

        }

    });

});
let currentEmployeeId = "";
let allocationEditMode = false;
function showAllocation(element){

    removeActive();

    element.classList.add("active");

    document.getElementById(
    "dashboardPage"
    ).style.display = "none";

    document.getElementById(
    "employeePage"
    ).style.display = "none";

    document.getElementById(
    "assetsPage"
    ).style.display = "none";

    document.getElementById(
    "allocationPage"
    ).style.display = "block";

    document.getElementById(
    "reportsPage"
    ).style.display =
    "none";

    document.getElementById(
    "settingsPage"
    ).style.display =
    "none";

       document.getElementById(
    "maintenancePage"
    ).style.display =
    "none";

    loadAllocations();

}
function openAllocationForm(){

    document.getElementById(
    "allocationFormModal"
    ).style.display = "flex";

    document.getElementById(
    "allocatedDate"
    ).value =
    new Date()
    .toISOString()
    .split("T")[0];

    const firstCategory =
document.querySelector(
".asset-category"
);

loadAvailableAssets(
firstCategory
);

}
function closeAllocationForm(){

    document.getElementById(
    "allocationFormModal"
    ).style.display = "none";

     document.getElementById(
    "allocationUserId"
    ).value = "";

     document.getElementById(
    "assetContainer"
    ).innerHTML = `

    <div class="asset-row">

        <div class="form-group">

            <label>Category</label>

            <select class="asset-category"
            onchange="loadAvailableAssets(this)">

                <option>Laptop</option>
                <option>Monitor</option>
                <option>Printer</option>
                <option>Network</option>
                <option>Others</option>

            </select>

        </div>

        <div class="form-group">

            <label>Asset ID</label>

            <select class="asset-id">

                <option>
                Select Asset
                </option>

            </select>

        </div>

        <button
        type="button"
        class="remove-asset-btn"
        onclick="removeAssetRow(this)">

            <i class="fa-solid fa-xmark"></i>

        </button>

    </div>

    `;


}
function addMoreAssetRow(){

    const container =
    document.getElementById(
    "assetContainer"
    );

    const div =
    document.createElement("div");

    div.className = "asset-row";

    div.innerHTML = `

        <div class="form-group">

            <label>Category</label>

            <select class="asset-category" 
onchange="loadAvailableAssets(this)">

                <option value="Laptop">Laptop</option>
                <option value="Monitor">Monitor</option>
                <option value="Printer">Printer</option>
                <option value="Network">Network</option>
                <option value="Others">Others</option>

            </select>

        </div>

        <div class="form-group">

            <label>Asset ID</label>

             <select class="asset-id">

                         <option>
                          Select Asset
                         </option>

                        </select>
        </div>

        <button
        type="button"
        class="remove-asset-btn"
        onclick="removeAssetRow(this)">

        ✕

        </button>

    `;

    container.appendChild(div);

}
function removeAssetRow(button){

    button
    .closest(".asset-row")
    .remove();

}

async function loadAvailableAssets(select){

    const category =
    select.value;
    console.log("Category:", category);
    const response =
    await fetch(
    `/api/assets/available/${category}`
    );

    const data =
    await response.json();

    const assetSelect =
    select
    .closest(".asset-row")
    .querySelector(".asset-id");

    assetSelect.innerHTML =
    "<option>Select Asset</option>";

    data.assets.forEach(asset=>{

        assetSelect.innerHTML += `
        <option value="${asset.assetId}">
            ${asset.assetId}
        </option>
        `;

    });

}
async function saveAllocation(){

    const employeeId =
    document.getElementById(
    "allocationUserId"
    ).value.trim();

    const allocatedDate =
    document.getElementById(
    "allocatedDate"
    ).value;

    const assets = [];
    if(allocationEditMode){

    return updateAllocation();

}

    document
    .querySelectorAll(".asset-row")
    .forEach(row=>{

        const category =
        row.querySelector(
        ".asset-category"
        ).value;

        const assetId =
        row.querySelector(
        ".asset-id"
        ).value;

        if(assetId){

            assets.push({

                category,
                assetId

            });

        }

    });

    if(!employeeId){

        alert("Enter Employee ID");
        return;

    }

    if(assets.length === 0){

        alert("Select At Least One Asset");
        return;

    }

    try{

        const response =
        await fetch(
        "/api/allocations",
        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                employeeId,
                allocatedDate,
                assets

            })

        });

        const data =
        await response.json();

       if(data.success){

    alert(
    "Asset Allocated Successfully"
    );

    closeAllocationForm();
    loadAllocationChart();

    document.getElementById(
    "allocationPage"
    ).style.display = "block";
    loadAllocations();

}
        else{

            alert(data.message);

        }

    }
    catch(err){

        console.error(err);

        alert(
        "Server Error"
        );

    }
   
}
let allAllocations = [];
async function loadAllocations(){
    
    const response =
    await fetch(
    "/api/allocations"
    );
    const data =
    await response.json();
    console.log(data.allocations);
   
    const table =
    document.getElementById(
    "allocationTable"
    );
     allAllocations = data.allocations;
    allAllocations =
data.allocations;

renderAllocations(
allAllocations
);
    table.innerHTML = "";

    data.allocations.forEach(item=>{

        table.innerHTML += `

        <tr>

            <td>${item.employeeId}</td>

            <td>${item.name}</td>

            <td>${item.role}</td>

            <td>${item.totalAssets}</td>

            <td>${item.working}</td>

            <td>${item.maintenance}</td>

            <td>

                <button
                class="action-btn"
                onclick="viewAllocation('${item.employeeId}')">

                View

                </button>

            </td>

        </tr>

        `;

    });

}
function renderAllocations(data){

    const table =
    document.getElementById(
    "allocationTable"
    );

    table.innerHTML = "";

    data.forEach(item=>{

        table.innerHTML += `

        <tr class="search-box">

            <td>${item.employeeId}</td>
            <td>${item.name}</td>
            <td>${item.role}</td>
            <td>${item.totalAssets}</td>
            <td>${item.working}</td>
            <td>${item.maintenance}</td>

            <td>

                <button
class="action-btn"
onclick="viewAllocation('${item.employeeId}')">

View

</button>

            </td>

        </tr>

        `;

    });

}
function searchAllocations(){

    const search =
    document
    .getElementById(
    "searchAllocation"
    )
    .value
    .toLowerCase();

    const filtered =
    allAllocations.filter(item =>

        item.employeeId
        .toLowerCase()
        .includes(search)

        ||

        item.name
        .toLowerCase()
        .includes(search)

        ||

        item.role
        .toLowerCase()
        .includes(search)

    );

    renderAllocations(
    filtered
    );

}

async function viewAllocation(employeeId){

    const response =
    await fetch(

    `/api/allocations/${employeeId}`

    );

    const data =
    await response.json();

    currentEmployeeId =
data.employee.employeeId;

    document.getElementById(
    "allocationDetailsModal"
    ).style.display = "flex";

    document.getElementById(
    "allocationDetailsContent"
    ).innerHTML = `

    <div class="employee-profile-card">

    <div class="profile-avatar">

        <i class="fa-solid fa-user"></i>

    </div>

    <div class="profile-info">

        <h3>${data.employee.name}</h3>

        <p>
        Employee ID :
        ${data.employee.employeeId}
        </p>

        <p>
        Role :
        ${data.employee.role}
        </p>

        <p>
        Join Date :
        ${new Date(
        data.employee.joinDate
        ).toLocaleDateString()}
        </p>

    </div>

</div>

    <table
    class="asset-details-table">

        <thead>

            <tr>

                <th>Category</th>
                <th>Asset ID</th>
                <th>Status</th>

            </tr>

        </thead>

        <tbody>

        ${
        data.allocation.assets
        .map(asset => `

        <tr>

            <td>${asset.category}</td>

            <td>${asset.assetId}</td>

           <td>

<span class="
${asset.status === 'Working'
? 'working-badge'
: 'maintenance-badge'}">

${asset.status}

</span>

</td>

        </tr>

        `).join("")
        }

        </tbody>

    </table>

    <div class="allocation-summary">

    <h3>
    Total Assets :
    ${data.allocation.assets.length}
    </h3>

</div>

    `;

}
function closeAllocationDetails(){

    document.getElementById(
    "allocationDetailsModal"
    ).style.display = "none";

}
async function editAllocation(){

    const response =
    await fetch(
    `/api/allocations/${currentEmployeeId}`
    );

    const data =
    await response.json();

    allocationEditMode = true;

    closeAllocationDetails();

    document.getElementById(
    "allocationFormModal"
    ).style.display = "flex";

    document.getElementById(
    "allocationUserId"
    ).value =
    data.employee.employeeId;

    document.getElementById(
"allocatedDate"
).value =
data.allocation.allocatedDate
?.split("T")[0];

    const container =
    document.getElementById(
    "assetContainer"
    );

    container.innerHTML = "";

    data.allocation.assets.forEach(asset=>{

        container.innerHTML += `

        <div class="asset-row">

            <div class="form-group">

                <label>Category</label>

                <select class="asset-category">

                    <option value="Laptop" ${asset.category==="Laptop"?"selected":""}>Laptop</option>

                    <option value="Monitor" ${asset.category==="Monitor"?"selected":""}>Monitor</option>

                    <option value="Printer" ${asset.category==="Printer"?"selected":""}>Printer</option>

                    <option value="Network" ${asset.category==="Network"?"selected":""}>Network</option>

                    <option value="Others" ${asset.category==="Others"?"selected":""}>Others</option>

                </select>

            </div>

            <div class="form-group">

                <label>Asset ID</label>

                <input
                class="asset-id"
                value="${asset.assetId}">

            </div>
            <button
    type="button"
    class="remove-asset-btn"
    onclick="removeAssetRow(this)">

        <i class="fa-solid fa-xmark"></i>

    </button>

        </div>

        `;

    });

}
async function updateAllocation(){

    const assets = [];

    document
    .querySelectorAll(
    ".asset-row"
    )
    .forEach(row=>{

        assets.push({

            category:
            row.querySelector(
            ".asset-category"
            ).value,

            assetId:
            row.querySelector(
            ".asset-id"
            ).value,

            status:"Working"

        });

    });

    const response =
    await fetch(

    `/api/allocations/${currentEmployeeId}`,

    {

        method:"PUT",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            assets

        })

    });

    const data =
    await response.json();

    if(data.success){

    alert(
    "Allocation Updated"
    );

    allocationEditMode = false;

    closeAllocationForm();

    loadAllocations();
    loadAllocationChart();

}

}
async function deleteAllocation(){

    if(!confirm(
        "Delete this allocation?"
    )){
        return;
    }

    const response =
    await fetch(

    `/api/allocations/${currentEmployeeId}`,

    {
        method:"DELETE"
    }

    );

    const data =
    await response.json();

    alert(data.message);

    closeAllocationDetails();

    loadAllocations();
    loadAllocationChart();

}
async function loadAllocatedAssetsCount(){

    const response =
    await fetch(
    "/api/allocations/stats/count"
    );

    const data =
    await response.json();

    document.getElementById(
    "allocatedAssets"
    ).innerText =
    data.allocatedAssets;

}
async function loadRecentAllocations(){

    const response =
    await fetch(
    "/api/allocations/recent/latest"
    );

    const data =
    await response.json();
    console.log(data);
    const table =
    document.getElementById(
    "recentAllocationTable"
    );

    table.innerHTML = "";

    data.allocations.forEach(item=>{

        table.innerHTML += `

       <tr class="recent-row">

    <td>${item.employeeId}</td>

    <td>${item.name}</td>

    <td>${item.role}</td>

    <td>${item.totalAssets}</td>

</tr>

        `;

    });

}
let reportChart;

async function generateReport(){

    const fromDate =
    document.getElementById(
    "fromDate"
    ).value;

    const toDate =
    document.getElementById(
    "toDate"
    ).value;

    const response =
    await fetch(

`/api/allocations/reports/range?fromDate=${fromDate}&toDate=${toDate}`

    );

    const data =
    await response.json();

    const table =
    document.getElementById(
    "reportTable"
    );

    table.innerHTML = "";

    let totalAssets = 0;

    data.allocations.forEach(item=>{

        totalAssets +=
        item.totalAssets;

        table.innerHTML += `

        <tr>

            <td>${item.employeeId}</td>

            <td>${item.name}</td>

            <td>${item.role}</td>

            <td>${item.totalAssets}</td>

            <td>

${new Date(
item.allocatedDate
).toLocaleDateString()}

            </td>

        </tr>

        `;

    });

    document.getElementById(
    "reportTotalAllocations"
    ).innerText =
    data.allocations.length;

    document.getElementById(
    "reportTotalAssets"
    ).innerText =
    totalAssets;

    generateReportChart(
    data.allocations
    );

}
function generateReportChart(data){

    const monthly =
    Array(12).fill(0);

    data.forEach(item=>{

        const month =
        new Date(
        item.allocatedDate
        ).getMonth();

        monthly[month] +=
        item.totalAssets;

    });

    if(reportChart){

        reportChart.destroy();

    }

    const ctx =
    document.getElementById(
    "reportChart"
    );

    reportChart =
    new Chart(ctx,{

        type:"line",

        data:{

            labels:[

                "Jan","Feb","Mar",
                "Apr","May","Jun",
                "Jul","Aug","Sep",
                "Oct","Nov","Dec"

            ],

            datasets:[{

                label:
                "Allocated Assets",

                data:
                monthly,

                borderColor:
                "#2563eb",

                backgroundColor:
                "rgba(37,99,235,0.15)",

                fill:true,

                tension:0.4,

                pointRadius:5,

                pointHoverRadius:8

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{
                    display:true
                }

            },

            scales:{

                y:{
                    beginAtZero:true
                }

            }

        }

    });

}
async function downloadReportPDF(){

    const {
        jsPDF
    } = window.jspdf;

    const pdf =
    new jsPDF(
        "p",
        "mm",
        "a4"
    );

    // PAGE 1
    // Graph

    const chart =
    document.getElementById(
    "reportChart"
    );

    const canvas =
    await html2canvas(chart);

    const imgData =
    canvas.toDataURL(
    "image/png"
    );

    pdf.setFontSize(18);

    pdf.text(
    "Allocation Report",
    15,
    15
    );

    pdf.addImage(

        imgData,

        "PNG",

        10,

        25,

        190,

        100

    );

    // PAGE 2

    pdf.addPage();

    const rows = [];

    document
    .querySelectorAll(
    "#reportTable tr"
    )
    .forEach(row=>{

        const cols =
        row.querySelectorAll("td");

        if(cols.length){

            rows.push([

                cols[0].innerText,
                cols[1].innerText,
                cols[2].innerText,
                cols[3].innerText,
                cols[4].innerText

            ]);

        }

    });

    pdf.autoTable({

        head:[[
            "User ID",
            "Name",
            "Role",
            "Assets",
            "Date"
        ]],

        body:rows,

        startY:20,

        theme:"grid"

    });

    pdf.save(
    "Allocation-Report.pdf"
    );

}
function loadSettings(){

    const user =
    JSON.parse(
    localStorage.getItem("user")
    );

    document.getElementById(
    "adminProfileName"
    ).innerText =
    user.name;

    document.getElementById(
    "adminProfileRole"
    ).innerText =
    user.role;

    document.getElementById(
    "adminProfileEmail"
    ).innerText =
    user.email;

}
function openProfileModal(){

    const user =
    JSON.parse(
    localStorage.getItem("user")
    );

    document.getElementById(
    "editName"
    ).value =
    user.name;

    document.getElementById(
    "editEmail"
    ).value =
    user.email;

    document.getElementById(
    "profileModal"
    ).style.display =
    "flex";

}
function closeProfileModal(){

    document.getElementById(
    "profileModal"
    ).style.display =
    "none";

}
async function updateProfile(){

    const user =
    JSON.parse(
    localStorage.getItem("user")
    );

    const response =
    await fetch(

    "/api/auth/update-profile",

    {

        method:"PUT",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            userId:user._id,

            name:
            document.getElementById(
            "editName"
            ).value,

            email:
            document.getElementById(
            "editEmail"
            ).value,

            oldPassword:
            document.getElementById(
            "oldPassword"
            ).value,

            newPassword:
            document.getElementById(
            "newPassword"
            ).value,

            secretKey:
            document.getElementById(
            "secretKey"
            ).value

        })

    });

    const data =
    await response.json();

    alert(data.message);

    if(data.success){

        user.name =
        document.getElementById(
        "editName"
        ).value;

        user.email =
        document.getElementById(
        "editEmail"
        ).value;

        localStorage.setItem(

            "user",

            JSON.stringify(user)

        );

        loadSettings();

        closeProfileModal();

    }

}
function openSettingsFromProfile(){

    removeActive();

    document.getElementById(
    "dashboardPage"
    ).style.display =
    "none";

    document.getElementById(
    "employeePage"
    ).style.display =
    "none";

    document.getElementById(
    "assetsPage"
    ).style.display =
    "none";

    document.getElementById(
    "allocationPage"
    ).style.display =
    "none";

    document.getElementById(
    "reportsPage"
    ).style.display =
    "none";

    document.getElementById(
    "settingsPage"
    ).style.display =
    "block";

    // Settings menu active
    document.querySelectorAll(
    ".menu-item"
    ).forEach(item=>{

        item.classList.remove(
        "active"
        );

    });

    const settingsMenu =
    document.querySelector(
    'li[onclick="showSettings(this)"]'
    );

    if(settingsMenu){

        settingsMenu.classList.add(
        "active"
        );

    }

    loadSettings();

}
async function loadMaintenanceRequests(){

    const response =
    await fetch(
    "/api/maintenance"
    );

    const data =
    await response.json();

    console.log(data);

    const table =
    document.getElementById(
    "maintenanceTable"
    );

    table.innerHTML = "";

    data.requests.forEach(req=>{

        table.innerHTML += `

        <tr>
            <td> ${req.employeeId}</td>

            <td>${req.employeeName}</td>

            <td>${req.assetId}</td>

            <td>${req.reason}</td>

            <td>${req.priority}</td>

            <td>
            <span class="priority-${req.priority.toLowerCase()}">

            ${req.priority}
            
            </span>
            </td>
            <td>

<span class="
status-${req.status
.toLowerCase()
.replace(' ','')}
">

${req.status}

</span>

</td>

            <td>

                <button
                class="action-btn"
                onclick="openMaintenanceRequest('${req._id}')">

                    Update

                </button>

            </td>

        </tr>

        `;

    });

}
let selectedRequestId = null;

function openMaintenanceRequest(id){

    selectedRequestId = id;

    document.getElementById(
    "requestId"
    ).value = id;

    document.getElementById(
    "maintenanceActionModal"
    ).style.display = "flex";

}

function closeMaintenanceModal2(){

    document.getElementById(
    "maintenanceActionModal"
    ).style.display = "none";

}
async function updateRequest(){

    const requestId =
    document.getElementById(
    "requestId"
    ).value;

    const status =
    document.getElementById(
    "requestStatus"
    ).value;

    const adminReply =
    document.getElementById(
    "adminReply"
    ).value;

    const response =
await fetch(

`/api/maintenance/${requestId}`,

    {

        method:"PUT",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            status,
            adminReply

        })

    });

    const data =
    await response.json();

    if(data.success){

        alert(
        "Request Updated"
        );

        closeMaintenanceModal2();

        loadMaintenanceRequests();

    }

}
function searchMaintenance(){

    const value =
    document.getElementById(
    "maintenanceSearch"
    ).value
    .toLowerCase();

    const rows =
    document.querySelectorAll(
    "#maintenanceTable tr"
    );

    rows.forEach(row=>{

        row.classList.remove(
        "highlight-row"
        );

        if(value === ""){

            row.style.display = "";

            return;

        }

        if(
            row.innerText
            .toLowerCase()
            .includes(value)
        ){

            row.style.display = "";

            row.classList.add(
            "highlight-row"
            );

        }
        else{

            row.style.display =
            "none";

        }

    });

}
async function loadNotificationCount(){

    const response =
    await fetch(
    "/api/maintenance/pending"
    );

    const data =
    await response.json();

    const badge =
    document.getElementById(
    "requestBadge"
    );

    badge.innerText =
    data.requests.length;

    badge.style.display =
    data.requests.length > 0
    ? "flex"
    : "none";

}
function openNotificationModal(){

    document.getElementById(
    "notificationModal"
    ).style.display =
    "flex";

    loadPendingRequests();

}

function closeNotificationModal(){

    document.getElementById(
    "notificationModal"
    ).style.display =
    "none";

}
async function loadPendingRequests(){

    const response =
    await fetch(
    "/api/maintenance/pending"
    );

    const data =
    await response.json();

    const table =
    document.getElementById(
    "notificationTable"
    );

    table.innerHTML = "";

    data.requests.forEach(req=>{

        table.innerHTML += `

        <tr>

            <td>
                ${req.employeeId}
            </td>

            <td>
                ${req.employeeName}
            </td>

            <td>
                ${req.assetId}
            </td>

            <td>
                ${req.priority}
            </td>

            <td>

                <button
                class="accept-btn"
                onclick="acceptRequest('${req._id}')">

                    Accept

                </button>

            </td>

        </tr>

        `;

    });

}
async function acceptRequest(id){

    const response =
    await fetch(

`/api/maintenance/accept/${id}`,

    {

        method:"PUT"

    });

    const data =
    await response.json();

    if(data.success){

        loadPendingRequests();

        loadNotificationCount();

        loadMaintenanceRequests();

        loadLatestMaintenance();

    }

}
async function loadDashboardStats(){

    const response =
    await fetch(
    "/api/maintenance/dashboard-stats"
    );

    const data =
    await response.json();

    document.getElementById(
    "maintenanceCount"
    ).innerText =
    data.activeRequests;

}
async function loadRecentRequests(){

    const response =
    await fetch(
    "/api/maintenance/recent-requests"
    );

    const data =
    await response.json();

    const table =
    document.getElementById(
    "recentRequestTable"
    );

    if(!table) return;

    table.innerHTML = "";

    data.requests.forEach(req=>{

        table.innerHTML += `

        <tr>

            <td>${req.employeeId}</td>

            <td>${req.employeeName}</td>

            <td>${req.assetId}</td>

            <td>

                <span class="
                priority-${req.priority.toLowerCase()}
                ">

                    ${req.priority}

                </span>

            </td>

        </tr>

        `;

    });

}