const API_URL = 'http://localhost:8080/api/properties';

const modal = document.getElementById('propertyModal');
const addPropertyBtn = document.getElementById('addPropertyBtn');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');
const propertyForm = document.getElementById('propertyForm');
const searchInput = document.getElementById('searchLocation');
const filterSelect = document.getElementById('filterStatus');
const propertiesContainer = document.getElementById('propertiesContainer');

let isEditMode = false;

// Event Listeners
addPropertyBtn.addEventListener('click', openAddModal);
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
propertyForm.addEventListener('submit', handleSubmit);
searchInput.addEventListener('input', handleSearch);
filterSelect.addEventListener('change', handleFilter);

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Load properties on page load
document.addEventListener('DOMContentLoaded', loadProperties);

async function loadProperties() {
    try {
        const response = await fetch(API_URL);
        const properties = await response.json();
        displayProperties(properties);
    } catch (error) {
        console.error('Error loading properties:', error);
        alert('Failed to load properties');
    }
}

function displayProperties(properties) {
    propertiesContainer.innerHTML = '';
    
    if (properties.length === 0) {
        propertiesContainer.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">No properties found</p>';
        return;
    }
    
    properties.forEach(property => {
        const card = createPropertyCard(property);
        propertiesContainer.appendChild(card);
    });
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = `property-card ${property.availabilityStatus === 'Rented' ? 'rented' : ''}`;
    
    const createdDate = new Date(property.createdDateTime).toLocaleDateString();
    
    card.innerHTML = `
        <div class="property-header">
            <h3 class="property-title">${property.propertyTitle}</h3>
            <span class="status-badge status-${property.availabilityStatus.toLowerCase()}">
                ${property.availabilityStatus}
            </span>
        </div>
        <div class="property-details">
            <div class="property-detail">
                <span class="detail-label">Location:</span>
                <span class="detail-value">${property.location}</span>
            </div>
            <div class="property-detail">
                <span class="detail-label">Rent:</span>
                <span class="detail-value rent-amount">$${property.rentAmount}</span>
            </div>
            <div class="property-detail">
                <span class="detail-label">Type:</span>
                <span class="detail-value">${property.propertyType}</span>
            </div>
            <div class="property-detail">
                <span class="detail-label">Owner:</span>
                <span class="detail-value">${property.ownerName}</span>
            </div>
            <div class="property-detail">
                <span class="detail-label">Created:</span>
                <span class="detail-value">${createdDate}</span>
            </div>
        </div>
        <div class="property-actions">
            ${property.availabilityStatus === 'Available' ? 
                `<button class="btn btn-warning" onclick="markAsRented(${property.propertyId})">Mark Rented</button>` : 
                ''}
            <button class="btn btn-success" onclick="editProperty(${property.propertyId})">Edit</button>
            <button class="btn btn-danger" onclick="deleteProperty(${property.propertyId})">Delete</button>
        </div>
    `;
    
    return card;
}

function openAddModal() {
    isEditMode = false;
    document.getElementById('modalTitle').textContent = 'Add New Property';
    propertyForm.reset();
    document.getElementById('propertyId').value = '';
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    propertyForm.reset();
}

async function handleSubmit(e) {
    e.preventDefault();
    
    const propertyData = {
        propertyTitle: document.getElementById('propertyTitle').value,
        location: document.getElementById('location').value,
        rentAmount: parseFloat(document.getElementById('rentAmount').value),
        propertyType: document.getElementById('propertyType').value,
        ownerName: document.getElementById('ownerName').value,
        availabilityStatus: document.getElementById('availabilityStatus').value
    };
    
    try {
        let response;
        if (isEditMode) {
            const id = document.getElementById('propertyId').value;
            response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propertyData)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propertyData)
            });
        }
        
        if (response.ok) {
            closeModal();
            loadProperties();
            alert(isEditMode ? 'Property updated successfully!' : 'Property added successfully!');
        } else {
            const error = await response.json();
            alert('Error: ' + JSON.stringify(error));
        }
    } catch (error) {
        console.error('Error saving property:', error);
        alert('Failed to save property');
    }
}

async function editProperty(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const property = await response.json();
        
        isEditMode = true;
        document.getElementById('modalTitle').textContent = 'Edit Property';
        document.getElementById('propertyId').value = property.propertyId;
        document.getElementById('propertyTitle').value = property.propertyTitle;
        document.getElementById('location').value = property.location;
        document.getElementById('rentAmount').value = property.rentAmount;
        document.getElementById('propertyType').value = property.propertyType;
        document.getElementById('ownerName').value = property.ownerName;
        document.getElementById('availabilityStatus').value = property.availabilityStatus;
        
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading property:', error);
        alert('Failed to load property details');
    }
}

async function deleteProperty(id) {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadProperties();
            alert('Property deleted successfully!');
        } else {
            alert('Failed to delete property');
        }
    } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property');
    }
}

async function markAsRented(id) {
    try {
        const response = await fetch(`${API_URL}/${id}/rent`, {
            method: 'PATCH'
        });
        
        if (response.ok) {
            loadProperties();
            alert('Property marked as rented!');
        } else {
            alert('Failed to update property status');
        }
    } catch (error) {
        console.error('Error updating property:', error);
        alert('Failed to update property status');
    }
}

async function handleSearch() {
    const location = searchInput.value.trim();
    
    if (location === '') {
        loadProperties();
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/search?location=${encodeURIComponent(location)}`);
        const properties = await response.json();
        displayProperties(properties);
    } catch (error) {
        console.error('Error searching properties:', error);
        alert('Failed to search properties');
    }
}

async function handleFilter() {
    const status = filterSelect.value;
    
    if (status === '') {
        loadProperties();
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/filter?status=${encodeURIComponent(status)}`);
        const properties = await response.json();
        displayProperties(properties);
    } catch (error) {
        console.error('Error filtering properties:', error);
        alert('Failed to filter properties');
    }
}
