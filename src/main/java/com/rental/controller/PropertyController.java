package com.rental.controller;

import com.rental.model.Property;
import com.rental.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {
    @Autowired
    private PropertyService propertyService;
    @PostMapping
    public ResponseEntity<Property> addProperty(@Valid @RequestBody Property property) {
        Property savedProperty = propertyService.addProperty(property);
        return new ResponseEntity<>(savedProperty, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, 
                                                   @Valid @RequestBody Property property) {
        Property updatedProperty = propertyService.updateProperty(id, property);
        return ResponseEntity.ok(updatedProperty);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/search")
    public ResponseEntity<List<Property>> searchByLocation(@RequestParam String location) {
        List<Property> properties = propertyService.searchByLocation(location);
        return ResponseEntity.ok(properties);
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Property>> filterByStatus(@RequestParam String status) {
        List<Property> properties = propertyService.filterByStatus(status);
        return ResponseEntity.ok(properties);
    }
    @PatchMapping("/{id}/rent")
    public ResponseEntity<Property> markAsRented(@PathVariable Long id) {
        Property property = propertyService.markAsRented(id);
        return ResponseEntity.ok(property);
    }
}
