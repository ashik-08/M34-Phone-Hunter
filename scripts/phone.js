const loadPhone = async (searchText='13', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container before adding new cards
  // phoneContainer.innerHTML = '';
  phoneContainer.textContent = "";

  // display show all button if there are more than 9 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 9 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log('is show all', isShowAll);

  // show 9 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    // 3. set innerHTML
    phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="phone" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
    // 4. append child
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading dots
  toggleLoadingDots(false);
};

const handleShowDetail = async (id) => {
//   console.log("click", id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

    // console.log(phone);

  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <figure class="bg-[#0D6EFD0D] h-72 w-full rounded-lg flex justify-center items-center">
        <img src="${phone.image}" alt="${phone.slug}" />
    </figure>
    <h3 class="text-[#403F3F] font-bold text-2xl mt-8">${phone.name}</h3>
    <p class="text-[#706F6F] text-base font-normal mt-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p class="text-[#403F3F] text-lg font-semibold mt-5">Brand: <span class="text-[#706F6F] font-normal">${phone?.brand}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">Storage: <span class="text-[#706F6F] font-normal">${phone.mainFeatures?.storage}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">Display: <span class="text-[#706F6F] font-normal">${phone.mainFeatures?.displaySize}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">Chipset: <span class="text-[#706F6F] font-normal">${phone.mainFeatures?.chipSet}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">Memory: <span class="text-[#706F6F] font-normal">${phone.mainFeatures?.memory}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">Sensors: <span class="text-[#706F6F] font-normal">${phone.mainFeatures?.sensors}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">WLAN: <span class="text-[#706F6F] font-normal">${phone.others?.WLAN || 'Unspecified'}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">Bluetooth: <span class="text-[#706F6F] font-normal">${phone.others?.Bluetooth || 'Unspecified'}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">GPS: <span class="text-[#706F6F] font-normal">${phone.others?.GPS || 'Unspecified'}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">NFC: <span class="text-[#706F6F] font-normal">${phone.others?.NFC || 'Unspecified'}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">Radio: <span class="text-[#706F6F] font-normal">${phone.others?.Radio || 'Unspecified'}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">USB: <span class="text-[#706F6F] font-normal">${phone.others?.USB || 'Unspecified'}</span></p>
    <p class="text-[#403F3F] text-lg font-semibold mt-4">Release Date: <span class="text-[#706F6F] font-normal">${phone.releaseDate}</span></p>
    `

    // show the modal
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingDots(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
  // searchField.value = '';
};

const toggleLoadingDots = (isLoading) => {
  const loadingDots = document.getElementById("loading-dots");
  if (isLoading) {
    loadingDots.classList.remove("hidden");
  } else {
    loadingDots.classList.add("hidden");
  }
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();