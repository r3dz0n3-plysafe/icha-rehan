/**
 * Backend ucapan ("Your Best Wishes") — Google Apps Script + Google Sheets.
 *
 * Setup:
 * 1. Buat Google Sheet baru. Biarkan kosong (header dibuat otomatis).
 * 2. Extensions > Apps Script, tempel seluruh isi file ini, simpan.
 * 3. Deploy > New deployment > type "Web app"
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Salin URL web app (…/exec) ke NEXT_PUBLIC_WISHES_URL.
 *
 * Setiap kali kode ini diubah, buat "New deployment" / "Manage deployments > Edit > New version".
 * Untuk moderasi, hapus saja barisnya di Sheet.
 */

var SHEET_NAME = "Wishes";
var MAX_NAME = 100;
var MAX_TEXT = 500;
var MAX_RETURN = 200;

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["id", "timestamp", "name", "text"]);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// GET -> { wishes: [{ id, name, text, ts }] } terbaru di atas
function doGet() {
  var sheet = getSheet_();
  var last = sheet.getLastRow();
  if (last < 2) return json_({ wishes: [] });
  var rows = sheet.getRange(2, 1, last - 1, 4).getValues();
  var wishes = rows
    .map(function (r) {
      return { id: String(r[0]), ts: new Date(r[1]).getTime(), name: String(r[2]), text: String(r[3]) };
    })
    .reverse()
    .slice(0, MAX_RETURN);
  return json_({ wishes: wishes });
}

// POST (text/plain, body JSON) { name, text } -> { ok, wish }
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    var name = String(data.name || "").trim().slice(0, MAX_NAME);
    var text = String(data.text || "").trim().slice(0, MAX_TEXT);
    if (!name || text.length < 2) return json_({ ok: false, error: "invalid" });

    // Cegah formula injection di Sheet
    var safe = function (s) {
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };

    var now = new Date();
    var id = Utilities.getUuid();
    getSheet_().appendRow([id, now, safe(name), safe(text)]);
    return json_({ ok: true, wish: { id: id, ts: now.getTime(), name: name, text: text } });
  } catch (err) {
    return json_({ ok: false, error: "bad_request" });
  } finally {
    lock.releaseLock();
  }
}
