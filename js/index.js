var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var tableData = document.getElementById('tableData');
var siteRuls = document.getElementById('siteRuls');

var siteList ;

if (localStorage.getItem('siteList') != null) {

    siteList = JSON.parse(localStorage.getItem('siteList'))
    display(siteList);

}else {
    siteList = [];
}

function addSite() {
    var site = {
        name: siteName.value,
        url: siteUrl.value
    }

    if (siteName.classList.contains('is-valid') &&
        siteUrl.classList.contains('is-valid')) {
        
        siteList.push(site);
        localStorage.setItem('siteList' , JSON.stringify(siteList));

        clear();
        display(siteList);

    } else {
        siteRuls.classList.remove('d-none');
    }
}

function clear() {
    
    siteName.value = '';
    siteName.classList.remove('is-valid' , 'bg-success-subtle');
    siteUrl.value = '';
    siteUrl.classList.remove('is-valid' , 'bg-success-subtle');
}

function display(list) {
    box = ``;

    for (var i = 0; i < list.length; i++) {
        box+= ` <tr>
                    <td>${i+1}</td>
                    <td>${list[i].name}</td>
                    <td>
                        <a href="${list[i].url}" target="_blank">
                            <button class="Visit-button border border-1 rounded-2 fw-medium text-light">
                                <i class="fa-solid fa-eye pe-2"></i>
                                <span class="z-3 p-0 m-0">Visit</span>
                            </button>
                        </a>
                    </td>
                    <td>
                        <button onclick="deleteSite(${i})" class="Delete-button border border-1 rounded-2 fw-medium text-light">
                            <i class="fa-solid fa-trash-can pe-1"></i>
                            <span class="z-3 p-0 m-0">Delete</span>
                        </button>
                    </td>
                </tr>`
    }

    tableData.innerHTML = box;
}

function deleteSite(index) {
    
    siteList.splice(index , 1);
    localStorage.setItem('siteList' , JSON.stringify(siteList));

    display(siteList);
} 

function validationSite(input) {
    
    var siteRegex = {
        siteName: /^[A-Za-z0-9]{3,}/,
        siteUrl: /^(https:\/\/)(www\.|WWW\.)[A-Za-z0-9]{3,}(\.com)$/
    }

    if (siteRegex[input.id].test(input.value)) {
        
        input.classList.add('is-valid' , 'bg-success-subtle');
        input.classList.remove('is-invalid' , 'bg-danger-subtle');

    } else {
                
        input.classList.remove('is-valid' , 'bg-success-subtle');
        input.classList.add('is-invalid' , 'bg-danger-subtle');
    }
}

function closeAlert() {
    
    siteRuls.classList.add('d-none');
}