# Security Specification - Rangpur Govt. Girls' High School CMS

## Data Invariants
1. Only authenticated administrators can write to any collection.
2. Every document must have a `pdsId` or equivalent unique identifier for staff/teachers.
3. Every notice must have a valid date and title.
4. Images/Files must be valid URLs (strings).

## The "Dirty Dozen" Payloads (Denial Tests)
1. **Unauth Create**: Trying to add a notice without being logged in.
2. **Identity Spoofing**: Logged in user A trying to update a teacher record with an invalid PDS ID.
3. **Ghost Fields**: Adding a `isAdmin: true` field to a user profile (if it existed).
4. **ID Poisoning**: Injecting a 1MB string as a document ID.
5. **Type Poisoning**: Sending a number for a "title" field.
6. **Immortal Field Breach**: Trying to change the `createdAt` timestamp of a notice.
7. **Cross-Collection Write**: Trying to write to a collection not defined in the rules.
8. **Resource Exhaustion**: Sending a 1MB string for a category name.
9. **Query Scraping**: Authenticated user trying to list all users (if sensitive).
10. **State Skipping**: (Not applicable yet, but status transitions if added).
11. **Relational Orphan**: Creating a sub-doc for non-existent parent (not applicable for flat structure yet).
12. **PII Leak**: Unauthorized user trying to read internal contact details.

## The Test Runner
(Will be implemented in `firestore.rules.test.ts` if needed, but primarily verified by rule logic)
