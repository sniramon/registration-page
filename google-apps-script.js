// ─────────────────────────────────────────────────────────────────────────────
// Google Apps Script — Event Registration Handler
//
// SETUP INSTRUCTIONS:
//   1. Go to https://script.google.com and create a New Project
//   2. Delete the default code and paste this entire file
//   3. Click the floppy-disk icon to Save
//   4. Click "Deploy" → "New deployment"
//      - Type: Web app
//      - Execute as: Me
//      - Who has access: Anyone
//   5. Click "Deploy" and copy the Web App URL
//   6. Paste that URL into index.html where it says PASTE_YOUR_SCRIPT_URL_HERE
// ─────────────────────────────────────────────────────────────────────────────

const SPREADSHEET_ID = '1HR4gcjNGrKA8S1I6--enI11rK5H9TCNecwOzq8z3h8MRE'; // ← replace this
const SHEET_NAME     = 'Registrations';

function doPost(e) {
  try {
    Logger.log('doPost received. postData: ' + JSON.stringify(e.postData));

    const raw  = e.postData && e.postData.contents;
    Logger.log('raw body: ' + raw);

    const data = JSON.parse(raw);
    Logger.log('parsed data: ' + JSON.stringify(data));

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('spreadsheet opened: ' + ss.getName());

    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet + header row if it doesn't exist yet
    if (!sheet) {
      Logger.log('Sheet not found, creating it.');
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Company',
        'Job Title',
        'Dietary Requirements',
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date().toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' }),
      data.firstName   || '',
      data.lastName    || '',
      data.email       || '',
      data.phone       || '',
      data.company     || '',
      data.jobTitle    || '',
      data.dietary     || '',
    ]);
    Logger.log('Row appended successfully.');

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('ERROR: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: test by visiting the script URL in a browser
function doGet() {
  return ContentService
    .createTextOutput('Registration endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
