# Health Platform Backend

## Setup Instructions

1. **Configure Oracle Database**
   - Edit `src/main/resources/application.yml` and set your Oracle DB `username`, `password`, and `url`.

2. **Configure JWT**
   - Set a secure value for `jwt.secret` in `application.yml`.

3. **Build the Project**
   - Run: `mvn clean package`

4. **Run the Application**
   - Run: `mvn spring-boot:run`

5. **API Endpoints**
   - Provider Registration/Login: `/api/v1/provider/register`, `/api/v1/provider/login`
   - Patient Registration/Login: `/api/v1/patient/register`, `/api/v1/patient/login`
   - Provider Availability: `/api/v1/provider/availability` (and related endpoints)

6. **Testing**
   - Place your unit/integration tests in `src/test/java/com/example/health/`

## Files
- `pom.xml`: Maven dependencies
- `src/main/resources/application.yml`: Main configuration
- `src/main/java/com/example/health/`: Source code
- `src/test/java/com/example/health/`: Tests