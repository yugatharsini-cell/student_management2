# Student Management System – Database

## 1. Overview

This directory contains the database scripts and documentation for the
Student Management System.

The application uses **MySQL** as the database management system.

The database supports:

- User authentication
- User role management
- Student registration
- Student record management
- Student profile viewing

---

## 2. Database Technology

| Item | Technology |
|---|---|
| Database Management System | MySQL |
| Database Language | SQL |
| Backend | Node.js + Express |
| Frontend | React |
| Version Control | Git / GitHub |

---

## 3. Database Name

The database name used by the application is:

```text
student_management
```

---

## 4. Database Files

The database directory contains the following files:

```text
database/
├── README.md
├── schema.sql
└── seed.sql
```

### schema.sql

Contains the current database schema.

It defines:

- Database creation
- Tables
- Primary keys
- Foreign keys
- Unique constraints
- Data types
- Relationships
- Other database constraints

The `schema.sql` file represents the current working database structure.

### seed.sql

Contains initial/sample data used for development and testing.

It may contain:

- Administrator account
- Student account
- Sample student records

> Real production passwords or sensitive information must not be stored in this file.

---

## 5. Current Database Structure

Version 1.0 contains the following main tables:

- `users`
- `students`

Relationship:

```text
USERS
  |
  | 1
  |
  | 0..1
  |
STUDENTS
```

- A user may have zero or one associated student record.
- Administrator users do not require a student record.
- Student users should have an associated student profile.

---

## 6. Users Table

The `users` table stores authentication and role information.

Main fields:

| Field | Description |
|---|---|
| user_id | Unique user identifier |
| username | Login username |
| password_hash | Securely hashed password |
| role | User role |
| created_at | Account creation date |
| updated_at | Last update date |

Supported roles:

- `ADMIN`
- `STUDENT`

> Passwords must never be stored as plain text.

---

## 7. Students Table

The `students` table stores basic student information.

Main fields:

| Field | Description |
|---|---|
| student_id | Unique student identifier |
| user_id | Related user account |
| registration_no | Student registration number |
| first_name | Student first name |
| last_name | Student last name |
| email | Student email |
| phone_number | Student phone number |
| created_at | Record creation date |
| updated_at | Last update date |

---

## 8. Database Relationship

The relationship between the two tables is:

```text
users.user_id
      |
      | 1
      |
      | 0..1
      ↓
students.user_id
```

The `students.user_id` column is a foreign key referencing `users.user_id`.

The relationship ensures that a student record cannot reference a
non-existing user account.

---

## 9. Database Setup

### Prerequisites

Before setting up the database, install:

- MySQL Server
- MySQL Workbench or another MySQL client

Make sure the MySQL server is running.

---

## 10. Create the Database

The database can be created by executing `schema.sql`.

Using MySQL command line:

```bash
mysql -u root -p < schema.sql
```

The command will ask for the MySQL password.

Alternatively, open `schema.sql` using MySQL Workbench and execute the script.

---

## 11. Load Initial Data

After creating the database, execute `seed.sql`.

Using MySQL command line:

```bash
mysql -u root -p student_management < seed.sql
```

Alternatively, open `seed.sql` using MySQL Workbench and execute the script.

---

## 12. Verify the Database

After running the schema script, connect to MySQL:

```sql
USE student_management;
```

Check the available tables:

```sql
SHOW TABLES;
```

Expected result:

```text
users
students
```

Check the `users` table:

```sql
SELECT * FROM users;
```

Check the `students` table:

```sql
SELECT * FROM students;
```

---

## 13. Verify the Relationship

The relationship between `users` and `students` can be checked using:

```sql
SELECT
    u.user_id,
    u.username,
    u.role,
    s.student_id,
    s.registration_no,
    s.first_name,
    s.last_name
FROM users u
LEFT JOIN students s
    ON u.user_id = s.user_id;
```

This should display users and their associated student profiles.

---

## 14. Database Constraints

The Version 1.0 database applies the following constraints.

### Users

- `user_id` is the primary key.
- `username` must be unique.
- `username` cannot be NULL.
- `password_hash` cannot be NULL.
- `role` cannot be NULL.

### Students

- `student_id` is the primary key.
- `user_id` is a foreign key.
- `user_id` must be unique.
- `registration_no` must be unique.
- `email` must be unique.
- Required student information cannot be NULL.

---

## 15. Security Guidelines

Database security must be considered during development.

### Passwords

Passwords must never be stored as plain text.

The application should store securely hashed passwords.

Example:

```text
Plain Password
      ↓
Password Hashing
      ↓
password_hash
      ↓
MySQL
```

### Database Credentials

Database credentials must not be hard-coded into the source code.

Use environment variables instead.

Example `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=student_management
DB_PORT=3306
```

The `.env` file must not be committed to Git.

Make sure `.env` is included in `.gitignore`.

---

## 16. Database Access

The React frontend must not connect directly to MySQL.

The correct architecture is:

```text
React Frontend
      |
      | HTTP / REST API
      ↓
Node.js + Express
      |
      | Database Access
      ↓
MySQL
```

The backend is responsible for:

- Database connections
- SQL queries
- Data validation
- Business rules
- Authentication
- Authorization
- Error handling

---

## 17. Database Development Rules

Developers should follow these rules:

- Do not modify the database directly without recording the change.
- Update `schema.sql` when the current database structure changes.
- Update `seed.sql` when initial development data changes.
- Test database changes before committing them.
- Do not commit database passwords.
- Do not commit real sensitive student information.
- Keep database changes consistent with the approved system design.
- Keep database changes consistent with the approved requirements.

---

## 18. Git and Database Version Control

The database scripts are managed using Git.

The repository keeps the current database structure in `database/schema.sql`.

The current seed data is maintained in `database/seed.sql`.

Historical versions of these files are maintained through Git commits and
Git tags.

For example:

```text
Commit
   |
   └── database/schema.sql
          ↓
       Version 1.0 structure
```

After a controlled change:

```text
Change Request
      ↓
Impact Analysis
      ↓
Approval
      ↓
Modify schema.sql
      ↓
Test database change
      ↓
Commit
      ↓
Release
```

---

## 19. Database Baseline

The initial database design is intended to become:

```text
Database Design Baseline v1.0
```

The initial release baseline is:

```text
v1.0.0
```

The database design baseline may be associated with the tag `database-v1.0`.

The release tag may be `v1.0.0`.

Git tags provide a reference to the database state associated with a
particular baseline or software release.

---

## 20. Database Changes After Version 1.0

After Version 1.0 has been baselined, database changes must be controlled
through the Software Change Management process.

The recommended workflow is:

```text
Change Request
      ↓
Change Registration
      ↓
Impact Analysis
      ↓
Approval
      ↓
Database Design Update
      ↓
Schema Change
      ↓
Testing
      ↓
Code Review
      ↓
Merge
      ↓
Release
      ↓
Database Baseline Update
```

Developers should not introduce significant database changes directly into
the baselined version without following the change management process.

---

## 21. Example Future Database Change

Suppose a future Change Request introduces Course Management.

The change may require:

- `courses`

and potentially:

- `enrollments`

These tables are not part of the Version 1.0 database baseline.

A future change should follow:

```text
CR-002
   ↓
Impact Analysis
   ↓
Approval
   ↓
Database Design Update
   ↓
Modify schema.sql
   ↓
Test
   ↓
Commit
   ↓
Release
```

---

## 22. Testing Database Changes

Database changes should be tested before they are released.

Testing may include:

- Table creation
- Primary key constraints
- Foreign key constraints
- Unique constraints
- Insert operations
- Update operations
- Delete operations
- Invalid data handling
- Relationship validation
- Application integration

Example:

```sql
SELECT * FROM users;

SELECT * FROM students;
```

The results should be verified against the expected database design.

---

## 23. Backup Consideration

A deployed system should maintain regular database backups.

Backup planning should consider:

- Backup frequency
- Backup location
- Backup retention
- Restore procedure
- Backup verification

Production backup procedures are outside the initial Version 1.0
development scope.

---

## 24. Database Documentation

The complete database documentation is maintained under
`docs/06_database_design/`.

Expected documentation includes:

```text
06_database_design/
├── Database_Design_v1.0.docx
├── Database_Schema_v1.0.sql
├── Data_Dictionary.xlsx
└── ER_Diagram.png
```

The documentation should remain consistent with the current database schema.

> **Note:** `database/` and `docs/06_database_design/` serve different purposes.
> `database/schema.sql` and `database/seed.sql` are the **current, live**
> working scripts used by the application. The files under
> `docs/06_database_design/` are the **documented / baselined** Version 1.0
> artifacts. This distinction is useful for demonstrating configuration
> management and baselines.

---

## 25. Important Version Control Principle

The file `database/schema.sql` represents the **current** database schema.

It should not be treated as a collection of every historical version.

Historical versions can be obtained using Git.

For example:

```bash
git log -- database/schema.sql
```

To inspect the schema at a particular commit:

```bash
git show <commit-id>:database/schema.sql
```

This allows the project to demonstrate how the database evolved over time.

---

## 26. Current Version

| Item | Value |
|---|---|
| Current database version | Version 1.0 |
| Current database | student_management |
| Current entities | users, students |
| Current database technology | MySQL |
| Current schema file | database/schema.sql |
| Current seed file | database/seed.sql |

---

## 27. Change History

Database changes should be recorded through Git commits and the project's
Software Change Management documentation.

Example commit messages:

```text
docs: add database design documentation
feat: add initial database schema
feat: add initial database seed data
```

Future approved change:

```text
feat: add course tables for CR-002
```

Database-related changes should reference the relevant Change Request when
applicable.

---

## 28. Responsibility

Developers are responsible for:

- Maintaining `schema.sql`.
- Maintaining `seed.sql`.
- Testing database changes.
- Following the approved database design.
- Following the Software Change Management process.
- Protecting database credentials.
- Avoiding sensitive data in source control.
- Updating database documentation when required.

---

## 29. Summary

The database directory provides the current database setup required by
the Student Management System.

The structure is:

```text
database/
├── README.md
├── schema.sql
└── seed.sql
```

- `schema.sql` represents the current database structure.
- `seed.sql` contains initial/sample development data.
- Historical database versions are maintained using Git commits and Git tags.
- Significant database changes after the Version 1.0 baseline must follow the
  Software Change Management process.