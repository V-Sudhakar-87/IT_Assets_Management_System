const user =
JSON.parse(
localStorage.getItem("user")
);
window.history.forward();

function noBack(){

    window.history.forward();

}

setTimeout(
"noBack()",
0
);

window.onunload =
function(){};
// Login Check

if(!user){

    window.location.replace(
    "index.html"
    );

}
history.pushState(
null,
null,
location.href
);

window.addEventListener(
"popstate",
()=>{

    history.pushState(
    null,
    null,
    location.href
    );

}
);
window.onload = ()=>{

    loadAssignedAssets();
    loadMyAssets();
    loadProfile();
     loadRequests();
     loadRequestPage();
};
function toggleSidebar(){

    const sidebar =
    document.querySelector(
    ".sidebar"
    );

    const overlay =
    document.getElementById(
    "sidebarOverlay"
    );

    sidebar.classList.toggle(
    "active"
    );

    if(
        sidebar.classList.contains(
        "active"
        )
    ){

        overlay.style.display =
        "block";

    }else{

        overlay.style.display =
        "none";

    }

}
function closeSidebar(){

    document
    .querySelector(
    ".sidebar"
    )
    .classList.remove(
    "active"
    );

    document
    .getElementById(
    "sidebarOverlay"
    )
    .style.display =
    "none";

}

// Header Name

document.getElementById(
"employeeName"
).innerText =
user.name;

// Profile Page

document.getElementById(
"profileName"
).innerText =
user.name;

document.getElementById(
"profileRole"
).innerText =
user.role;

document.getElementById(
"profileEmail"
).innerText =
user.email;

// Navigation

function removeActive(){

    document
    .querySelectorAll(
    ".sidebar-menu li"
    )
    .forEach(item=>{

        item.classList.remove(
        "active"
        );

    });

}

function hidePages(){

    document.getElementById(
    "dashboardPage"
    ).style.display="none";

    document.getElementById(
    "assetsPage"
    ).style.display="none";

    document.getElementById(
    "requestsPage"
    ).style.display="none";

    document.getElementById(
    "profilePage"
    ).style.display="none";

}

function showDashboard(element){

    removeActive();
    hidePages();

    element.classList.add(
    "active"
    );

    document.getElementById(
    "dashboardPage"
    ).style.display=
    "block";

}

function showAssets(element){

    removeActive();
    hidePages();

    element.classList.add(
    "active"
    );

    document.getElementById(
    "assetsPage"
    ).style.display=
    "block";

}

function showRequests(element){

    removeActive();
    hidePages();

    element.classList.add(
    "active"
    );

    document.getElementById(
    "requestsPage"
    ).style.display=
    "block";

}

function showProfile(element){

    removeActive();
    hidePages();

    if(element){

        element.classList.add(
        "active"
        );

    }

    document.getElementById(
    "profilePage"
    ).style.display=
    "block";

}

function logout(){

    localStorage.clear();

    window.location.replace(
    "index.html"
    );

}
async function loadAssignedAssets(){

    const user =
    JSON.parse(
    localStorage.getItem(
    "user"
    )
    );

    const response =
    await fetch(

`/api/employee/assets/${user.employeeId}`

    );

    const data =
    await response.json();

    const table =
    document.getElementById(
    "assignedAssetsTable"
    );

    table.innerHTML = "";

    data.assets.forEach(asset=>{

        table.innerHTML += `

        <tr>

            <td>${asset.assetId}</td>

            <td>${asset.category}</td>

            <td>

<span class="
status-${asset.status
.toLowerCase()
.replace(" ","")}
">

${asset.status}

</span>

</td>

        </tr>

        `;

    });

}
async function loadMyAssets(){

    const user =
    JSON.parse(
    localStorage.getItem(
    "user"
    )
    );

    const response =
    await fetch(

`/api/employee/assets/${user.employeeId}`

    );

    const data =
    await response.json();

    window.employeeAssets =
data.assets;

    const container =
    document.getElementById(
    "assetsContainer"
    );

    container.innerHTML = "";

    data.assets.forEach(asset=>{

        let icon =
        "fa-laptop";

        if(
        asset.category ===
        "Monitor"
        ){

            icon =
            "fa-desktop";

        }

        container.innerHTML += `

        <div class="asset-card">

            <div class="asset-top">

                <div class="asset-icon">

                    <i class="fa-solid ${icon}"></i>

                </div>

                <div>

                    <div class="asset-name">

                        ${asset.category}

                    </div>

                    <div>

                        ${asset.assetId}

                    </div>

                </div>

            </div>

            <div class="asset-info">

                Asset ID :
                ${asset.assetId}

            </div>

            <div class="asset-info">

                Category :
                ${asset.category}

            </div>

            <span
            class="asset-status">

                ${asset.status}

            </span>

            <button
            class="view-asset-btn" onclick="viewAssetDetails(${data.assets.indexOf(asset)})">

                View Details

            </button>

        </div>

        `;

    });

}
function viewAssetDetails(index){

    const asset =
    window.employeeAssets[index];

    console.log(asset);

    let icon =
    "fa-laptop";

    if(
    asset.category ===
    "Monitor"
    ){

        icon =
        "fa-desktop";

    }

    document.getElementById(
    "assetDetailsContent"
    ).innerHTML = `

    <div class="asset-header">

        <div
        class="asset-header-icon">

            <i class="fa-solid ${icon}"></i>

        </div>

        <div>

            <h2>
                ${asset.category}
            </h2>

            <p>
                ${asset.assetId}
            </p>

        </div>

    </div>

    <div class="asset-details-grid">

        <div class="asset-detail-row">

            <span>Asset ID</span>

            <span>${asset.assetId}</span>

        </div>

        <div class="asset-detail-row">

            <span>Category</span>

            <span>${asset.category}</span>

        </div>
        <div class="asset-detail-row">

    <span>Brand</span>

    <span>
        ${asset.brand || "-"}
    </span>

</div>

<div class="asset-detail-row">

    <span>Model</span>

    <span>
        ${asset.model || "-"}
    </span>

</div>

<div class="asset-detail-row">

    <span>Serial No</span>

    <span>
        ${asset.serialNumber || "-"}
    </span>

</div>

<div class="asset-detail-row">

    <span>Purchase Date</span>

    <span>

        ${asset.purchaseDate
        ? new Date(asset.purchaseDate)
        .toLocaleDateString()
        : "-"}

    </span>

</div>

<div class="asset-detail-row">

    <span>Warranty</span>

    <span>

        ${asset.warrantyExpiry
        ? new Date(asset.warrantyExpiry)
        .toLocaleDateString()
        : "-"}

    </span>

</div>

<div class="asset-detail-row">

    <span>Allocated Date</span>

    <span>

${asset.allocatedDate
? new Date(asset.allocatedDate)
.toLocaleDateString()
: "-"}

    </span>

</div>

        <div class="asset-detail-row">

            <span>Status</span>

            <span>${asset.status}</span>

        </div>

    </div>

    <button
    class="asset-close-btn"
    onclick="closeAssetDetails()">

        Close

    </button>

    `;

    document.getElementById(
    "assetDetailsModal"
    ).style.display =
    "flex";

}
function closeAssetDetails(){

    document.getElementById(
    "assetDetailsModal"
    ).style.display =
    "none";

}

async function loadProfile(){

    const user =
    JSON.parse(
    localStorage.getItem(
    "user"
    )
    );

    const response =
    await fetch(

`/api/employee/profile/${user.employeeId}`

    );

    const data =
    await response.json();

    const employee =
    data.employee;

    document.getElementById(
    "profileName"
    ).innerText =
    employee.name;

    document.getElementById(
    "profileRole"
    ).innerText =
    employee.role;

    document.getElementById(
    "profileEmployeeId"
    ).innerText =
    employee.employeeId;

    document.getElementById(
    "profileEmail"
    ).innerText =
    employee.email;

    document.getElementById(
    "profileRoleText"
    ).innerText =
    employee.role;

    document.getElementById(
    "profileJoinDate"
    ).innerText =
    new Date(
    employee.joinedDate
    ).toLocaleDateString();

}
function openPasswordModal(){

    document.getElementById(
    "passwordModal"
    ).style.display =
    "flex";

}
function closePasswordModal(){

    document.getElementById(
    "passwordModal"
    ).style.display =
    "none";

}
async function changePassword(){

    const user =
    JSON.parse(
    localStorage.getItem(
    "user"
    ));

    const oldPassword =
    document.getElementById(
    "oldPassword"
    ).value;

    const newPassword =
    document.getElementById(
    "newPassword"
    ).value;

    const response =
    await fetch(

"/api/employee/change-password",

    {

        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            employeeId:
            user.employeeId,

            oldPassword,

            newPassword

        })

    });

    const data =
    await response.json();

    alert(
    data.message
    );

    if(data.success){

        closePasswordModal();

        document.getElementById(
        "oldPassword"
        ).value = "";

        document.getElementById(
        "newPassword"
        ).value = "";

    }

}
async function loadAssetsForRequest(){

    const user =
    JSON.parse(
    localStorage.getItem(
    "user"
    ));

    const response =
    await fetch(

`/api/employee/assets/${user.employeeId}`

    );

    const data =
    await response.json();

    const select =
    document.getElementById(
    "requestAsset"
    );

    select.innerHTML = "";

    data.assets.forEach(asset=>{

        select.innerHTML += `

        <option
        value="${asset.assetId}">

            ${asset.assetId}
            -
            ${asset.category}

        </option>

        `;

    });

}
function openRequestModal(){

    const user =
    JSON.parse(
    localStorage.getItem(
    "user"
    ));

    document.getElementById(
    "requestEmployeeId"
    ).value =
    user.employeeId;

    document.getElementById(
    "requestEmployeeName"
    ).value =
    user.name;

    loadAssetsForRequest();

    document.getElementById(
    "requestModal"
    ).style.display =
    "flex";

}
function closeRequestModal(){

    document.getElementById(
    "requestModal"
    ).style.display =
    "none";

}
async function submitRequest(){

    const user =
    JSON.parse(
    localStorage.getItem(
    "user"
    ));

    const assetValue =
    document.getElementById(
    "requestAsset"
    ).value;

    const reason =
    document.getElementById(
    "requestReason"
    ).value;

    const priority =
    document.getElementById(
    "requestPriority"
    ).value;

    if(!reason){

        alert(
        "Please enter reason"
        );

        return;

    }

    const [assetId,category] =
    assetValue.split("|");

    const response =
    await fetch(

"/api/employee/request",

    {

        method:"POST",

        headers:{

            "Content-Type":
            "application/json"

        },

        body:JSON.stringify({

            employeeId:
            user.employeeId,

            employeeName:
            user.name,

            assetId,

            category,

            reason,

            priority

        })

    });

    const data =
    await response.json();

    alert(
    data.message
    );

    if(data.success){

        document.getElementById(
        "requestReason"
        ).value = "";

        document.getElementById(
        "requestPriority"
        ).value = "Low";

        closeRequestModal();
        loadRequestPage();
        loadRequests();
    }

}
async function loadRequests(){

    const user =
    JSON.parse(
    localStorage.getItem(
    "user"
    ));

    const response =
    await fetch(

`/api/employee/requests/${user.employeeId}`

    );

    const data =
    await response.json();

    const table =
    document.getElementById(
    "requestTable"
    );

    table.innerHTML = "";

    data.requests.forEach(request=>{

        table.innerHTML += `

        <tr>

            <td>
                ${request.assetId}
            </td>

            <td>
                ${request.reason}
            </td>

            

            <td>

                <span class="
status-${request.status
.toLowerCase()
.replace(" ","")}
">

${request.status}

</span>

            </td>

            

        </tr>

        `;

    });

}
async function loadRequestPage(){

    const user =
    JSON.parse(
    localStorage.getItem(
    "user"
    ));

    const response =
    await fetch(

`/api/employee/all-requests/${user.employeeId}`

    );

    const data =
    await response.json();

    const table =
    document.getElementById(
    "requestPageTable"
    );

    table.innerHTML = "";

    data.requests.forEach(request=>{

        table.innerHTML += `

        <tr>

            <td>
                ${request.assetId}
            </td>

            <td>
                ${request.reason}
            </td>

            <td>
                ${request.priority}
            </td>

            <td>

                <span class="
status-${request.status
.toLowerCase()
.replace(" ","")}
">

${request.status}

</span>

            </td>

            <td>
                ${request.adminReply}
            </td>

            <td>

                ${new Date(
                request.requestDate
                ).toLocaleDateString()}

            </td>

            <td>

${
request.status ===
"Pending"

?

`<button
class="delete-request-btn"
onclick=
"deleteRequest(
'${request._id}'
)">

Delete

</button>`

:

`<span
class="disabled-action">

Locked

</span>`

}

</td>

        </tr>

        `;

    });

}
async function deleteRequest(id){

    const confirmDelete =
    confirm(

    "Delete this request?"

    );

    if(!confirmDelete){

        return;

    }

    const response =
    await fetch(

`/api/employee/request/${id}`,

    {

        method:"DELETE"

    });

    const data =
    await response.json();

    alert(
    data.message
    );

    if(data.success){

        loadRequestPage();

        

    }

}