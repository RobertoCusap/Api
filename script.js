// Define API base URL
const API_BASE_URL = 'https://psgc.gitlab.io/api';

//fetch data from PSGC API
async function fetchPSGCData(endpoint) {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return await response.json();
}

// Populate Regions on page load
document.addEventListener('DOMContentLoaded', async () => {
    const regions = await fetchPSGCData('regions');
    const regionSelect = document.getElementById('region');
    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region.code;
        option.textContent = region.name;
        regionSelect.appendChild(option);
    });
});

// Populate Provinces based on selected Region
document.getElementById('region').addEventListener('change', async (event) => {
    const regionCode = event.target.value;
    const provinces = await fetchPSGCData(`regions/${regionCode}/provinces`);
    const provinceSelect = document.getElementById('province');
    provinceSelect.innerHTML = '<option value="">Select Province...</option>';
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province.code;
        option.textContent = province.name;
        provinceSelect.appendChild(option);
    });
});

// Populate Cities/Municipalities based on selected Province
document.getElementById('province').addEventListener('change', async (event) => {
    const provinceCode = event.target.value;
    const cities = await fetchPSGCData(`provinces/${provinceCode}/cities-municipalities`);
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="">Select City/Municipality...</option>';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.code;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
});

// Populate Barangays based on selected City/Municipality
document.getElementById('city').addEventListener('change', async (event) => {
    const cityCode = event.target.value;
    const barangays = await fetchPSGCData(`cities-municipalities/${cityCode}/barangays`);
    const barangaySelect = document.getElementById('barangay');
    barangaySelect.innerHTML = '<option value="">Select Barangay...</option>';
    barangays.forEach(barangay => {
        const option = document.createElement('option');
        option.value = barangay.code;
        option.textContent = barangay.name;
        barangaySelect.appendChild(option);
    });
});

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Validate that all required fields are filled
    const requiredFields = document.querySelectorAll('#registrationForm [required]');
    let allFieldsFilled = true;

    requiredFields.forEach(field => {
        if (!field.value) {
            allFieldsFilled = false;
        }
    });

    // Validate password and confirm password match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordMatch = password === confirmPassword;

    if (!allFieldsFilled) {
        alert('Please fill in all required fields.');
    } else if (!passwordMatch) {
        alert('Passwords do not match.');
    } else {
        alert('Registered Successfully.');
    }
});
