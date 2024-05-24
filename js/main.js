

document.getElementById("addWebsite").onclick = function () {
    addWebsite()
};

document.getElementById("siteName").oninput = function(){
    nameValidation()
};

document.getElementById("siteURL").oninput = function(){
    urlValidation()
};

var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");

var websites = [];



if (localStorage.getItem("websiteContainer") !== null) {

    websites = JSON.parse(localStorage.getItem("websiteContainer"))
    displayData()
};



function addWebsite() {

    if(urlValidation() && nameValidation()){

        document.getElementById("addWebsite").removeAttribute("data-bs-toggle", "modal");
        document.getElementById("addWebsite").removeAttribute("data-bs-target", "#exampleModal");
        

        var website = {
            siteName: siteNameInput.value,
            siteURL: siteURLInput.value,
        }
    
        websites.push(website)
        localStorage.setItem("websiteContainer", JSON.stringify(websites));
      
        clear();
        displayData();
    }
    else{
        // modalMsg()
        // alert("No")
        modalMsg();
        var x = ``;

        x+= `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
          <div class="dottes bg-warning rounded-circle"></div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="h5 fw-bold mb-3">Site Name or Url is not valid, Please follow the rules below :</p>
            <p><i class="fa-regular fa-circle-right"></i> Site name must contain at least 3 charachters</p>
            <p><i class="fa-regular fa-circle-right"></i> Site URL must be a valid one</p>
          </div>
       
        </div>
      </div>
        </div>

        `

        document.getElementById("modalMsg").innerHTML = x;
     
    }
    };



function clear() {

    siteNameInput.value = null;
    siteURLInput.value = null;
    siteNameInput.classList.remove("is-invalid")
    siteURLInput.classList.remove("is-valid")


}

function displayData() {

    var item = ``;

    for (var i = 0; i < websites.length; i++) {

        item += `
        
        <tr>
        <td> ${i + 1} </td>
        <td> ${websites[i].siteName} </td>
        <td>
            <a  href=" http://${websites[i].siteURL} " target="_blank">
                <button class="btn btn-success"><i class="fa-regular fa-eye me-2"></i>Visit</button>
            </a>

        </td>
        <td>
                 <button onclick="deleteDate( ${i} )" class="btn btn-danger"><i class="fa-regular fa-trash-can me-2"></i>Delete</button>
        </td>
    </tr>

        `

    }

    document.getElementById("tableData").innerHTML = item;

}


function deleteDate(index) {
    websites.splice(index, 1)
    displayData()
    localStorage.setItem("websiteContainer", JSON.stringify(websites))
};


function nameValidation(){
    var regex = /^[a-zA-Z]{3,8}$/

    if(regex.test(siteNameInput.value)){
        siteNameInput.classList.add("is-valid")
        siteNameInput.classList.remove("is-invalid")
        return true;
    }
    else{
        siteNameInput.classList.add("is-invalid")
        siteNameInput.classList.remove("is-valid")
        return false;
    }
};


function urlValidation(){
    var regex = /^www.[a-z]{3,8}.com$/

    if(regex.test(siteURLInput.value)){
        siteURLInput.classList.add("is-valid")
        siteURLInput.classList.remove("is-invalid")
        return true;
    }
    else{
        siteURLInput.classList.add("is-invalid")
        siteURLInput.classList.remove("is-valid")
        return false;
    }
};

function modalMsg(){
    document.getElementById("addWebsite").setAttribute("data-bs-target", "#exampleModal");
    document.getElementById("addWebsite").setAttribute("data-bs-toggle", "modal");

}








