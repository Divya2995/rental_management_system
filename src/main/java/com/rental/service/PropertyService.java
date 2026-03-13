package com.rental.service;
import com.rental.model.Property;
import com.rental.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;
    public Property addProperty(Property property) {
        return propertyRepository.save(property);
    }
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }
    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }
    public Property updateProperty(Long id, Property propertyDetails) {
        Property property = propertyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
        
        property.setPropertyTitle(propertyDetails.getPropertyTitle());
        property.setLocation(propertyDetails.getLocation());
        property.setRentAmount(propertyDetails.getRentAmount());
        property.setPropertyType(propertyDetails.getPropertyType());
        property.setAvailabilityStatus(propertyDetails.getAvailabilityStatus());
        property.setOwnerName(propertyDetails.getOwnerName());
        return propertyRepository.save(property);
    }
    public void deleteProperty(Long id) {
        if (!propertyRepository.existsById(id)) {
            throw new RuntimeException("Property not found with id: " + id);
        }
        propertyRepository.deleteById(id);
    }
    public List<Property> searchByLocation(String location) {
        return propertyRepository.findByLocationContainingIgnoreCase(location);
    }
    public List<Property> filterByStatus(String status) {
        return propertyRepository.findByAvailabilityStatus(status);
    }
    public Property markAsRented(Long id) {
        Property property = propertyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
        property.setAvailabilityStatus("Rented");
        return propertyRepository.save(property);
    }
}
