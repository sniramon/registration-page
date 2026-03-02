# Event Registration Page

A clean, single-file event registration page that saves submissions directly to Google Sheets — no backend server required.

**Live demo:** *(add your GitHub Pages URL here after deploying)*

![Preview](https://img.shields.io/badge/HTML-Single%20File-blue) ![Backend](https://img.shields.io/badge/Backend-Google%20Sheets-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## Features

- Single `index.html` — no build tools, no dependencies
- Submissions saved to Google Sheets via Google Apps Script
- Duplicate email detection — blocks re-registration
- Client-side form validation with inline error messages
- Fully responsive (mobile-friendly)
- Agenda section with colour-coded session tags
- Success confirmation screen after registration

---

## Quick Start

### 1. Fork or clone this repo

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 2. Set up Google Sheets + Apps Script

1. Create a new [Google Sheet](https://sheets.google.com)
2. Inside the sheet, click **Extensions → Apps Script**
3. Delete the default code and paste the contents of [`google-apps-script.js`](google-apps-script.js)
4. Click **Save**
5. Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, authorise when prompted, then **copy the Web App URL**

### 3. Update `index.html` with your script URL

Open `index.html` and find line ~495:

```js
const SCRIPT_URL = 'PASTE_YOUR_SCRIPT_URL_HERE';
```

Replace the placeholder with your copied Web App URL.

### 4. Customise the event details

Search for the following in `index.html` and update as needed:

| What to change | Where to find it |
|---|---|
| Event title | `<h1>` tag in the hero section |
| Co-brand names | `.brand-badge` spans |
| Event date & time | `.meta-item` spans in the hero |
| Agenda items | `<ul class="agenda-list">` |
| Dietary options | `<select id="dietary">` |
| Footer text | `<footer>` tag |

### 5. Deploy to GitHub Pages

1. Push your updated files to GitHub
2. Go to your repo → **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch → **/ (root)** → click **Save**
5. Your page will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## How It Works

```
User fills form → browser checks for duplicate email (GET)
                       ↓
              Email already exists? → show error, stop
                       ↓
              New email → POST data to Apps Script
                       ↓
              Apps Script appends row to Google Sheet
                       ↓
              Show success message to user
```

- **Duplicate check** — a GET request queries the sheet for the email before submitting
- **Data submission** — a POST request (with `mode: no-cors`) sends the form data
- **Google Sheets** — a "Registrations" tab is auto-created on first submission with bold, frozen headers

---

## Project Structure

```
├── index.html            # The entire front-end (HTML + CSS + JS)
├── google-apps-script.js # Reference copy of the Apps Script code
└── README.md             # This file
```

> `google-apps-script.js` is a local reference copy only. The actual running code lives inside your Google Apps Script editor.

---

## Customisation Tips

**Change required fields** — find the validation block in the `<script>` section:
```js
const v1 = setError('firstName', 'firstNameErr', fn === '');
```
Add or remove `setError` calls to match your required fields.

**Add a seat limit** — in the Apps Script `doPost`, count existing rows before appending:
```js
if (sheet.getLastRow() - 1 >= SEAT_LIMIT) {
  return ContentService.createTextOutput(JSON.stringify({ result: 'full' }))...
}
```

**Change timezone** — find `Asia/Bangkok` in `google-apps-script.js` and replace with your timezone (e.g. `America/New_York`).

---

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no frameworks)
- **Backend:** Google Apps Script (serverless)
- **Database:** Google Sheets
- **Hosting:** GitHub Pages (or any static host)

---

## License

MIT — free to use and adapt for your own events.
# registration-page
