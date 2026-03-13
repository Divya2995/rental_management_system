package com.rental.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;
@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertyId;
    @NotBlank(message = "Property title is required")
    @Column(nullable = false)
    private String propertyTitle;
    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;
    @NotNull(message = "Rent amount is required")
    @Positive(message = "Rent amount must be positive")
    @Column(nullable = false)
    private Double rentAmount;
    @NotBlank(message = "Property type is required")
    @Column(nullable = false)
    private String propertyType;
    @Column(nullable = false)
    private String availabilityStatus = "Available";
    @NotBlank(message = "Owner name is required")
    @Column(nullable = false)
    private String ownerName;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDateTime;
    @PrePersist
    protected void onCreate() {
        createdDateTime = LocalDateTime.now();
    }
    public Property() {}
    public Property(String propertyTitle, String location, Double rentAmount, 
                   String propertyType, String ownerName) {
        this.propertyTitle = propertyTitle;
        this.location = location;
        this.rentAmount = rentAmount;
        this.propertyType = propertyType;
        this.ownerName = ownerName;
    }
    public Long getPropertyId() {
        return propertyId;
    }
    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }
    public String getPropertyTitle() {
        return propertyTitle;
    }
    public void setPropertyTitle(String propertyTitle) {
        this.propertyTitle = propertyTitle;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public Double getRentAmount() {
        return rentAmount;
    }
    public void setRentAmount(Double rentAmount) {
        this.rentAmount = rentAmount;
    }
    public String getPropertyType() {
        return propertyType;
    }
    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }
    public String getAvailabilityStatus() {
        return availabilityStatus;
    }
    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }
    public String getOwnerName() {
        return ownerName;
    }
    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }
    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }
    public void setCreatedDateTime(LocalDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }
}
