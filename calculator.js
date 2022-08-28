
import * as constants from './constants.js'

window.addEventListener("load", load, false);

function load() {

	constants.setupUpdateTableInputElements(updateTable);
	createTable();

	function createTable() {

		let tableDiv = document.createElement("div");
		tableDiv.className = "tableHeader";
		let table = document.createElement("table");

		let headerRow = createTableRow(table);
		createTableHeader(headerRow, "Monster ID");
		createTableHeader(headerRow, "Monster Name");
		createTableHeader(headerRow, "Area (Level)");
		createTableHeader(headerRow, "Defense");
		createTableHeader(headerRow, "N CTH", "Chance to Hit % against this Normal monster.");
		createTableHeader(headerRow, "C CTH", "Chance to Hit % against this Champion monster.");
		createTableHeader(headerRow, "U CTH", "Chance to Hit % against this Unique monster.");
		createTableHeader(headerRow, "(T)N CTH", "Chance to Hit % against this Normal monster in a Terror Zone.");
		createTableHeader(headerRow, "(T)C CTH", "Chance to Hit % against this Champion monster in a Terror Zone.");
		createTableHeader(headerRow, "(T)U CTH", "Chance to Hit % against this Unique monster in a Terror Zone.");

		for (const d of constants.data) {
			let row = createTableRow(table);
			createTableCell(row, d.monId);
			createTableCell(row, d.monName);
			createTableCell(row, d.levelName + " (" + d.areaLevel + ")");
			createTableCell(row, d.baseDef);
			let origNormCTHCell = createEmptyTableCell(row);
			let origChampCTHCell = createEmptyTableCell(row);
			let origUniCTHCell = createEmptyTableCell(row);
			let terrNormCTHCell = createEmptyTableCell(row);
			let terrChampCTHCell = createEmptyTableCell(row);
			let terrUniCTHCell = createEmptyTableCell(row);
			d.setTableCells(origNormCTHCell, origChampCTHCell, origUniCTHCell, terrNormCTHCell, terrChampCTHCell, terrUniCTHCell);
		}

		updateTable();

		tableDiv.appendChild(table);
		constants.container.TABLE.appendChild(tableDiv);

	}

	function updateTable() {

		let playerLevel = parseInt(constants.number.YOUR_LEVEL.value);
		let playerAR = parseInt(constants.number.YOUR_AR.value);

		for (const d of constants.data) {
			d.update(playerLevel, playerAR);
		}

	}
	

}

function trun(number) {
	if (number == -0) number = 0;
	return number >= 0 ? Math.floor(number) : Math.ceil(number);
}

/**
 * https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript/33928558#33928558
 */
 function copyToClipboard(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		// Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
		return window.clipboardData.setData("Text", text);

	}
	else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
		var textarea = document.createElement("textarea");
		textarea.textContent = text;
		textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
		document.body.appendChild(textarea);
		textarea.select();
		try {
			return document.execCommand("copy");  // Security exception may be thrown by some browsers.
		}
		catch (ex) {
			console.warn("Copy to clipboard failed.", ex);
			return prompt("Copy to clipboard: Ctrl+C, Enter", text);
		}
		finally {
			document.body.removeChild(textarea);
		}
	}
}

function hideElement(element) {
	element.style.display = "none";
}

function unhideElement(element) {
	element.style.display = "initial";
}

function isElementHidden(element) {
	return !(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function clear(select) {
	let options = select.options;
	let i, L = options.length - 1;
	for (i = L; i >= 0; i--) {
		select.remove(i);
	}
}

function createOption(value) {
	let option = document.createElement("option");
	if (value == "divider") option.disabled = true;
	else option.setAttribute("value", value);
	option.text = value == "divider" ? "───────────" : value;
	return option;
}

function createTableRow(table) {
	let row = document.createElement("tr");
	table.appendChild(row);
	return row;
}

function createTableCell(tableRow, value) {
	let cell = document.createElement("td");
	cell.innerHTML = value;
	tableRow.appendChild(cell);
	return cell;
}

function createEmptyTableCell(tableRow) {
	let cell = document.createElement("td");
	tableRow.appendChild(cell);
	return cell;
}

function createTableHeader(tableRow, value, tooltip) {
	let header = document.createElement("th");
	header.innerHTML = value;
	if (tooltip !== undefined) header.title = tooltip;
	tableRow.appendChild(header);
	return header;
}

function addTableRow(table, IAS, frame) {

	let tableRow = document.createElement("tr");

	let tdIAS = document.createElement("td");
	tdIAS.innerHTML = IAS;

	let tdFrame = document.createElement("td");
	tdFrame.innerHTML = frame;

	tableRow.appendChild(tdIAS);
	tableRow.appendChild(tdFrame);

	table.appendChild(tableRow);
}

function addTableHeader(table, variableLabel) {

	let tableRow = document.createElement("tr");

	let thVariableLabel = document.createElement("th");
	thVariableLabel.innerHTML = variableLabel;

	let tdFPA = document.createElement("th");
	tdFPA.innerHTML = "FPA";
	tdFPA.title = "Frames Per Animation (not Attack/Hit)";
	tdFPA.className = "hoverable";

	tableRow.appendChild(thVariableLabel);
	tableRow.appendChild(tdFPA);

	table.appendChild(tableRow);
}
