# NVL Move Workflow Prototype

A React-based prototype for the National Van Lines quote workflow.

## Features

- Multi-step move quote workflow
- Progress tracker
- Card-based move type selection
- Conditional international fields
- Review & preview screen
- URL-driven move type selection
- Responsive UI

---

## Local Development

```bash


npm install
npm start
```

Application URL:

```text
http://localhost:3001/
```

---

## Build

```bash
npm run build
```

Production files will be generated in:

```text
dist/
```

---

## Supported Move Types

| Move Type | URL |
|------------|------------|
| International | `/?move_type=international` |
| Apartment Moves | `/?move_type=apartment_moves` |
| Condo Moves | `/?move_type=condo_moves` |
| Senior Moves | `/?move_type=senior_moves` |
| Local Moves | `/?move_type=local_moves` |
| Packing Services | `/?move_type=packing_services` |
| Secure Storage | `/?move_type=secure_storage` |
| Specialty Movers | `/?move_type=specialty_movers` |
| Military Movers | `/?move_type=military_movers` |
| Household Movers | `/?move_type=household_movers` |
| Commercial Movers | `/?move_type=commercial_movers` |
| Cross Country | `/?move_type=cross_country` |
| Coast to Coast | `/?move_type=coast_to_coast` |
| Cross State | `/?move_type=cross_state` |
| Long Haul | `/?move_type=long_haul` |
| Interstate Moving | `/?move_type=interstate_moving` |
| Nationwide Moving | `/?move_type=nationwide_moving` |
| State to State | `/?move_type=state_to_state` |
| Long Distance Relocations | `/?move_type=long_distance_relocations` |
| Employee Relocation | `/?move_type=employee_relocation` |
| Office Relocation | `/?move_type=office_relocation` |
| Warehouse Services | `/?move_type=warehouse_services` |
| Commercial Storage | `/?move_type=commercial_storage` |
| Packing & Unpacking | `/?move_type=packing_unpacking` |
| Specialized Transportation | `/?move_type=specialized_transportation` |
| Logistics | `/?move_type=logistics` |

---

## International Move Behavior

When the URL contains:

```text
/?move_type=international
```

the application:

- Automatically selects International Move
- Enables international workflow
- Displays country-specific fields
- Shows international-only form sections

---

## Project Structure

```text
src/
├── components/
├── pages/
├── assets/
├── styles/
└── App.jsx
```

---

## Technology Stack

- React
- JavaScript
- CSS
- Vite
