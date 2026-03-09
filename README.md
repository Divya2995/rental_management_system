# Property Rental Management System

A full-stack web application for managing rental properties built with Spring Boot, MySQL, HTML, CSS, and JavaScript.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Any IDE (IntelliJ IDEA, Eclipse, VS Code)

## Setup Instructions

### 1. Database Setup

Create a MySQL database (or let Spring Boot create it automatically):

```sql
CREATE DATABASE property_rental_db;
```

### 2. Configure Database Connection

Edit `src/main/resources/application.properties` and update MySQL credentials:

```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Build and Run

**Option A: Using Maven Command Line**

```bash
mvn clean install
mvn spring-boot:run
```

**Option B: Using IDE**

1. Import the project as a Maven project
2. Wait for dependencies to download
3. Run `PropertyRentalApplication.java` as a Java Application

**Option C: Using JAR file**

```bash
mvn clean package
java -jar target/property-rental-system-1.0.0.jar
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

## Features

- ✅ Add new properties
- ✅ View all properties
- ✅ Update property details
- ✅ Delete properties
- ✅ Search properties by location
- ✅ Filter properties by availability status
- ✅ Mark properties as rented
- ✅ Visual distinction for rented properties
- ✅ Responsive design
- ✅ Real-time updates without page reload

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/properties` | Add new property |
| GET | `/api/properties` | Get all properties |
| GET | `/api/properties/{id}` | Get property by ID |
| PUT | `/api/properties/{id}` | Update property |
| DELETE | `/api/properties/{id}` | Delete property |
| GET | `/api/properties/search?location={location}` | Search by location |
| GET | `/api/properties/filter?status={status}` | Filter by status |
| PATCH | `/api/properties/{id}/rent` | Mark as rented |

## Technology Stack

- **Backend**: Spring Boot 3.2.0, Spring Data JPA
- **Database**: MySQL 8.0
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Maven
- **Java Version**: 17

## Project Structure

```
property-rental-system/
├── src/
│   ├── main/
│   │   ├── java/com/rental/
│   │   │   ├── PropertyRentalApplication.java
│   │   │   ├── model/Property.java
│   │   │   ├── repository/PropertyRepository.java
│   │   │   ├── service/PropertyService.java
│   │   │   ├── controller/PropertyController.java
│   │   │   └── exception/GlobalExceptionHandler.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           ├── index.html
│   │           ├── style.css
│   │           └── script.js
└── pom.xml
```

## Troubleshooting

**Issue**: Application fails to start
- Check if MySQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is not in use

**Issue**: Cannot connect to database
- Verify MySQL service is running
- Check username and password
- Ensure database exists or `createDatabaseIfNotExist=true` is set

**Issue**: Frontend not loading
- Clear browser cache
- Check browser console for errors
- Verify backend is running on port 8080
