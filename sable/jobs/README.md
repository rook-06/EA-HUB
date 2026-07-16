# Job Tracking System

All jobs are stored as individual JSON files under `hourly/` or `piecework/`. The `index.json` file is a flat list of all jobs for quick lookup.

---

## Directory Structure

```
jobs/
  hourly/        — Jobs billed by the hour
  piecework/     — Jobs billed at a flat/negotiated price
  index.json     — Master index of all jobs
```

---

## Job ID Format

`JOB-YYYY-###` — year + 3-digit sequence number. Example: `JOB-2026-001`

---

## Hourly Job Schema

```json
{
  "id": "JOB-2026-001",
  "type": "hourly",
  "business": "Above the Norm | Dametime Tattoos | Dametime Marketing",
  "status": "quoted | scheduled | in_progress | completed | invoiced | paid",
  "client": {
    "name": "",
    "phone": "",
    "email": "",
    "address": ""
  },
  "job": {
    "description": "",
    "location": "",
    "date": "",
    "hours": 0,
    "hourly_rate": 0,
    "total": 0
  },
  "notes": ""
}
```

## Piecework Job Schema

```json
{
  "id": "JOB-2026-002",
  "type": "piecework",
  "business": "Above the Norm | Dametime Tattoos | Dametime Marketing",
  "status": "quoted | scheduled | in_progress | completed | invoiced | paid",
  "client": {
    "name": "",
    "phone": "",
    "email": "",
    "address": ""
  },
  "job": {
    "description": "",
    "location": "",
    "date": "",
    "price": 0
  },
  "notes": ""
}
```

---

## Searching

Ask Sable to search by any field: client name, business, status, date, location, job type, or description keyword.

Examples:
- "Sable, pull up all completed Above the Norm jobs"
- "Sable, find the job for [client name]"
- "Sable, show me all unpaid jobs"
- "Sable, how many hours did I log in June?"
