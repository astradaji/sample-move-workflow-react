# NVL Move Workflow Prototype

A React-based prototype for the National Van Lines quote workflow.

## Features

- Multi-step move quote workflow
- Progress tracker with moving truck
- Card-based move type selection
- Conditional international fields
- Review and preview screen
- Dummy estimate and thank-you flow
- URL-driven move type selection
- ZIP validation with production server endpoint support
- Responsive UI

## Local Development

```bash
npm install
npm start
```

Application URL:

```text
http://localhost:3001/
```

## Build

```bash
npm run build
```

Production files will be generated in:

```text
dist/
```

## ZIP Validation

For the easiest ZIP validation setup, create a Smarty account and add your website key to `.env`:

```text
VITE_SMARTY_KEY=your-smarty-website-key
```

When `VITE_SMARTY_KEY` exists, the app calls:

```text
https://us-zipcode.api.smarty.com/lookup?key=...&zipcode=60601
```

For a backend/proxy setup, use this instead:

```text
VITE_ZIP_VALIDATION_URL=https://your-site.com/wp-json/nvl/v1/validate-zip
```

React will call it like:

```text
https://your-site.com/wp-json/nvl/v1/validate-zip?zip=60601
```

Expected JSON response:

```json
{
  "valid": true,
  "city": "Chicago",
  "state": "IL"
}
```

For invalid ZIPs:

```json
{
  "valid": false,
  "message": "Please enter a valid U.S. ZIP code."
}
```

If both `VITE_SMARTY_KEY` and `VITE_ZIP_VALIDATION_URL` are missing, the app will not call any fallback ZIP API.

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

## Move Size Behavior

The `I have ...` move-size step is shown only for household/residential-style moves where item or bedroom count is useful for estimating.

It is hidden for service/business move types such as packing, storage, logistics, warehouse, office, and other corporate services. When a user switches to a move type that does not need size, the app clears the previous `move_size` value so stale bedroom data is not sent in the payload.

## Estimate Classification Flow

The workflow now separates move types into estimate-capable and non-estimate-capable paths.

Estimate-capable move types continue through the normal estimate flow:

```text
Preview -> Submit Workflow -> Loading -> Dummy Estimate -> Submit Quote Request -> Thank You
```

Estimate-capable move types are limited to the three residence-style options:

```text
a house -> Household Movers
a condo -> Condo Moves
an apartment -> Apartment Moves
```

Service/business/custom move types skip the estimate and go directly to the confirmation flow:

```text
Preview -> Submit Request -> Help is on the way!
```

Non-estimate move types include `none of these`/specialty moves plus packing, storage, commercial, office, warehouse, logistics, and all other service/custom move types.

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

## Project Structure

```text
src/
main.jsx
styles.css
zipValidation.js
```

## Technology Stack

- React
- JavaScript
- CSS
- Vite
