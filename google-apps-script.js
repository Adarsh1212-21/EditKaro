const SHEET_ID = '1fCp3I-Lv6FQT75zvs1BrvteW8P1dg3gqRkYOi-QcxSA'; 

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const type = e.parameter.type;

    if (type === 'subscribe') {
   
      let sheet = ss.getSheetByName('Subscriptions');
      if (!sheet) {
        sheet = ss.insertSheet('Subscriptions');
        sheet.appendRow(['Timestamp', 'Email']);
      }
      sheet.appendRow([new Date().toISOString(), e.parameter.email]);

    } else if (type === 'contact') {
      
      let sheet = ss.getSheetByName('Contact Submissions');
      if (!sheet) {
        sheet = ss.insertSheet('Contact Submissions');
        sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Message']);
      }
      sheet.appendRow([
        new Date().toISOString(),
        e.parameter.name,
        e.parameter.email,
        e.parameter.phone,
        e.parameter.service,
        e.parameter.message
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('EditKaro API is running.');
}
