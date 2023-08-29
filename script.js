const loadPhoneAPI = async (searchInputField,showAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputField}`) ;
    const getData =await res.json() 
    const getPhone = getData.data
    showPhoneOnHTML(getPhone,showAll)
}

const showPhoneOnHTML = (phones, needShowAll) =>{
    console.log(phones)
    const showContainer = document.getElementById('show-container') ;
    showContainer.innerText = '' ;

    // if no found data,then show it 
    const notFoundData = document.getElementById('no-Found-Data') ;
     if(phones.length > 0 && !needShowAll){
       notFoundData.innerText ='' ;
    }
    else{
       notFoundData.innerText = 'No Data Available, Please Search Again...!'
     }
    const showAllContainer = document.getElementById('show-all-container') ;
    // console.log(phones.length)
    if(phones.length > 12 && !needShowAll){
      showAllContainer.classList.remove('hidden')
    }
    else{
      showAllContainer.classList.add('hidden')
    }

    if(!needShowAll){
      phones = phones.slice(0,12)
    }
    phones.forEach((phone) => {
        const createDiv = document.createElement('div')
        // console.log(phone.slug)
        createDiv.classList = (`card bg-base-100 shadow-xl border`)
        createDiv.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone?.phone_name}</h2>
        <p>If a dog chews phones whose phones does you choose?</p>
        <div class="card-actions">
          <button onclick ="showDetailsAPI('${phone?.slug}');show_details_my_modal.showModal() " class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;
        showContainer.appendChild(createDiv)
    });
    loadingSpinner(false)
};
// showPhoneOnHTML()
// loadPhoneAPI()

// Handle Show Details Called API for set modal
const showDetailsAPI = async(needId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${needId}`) ;
    const get =await res.json() ;
    const phone = get.data
    showDetailsOfPhone(phone)
}

// show details clicked modal of Show Details button 
const showDetailsOfPhone = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('show-details-phone-name') ;
    phoneName.innerText = phone.name ;
    const showDetailsContainer = document.getElementById('show-phone-details-container') ;
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
    <p><strong>Storage:</strong> <span>${phone?.mainFeatures?.storage}</span></p>
    <p><strong>Display:</strong> <span>${phone?.mainFeatures?.displaySize}</span></p>
    <p><strong>Chipset:</strong> <span>${phone?.mainFeatures?.chipSet}</span></p>
    <p><strong>Memory:</strong> <span>${phone?.mainFeatures?.memory}</span></p>
    <p><strong>Slug:</strong> <span>${phone?.slug}</span></p>
    <p><strong>Release:</strong> <span>${phone?.releaseDate}</span></p>
    <p><strong>Brand:</strong> <span>${phone?.brand}</span></p>
    <p><strong>Sensors:</strong> <span class ="text-center">${phone?.mainFeatures?.sensors}</span></p>
    <p><strong>GPS:</strong> <span>${phone?.others?.GPS || 'No GPS Available'}</span></p>
    `;

    show_details_my_modal.showModal(phone)
}

// loading spinner 
const loadingSpinner = (loading) => {
  const spinner = document.getElementById('loading-spinner') ;
  if(loading){
    spinner.classList.remove('hidden')
  }
  else{
    spinner.classList.add('hidden')
  }
}
// input search and clicked button 
const searchInputHandler = (showAll) => {
    loadingSpinner(true)
    const searchInputField = document.getElementById('input-field').value ;
    // console.log(searchInputField)
    loadPhoneAPI(searchInputField,showAll)
}
// show more hadler button 
const showMoreButton = () =>{
  searchInputHandler(true)
}