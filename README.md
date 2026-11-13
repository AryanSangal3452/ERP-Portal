# Northstar Academy ERP portal

A responsive, browser-based school ERP prototype. Open `index.html` directly in a modern browser; it does not require a build step or package installation.

## Demo sign-in

Select a school and enter a login ID (or the matching email). The portal selects the dashboard based on the login ID. The password for all three demo accounts is `northstar123`.

| Role | Login ID | Email |
| --- | --- | --- |
| Student | `NS2401` | `student@northstar.edu` |
| Teacher | `FAC-018` | `teacher@northstar.edu` |
| Principal | `ADMIN-001` | `principal@northstar.edu` |

The school selector includes Northstar Academy West Campus, Northstar Academy East Campus, and Greenfield Public School Main Campus. Each school's saved records, assignments, attendance, reports, and settings are stored separately in this browser.

## Included

- School overview dashboard with attendance, schedule, finance, and announcement summaries.
- Student, faculty, attendance, academics, timetable, fees, transport, and announcements workspaces.
- Add, edit, delete, search, and status-filter records in the workspace tables.
- Mark attendance in bulk and record fee payments.
- Export workspace records and generated report summaries as CSV.
- School profile settings, responsive navigation, and keyboard shortcut (`Ctrl/Cmd + K`) for search.

## Data behavior

The portal loads illustrative sample records and saves browser edits in `localStorage` on the current device and browser. The role login is a local demo flow, not secure authentication. Clearing browser site data removes saved changes. There is no shared database, server-side backup, or multi-user synchronization in this standalone version; deploy a backend and access controls before using it with real student or staff information.
