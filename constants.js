
const debug = true;

function calculateCTH(yourLevel, yourAR, monLevel, monDef) {
	return Math.round(Math.max(5, Math.min(95, 100 * 2 * (yourLevel / (yourLevel + monLevel) ) * (yourAR / (yourAR + monDef)))) * 10) / 10;
}

function trun(number) {
	if (number == -0) number = 0;
	return number >= 0 ? Math.floor(number) : Math.ceil(number);
}

const container = {
	TABLE: document.getElementById("tableContainer")
}

const number = {
	YOUR_LEVEL: document.getElementById("yourLevel"),
	YOUR_AR: document.getElementById("yourAR")
}

export function setupInputElement(element, eventListener) {
    if (element.type == "button") {
        element.addEventListener("click", eventListener, false);
    } else {
        element.addEventListener("change", eventListener, false);
        if (element.type == "number") {
            element.onkeydown = function (e) { // only allows the input of numbers, no negative signs
                if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
                    return false;
                }
            }
        }
    }
	return element;
}

export function setupUpdateTableInputElements(eventListener) {
    setupInputElement(number.YOUR_LEVEL, eventListener);
    setupInputElement(number.YOUR_AR, eventListener);
}

export class MonsterEntry {

	constructor(monId, monName, monDef, levelName, areaLevel, monLvlValue) {
		this.monId = monId;
		this.monName = monName;
		this.monDef = monDef;
		this.levelName = levelName;
		this.areaLevel = areaLevel;
		this.monLvlValue = monLvlValue;
		this.baseDef = Math.floor(monDef * monLvlValue / 100);
	}

	setTableCells(origNormCTHCell, origChampCTHCell, origUniCTHCell,
			terrNormCTHCell, terrChampCTHCell, terrUniCTHCell) {
		this.origNormCTHCell = origNormCTHCell;
		this.origChampCTHCell = origChampCTHCell;
		this.origUniCTHCell = origUniCTHCell;
		this.terrNormCTHCell = terrNormCTHCell;
		this.terrChampCTHCell = terrChampCTHCell;
		this.terrUniCTHCell = terrUniCTHCell;
	}

	update(yourLevel, yourAR) {
		this.origNormCTHCell.innerHTML = calculateCTH(yourLevel, yourAR, this.areaLevel, this.baseDef);
		this.origChampCTHCell.innerHTML = calculateCTH(yourLevel, yourAR, this.areaLevel + 2, this.baseDef);
		this.origUniCTHCell.innerHTML = calculateCTH(yourLevel, yourAR, this.areaLevel + 3, this.baseDef);
		this.terrNormCTHCell.innerHTML = calculateCTH(yourLevel, yourAR, Math.min(96, Math.max(this.areaLevel, yourLevel) + 2), this.baseDef);
		this.terrChampCTHCell.innerHTML = calculateCTH(yourLevel, yourAR, Math.min(98, Math.max(this.areaLevel, yourLevel) + 4), this.baseDef);
		this.terrUniCTHCell.innerHTML = calculateCTH(yourLevel, yourAR, Math.min(99, Math.max(this.areaLevel, yourLevel) + 5), this.baseDef);
	}

}

const data = [
	new MonsterEntry("zombie1", "Zombie", 80, "Blood Moor", 67, 1134),
	new MonsterEntry("fallen1", "Fallen", 70, "Blood Moor", 67, 1134),
	new MonsterEntry("quillrat1", "Quill Rat", 80, "Blood Moor", 67, 1134),
	new MonsterEntry("brute1", "Gargantuan Beast", 85, "Cold Plains", 68, 1149),
	new MonsterEntry("corruptrogue1", "Dark Hunter", 95, "Cold Plains", 68, 1149),
	new MonsterEntry("fallenshaman1", "Fallen Shaman", 75, "Cold Plains", 68, 1149),
	new MonsterEntry("cr_lancer1", "Dark Spearwoman", 95, "Cold Plains", 68, 1149),
	new MonsterEntry("fallen2", "Carver", 70, "Dark Wood", 68, 1149),
	new MonsterEntry("corruptrogue2", "Vile Hunter", 95, "Dark Wood", 68, 1149),
	new MonsterEntry("quillrat2", "Spike Fiend", 80, "Dark Wood", 68, 1149),
	new MonsterEntry("cr_lancer2", "Vile Lancer", 95, "Dark Wood", 68, 1149),
	new MonsterEntry("sk_archer1", "Skeleton Archer", 100, "Dark Wood", 68, 1149),
	new MonsterEntry("crownest2", "Blood Hawk Nest", 30, "Black Marsh", 69, 1165),
	new MonsterEntry("skeleton2", "Returned", 100, "Black Marsh", 69, 1165),
	new MonsterEntry("brute2", "Brute", 85, "Black Marsh", 69, 1165),
	new MonsterEntry("goatman2", "Night Clan", 60, "Black Marsh", 69, 1165),
	new MonsterEntry("fallenshaman2", "Carver Shaman", 75, "Black Marsh", 69, 1165),
	new MonsterEntry("cr_archer2", "Vile Archer", 90, "Black Marsh", 69, 1165),
	new MonsterEntry("zombie1", "Zombie", 80, "Den of Evil", 79, 1314),
	new MonsterEntry("brute1", "Gargantuan Beast", 85, "Den of Evil", 79, 1314),
	new MonsterEntry("fallenshaman1", "Fallen Shaman", 75, "Den of Evil", 79, 1314),
	new MonsterEntry("skeleton1", "Skeleton", 100, "Cave Level 1", 77, 1284),
	new MonsterEntry("zombie2", "Hungry Dead", 80, "Cave Level 1", 77, 1284),
	new MonsterEntry("cr_archer1", "Dark Ranger", 90, "Cave Level 1", 77, 1284),
	new MonsterEntry("skeleton1", "Skeleton", 100, "Cave Level 2", 78, 1299),
	new MonsterEntry("zombie2", "Hungry Dead", 80, "Cave Level 2", 78, 1299),
	new MonsterEntry("cr_archer1", "Dark Ranger", 90, "Cave Level 2", 78, 1299),
	new MonsterEntry("skeleton1", "Skeleton", 100, "Burial Grounds", 80, 1329),
	new MonsterEntry("zombie2", "Hungry Dead", 80, "Burial Grounds", 80, 1329),
	new MonsterEntry("skeleton1", "Skeleton", 100, "Crypt", 83, 1374),
	new MonsterEntry("zombie2", "Hungry Dead", 80, "Crypt", 83, 1374),
	new MonsterEntry("skeleton1", "Skeleton", 100, "Mausoleum", 85, 1403),
	new MonsterEntry("zombie2", "Hungry Dead", 80, "Mausoleum", 85, 1403),
	new MonsterEntry("fallen3", "Devilkin", 70, "Tower Cellar Level 1", 75, 1254),
	new MonsterEntry("wraith1", "Ghost", 130, "Tower Cellar Level 1", 75, 1254),
	new MonsterEntry("goatman3", "Blood Clan", 60, "Tower Cellar Level 1", 75, 1254),
	new MonsterEntry("cr_archer3", "Dark Archer", 90, "Tower Cellar Level 1", 75, 1254),
	new MonsterEntry("fallen3", "Devilkin", 70, "Tower Cellar Level 2", 76, 1269),
	new MonsterEntry("wraith1", "Ghost", 130, "Tower Cellar Level 2", 76, 1269),
	new MonsterEntry("goatman3", "Blood Clan", 60, "Tower Cellar Level 2", 76, 1269),
	new MonsterEntry("cr_archer3", "Dark Archer", 90, "Tower Cellar Level 2", 76, 1269),
	new MonsterEntry("fallen3", "Devilkin", 70, "Tower Cellar Level 3", 77, 1284),
	new MonsterEntry("wraith1", "Ghost", 130, "Tower Cellar Level 3", 77, 1284),
	new MonsterEntry("goatman3", "Blood Clan", 60, "Tower Cellar Level 3", 77, 1284),
	new MonsterEntry("cr_archer3", "Dark Archer", 90, "Tower Cellar Level 3", 77, 1284),
	new MonsterEntry("fallen3", "Devilkin", 70, "Tower Cellar Level 4", 78, 1299),
	new MonsterEntry("wraith1", "Ghost", 130, "Tower Cellar Level 4", 78, 1299),
	new MonsterEntry("goatman3", "Blood Clan", 60, "Tower Cellar Level 4", 78, 1299),
	new MonsterEntry("cr_archer3", "Dark Archer", 90, "Tower Cellar Level 4", 78, 1299),
	new MonsterEntry("fallen3", "Devilkin", 70, "Tower Cellar Level 5", 79, 1314),
	new MonsterEntry("wraith1", "Ghost", 130, "Tower Cellar Level 5", 79, 1314),
	new MonsterEntry("goatman3", "Blood Clan", 60, "Tower Cellar Level 5", 79, 1314),
	new MonsterEntry("cr_archer3", "Dark Archer", 90, "Tower Cellar Level 5", 79, 1314),
	new MonsterEntry("fallen4", "Dark One", 70, "Jail Level 1", 71, 1194),
	new MonsterEntry("wraith2", "Wraith", 130, "Jail Level 1", 71, 1194),
	new MonsterEntry("goatman5", "Death Clan", 60, "Jail Level 1", 71, 1194),
	new MonsterEntry("sk_archer3", "Bone Archer", 100, "Jail Level 1", 71, 1194),
	new MonsterEntry("skmage_fire2", "Bone Mage", 90, "Jail Level 1", 71, 1194),
	new MonsterEntry("fallen4", "Dark One", 70, "Jail Level 2", 71, 1194),
	new MonsterEntry("wraith2", "Wraith", 130, "Jail Level 2", 71, 1194),
	new MonsterEntry("goatman5", "Death Clan", 60, "Jail Level 2", 71, 1194),
	new MonsterEntry("sk_archer3", "Bone Archer", 100, "Jail Level 2", 71, 1194),
	new MonsterEntry("skmage_fire2", "Bone Mage", 90, "Jail Level 2", 71, 1194),
	new MonsterEntry("fallen4", "Dark One", 70, "Jail Level 3", 71, 1194),
	new MonsterEntry("wraith2", "Wraith", 130, "Jail Level 3", 71, 1194),
	new MonsterEntry("goatman5", "Death Clan", 60, "Jail Level 3", 71, 1194),
	new MonsterEntry("sk_archer3", "Bone Archer", 100, "Jail Level 3", 71, 1194),
	new MonsterEntry("skmage_ltng2", "Bone Mage", 90, "Jail Level 3", 71, 1194),
	new MonsterEntry("bighead2", "Tainted", 90, "Cathedral", 72, 1209),
	new MonsterEntry("wraith2", "Wraith", 130, "Cathedral", 72, 1209),
	new MonsterEntry("fallenshaman4", "Dark Shaman", 75, "Cathedral", 72, 1209),
	new MonsterEntry("bighead2", "Tainted", 90, "Catacombs Level 1", 72, 1209),
	new MonsterEntry("fallenshaman4", "Dark Shaman", 75, "Catacombs Level 1", 72, 1209),
	new MonsterEntry("fetish1", "Rat Man", 125, "Catacombs Level 1", 72, 1209),
	new MonsterEntry("bighead2", "Tainted", 90, "Catacombs Level 2", 73, 1224),
	new MonsterEntry("fallenshaman4", "Dark Shaman", 75, "Catacombs Level 2", 73, 1224),
	new MonsterEntry("arach1", "Arach", 135, "Catacombs Level 2", 73, 1224),
	new MonsterEntry("zombie3", "Ghoul", 80, "Catacombs Level 3", 73, 1224),
	new MonsterEntry("bighead1", "Afflicted", 90, "Catacombs Level 3", 73, 1224),
	new MonsterEntry("vampire5", "Banished", 100, "Catacombs Level 3", 73, 1224),
	new MonsterEntry("zombie3", "Ghoul", 80, "Catacombs Level 4", 73, 1224),
	new MonsterEntry("bighead1", "Afflicted", 90, "Catacombs Level 4", 73, 1224),
	new MonsterEntry("skeleton2", "Returned", 100, "Tristram", 76, 1269),
	new MonsterEntry("goatman2", "Night Clan", 60, "Tristram", 76, 1269),
	new MonsterEntry("fallenshaman2", "Carver Shaman", 75, "Tristram", 76, 1269),
	new MonsterEntry("sk_archer1", "Skeleton Archer", 100, "Tristram", 76, 1269),
	new MonsterEntry("hellbovine", "Hell Bovine", 80, "Moo Moo Farm", 81, 1344),
	new MonsterEntry("sandleaper1", "Sand Leaper", 130, "Rocky Waste", 75, 1254),
	new MonsterEntry("pantherwoman1", "Huntress", 105, "Rocky Waste", 75, 1254),
	new MonsterEntry("scarab1", "Dung Soldier", 145, "Rocky Waste", 75, 1254),
	new MonsterEntry("vulture1", "Carrion Bird", 85, "Rocky Waste", 75, 1254),
	new MonsterEntry("slinger1", "Slinger", 95, "Rocky Waste", 75, 1254),
	new MonsterEntry("sandleaper2", "Cave Leaper", 130, "Dry Hills", 76, 1269),
	new MonsterEntry("pantherwoman2", "Saber Cat", 105, "Dry Hills", 76, 1269),
	new MonsterEntry("vulture2", "Undead Scavenger", 85, "Dry Hills", 76, 1269),
	new MonsterEntry("slinger5", "Spear Cat", 95, "Dry Hills", 76, 1269),
	new MonsterEntry("crownest3", "Black Vulture Nest", 30, "Far Oasis", 76, 1269),
	new MonsterEntry("sandmaggot1", "Sand Maggot", 115, "Far Oasis", 76, 1269),
	new MonsterEntry("swarm1", "Itchies", 120, "Far Oasis", 76, 1269),
	new MonsterEntry("scarab2", "Sand Warrior", 145, "Far Oasis", 76, 1269),
	new MonsterEntry("vulture2", "Undead Scavenger", 85, "Far Oasis", 76, 1269),
	new MonsterEntry("zombie5", "Plague Bearer", 80, "Lost City", 77, 1284),
	new MonsterEntry("sandraider2", "Marauder", 110, "Lost City", 77, 1284),
	new MonsterEntry("sandleaper3", "Tomb Creeper", 130, "Lost City", 77, 1284),
	new MonsterEntry("pantherwoman3", "Night Tiger", 105, "Lost City", 77, 1284),
	new MonsterEntry("slinger6", "Night Slinger", 95, "Lost City", 77, 1284),
	new MonsterEntry("clawviper2", "Claw Viper", 125, "Valley of Snakes", 77, 1284),
	new MonsterEntry("clawviper3", "Salamander", 125, "Valley of Snakes", 77, 1284),
	new MonsterEntry("mummy3", "Embalmed", 95, "Valley of Snakes", 77, 1284),
	new MonsterEntry("unraveler2", "Guardian", 120, "Valley of Snakes", 77, 1284),
	new MonsterEntry("skeleton4", "Burning Dead", 100, "Sewers Level 1", 74, 1239),
	new MonsterEntry("sandraider1", "Sand Raider", 110, "Sewers Level 1", 74, 1239),
	new MonsterEntry("mummy1", "Dried Corpse", 95, "Sewers Level 1", 74, 1239),
	new MonsterEntry("sk_archer4", "Burning Dead Archer", 100, "Sewers Level 1", 74, 1239),
	new MonsterEntry("skeleton4", "Burning Dead", 100, "Sewers Level 2", 74, 1239),
	new MonsterEntry("sandraider1", "Sand Raider", 110, "Sewers Level 2", 74, 1239),
	new MonsterEntry("mummy1", "Dried Corpse", 95, "Sewers Level 2", 74, 1239),
	new MonsterEntry("sk_archer4", "Burning Dead Archer", 100, "Sewers Level 2", 74, 1239),
	new MonsterEntry("skeleton4", "Burning Dead", 100, "Sewers Level 3", 75, 1254),
	new MonsterEntry("pantherwoman1", "Huntress", 105, "Sewers Level 3", 75, 1254),
	new MonsterEntry("mummy1", "Dried Corpse", 95, "Sewers Level 3", 75, 1254),
	new MonsterEntry("skmage_fire3", "Burning Dead Mage", 90, "Sewers Level 3", 75, 1254),
	new MonsterEntry("sandraider3", "Invader", 110, "Harem Level 2", 78, 1299),
	new MonsterEntry("baboon1", "Dune Beast", 110, "Harem Level 2", 78, 1299),
	new MonsterEntry("sk_archer5", "Horror Archer", 100, "Harem Level 2", 78, 1299),
	new MonsterEntry("blunderbore1", "Blunderbore", 80, "Harem Level 2", 78, 1299),
	new MonsterEntry("skmage_cold4", "Horror Mage", 90, "Harem Level 2", 78, 1299),
	new MonsterEntry("sandraider3", "Invader", 110, "Palace Cellar Level 1", 78, 1299),
	new MonsterEntry("baboon1", "Dune Beast", 110, "Palace Cellar Level 1", 78, 1299),
	new MonsterEntry("sk_archer5", "Horror Archer", 100, "Palace Cellar Level 1", 78, 1299),
	new MonsterEntry("blunderbore1", "Blunderbore", 80, "Palace Cellar Level 1", 78, 1299),
	new MonsterEntry("skmage_fire4", "Horror Mage", 90, "Palace Cellar Level 1", 78, 1299),
	new MonsterEntry("sandraider3", "Invader", 110, "Palace Cellar Level 2", 78, 1299),
	new MonsterEntry("baboon1", "Dune Beast", 110, "Palace Cellar Level 2", 78, 1299),
	new MonsterEntry("sk_archer5", "Horror Archer", 100, "Palace Cellar Level 2", 78, 1299),
	new MonsterEntry("blunderbore1", "Blunderbore", 80, "Palace Cellar Level 2", 78, 1299),
	new MonsterEntry("skmage_pois4", "Horror Mage", 90, "Palace Cellar Level 2", 78, 1299),
	new MonsterEntry("sandraider3", "Invader", 110, "Palace Cellar Level 3", 78, 1299),
	new MonsterEntry("baboon1", "Dune Beast", 110, "Palace Cellar Level 3", 78, 1299),
	new MonsterEntry("sk_archer5", "Horror Archer", 100, "Palace Cellar Level 3", 78, 1299),
	new MonsterEntry("blunderbore1", "Blunderbore", 80, "Palace Cellar Level 3", 78, 1299),
	new MonsterEntry("skmage_ltng4", "Horror Mage", 90, "Palace Cellar Level 3", 78, 1299),
	new MonsterEntry("skeleton5", "Horror", 100, "Stony Tomb Level 1", 85, 1403),
	new MonsterEntry("scarab1", "Dung Soldier", 145, "Stony Tomb Level 1", 85, 1403),
	new MonsterEntry("skmage_ltng3", "Burning Dead Mage", 90, "Stony Tomb Level 1", 85, 1403),
	new MonsterEntry("mummy2", "Decayed", 95, "Halls of the Dead Level 1", 79, 1314),
	new MonsterEntry("unraveler1", "Hollow One", 120, "Halls of the Dead Level 1", 79, 1314),
	new MonsterEntry("batdemon1", "Desert Wing", 110, "Halls of the Dead Level 1", 79, 1314),
	new MonsterEntry("slinger2", "Spear Cat", 95, "Halls of the Dead Level 1", 79, 1314),
	new MonsterEntry("mummy2", "Decayed", 95, "Halls of the Dead Level 2", 81, 1344),
	new MonsterEntry("unraveler1", "Hollow One", 120, "Halls of the Dead Level 2", 81, 1344),
	new MonsterEntry("batdemon1", "Desert Wing", 110, "Halls of the Dead Level 2", 81, 1344),
	new MonsterEntry("slinger2", "Spear Cat", 95, "Halls of the Dead Level 2", 81, 1344),
	new MonsterEntry("clawviper2", "Claw Viper", 125, "Claw Viper Temple Level 1", 82, 1358),
	new MonsterEntry("clawviper3", "Salamander", 125, "Claw Viper Temple Level 1", 82, 1358),
	new MonsterEntry("mummy3", "Embalmed", 95, "Claw Viper Temple Level 1", 82, 1358),
	new MonsterEntry("unraveler2", "Guardian", 120, "Claw Viper Temple Level 1", 82, 1358),
	new MonsterEntry("skeleton5", "Horror", 100, "Stony Tomb Level 2", 85, 1403),
	new MonsterEntry("scarab1", "Dung Soldier", 145, "Stony Tomb Level 2", 85, 1403),
	new MonsterEntry("skmage_pois3", "Burning Dead Mage", 90, "Stony Tomb Level 2", 85, 1403),
	new MonsterEntry("mummy2", "Decayed", 95, "Halls of the Dead Level 3", 82, 1358),
	new MonsterEntry("unraveler1", "Hollow One", 120, "Halls of the Dead Level 3", 82, 1358),
	new MonsterEntry("batdemon1", "Desert Wing", 110, "Halls of the Dead Level 3", 82, 1358),
	new MonsterEntry("slinger2", "Spear Cat", 95, "Halls of the Dead Level 3", 82, 1358),
	new MonsterEntry("clawviper2", "Claw Viper", 125, "Claw Viper Temple Level 2", 83, 1374),
	new MonsterEntry("clawviper3", "Salamander", 125, "Claw Viper Temple Level 2", 83, 1374),
	new MonsterEntry("mummy3", "Embalmed", 95, "Claw Viper Temple Level 2", 83, 1374),
	new MonsterEntry("unraveler2", "Guardian", 120, "Claw Viper Temple Level 2", 83, 1374),
	new MonsterEntry("sandmaggot1", "Sand Maggot", 115, "Maggot Lair Level 1", 84, 1389),
	new MonsterEntry("sandmaggot2", "Rock Worm", 115, "Maggot Lair Level 1", 84, 1389),
	new MonsterEntry("swarm2", "Black Locusts", 120, "Maggot Lair Level 1", 84, 1389),
	new MonsterEntry("scarab2", "Sand Warrior", 145, "Maggot Lair Level 1", 84, 1389),
	new MonsterEntry("scarab3", "Scarab", 145, "Maggot Lair Level 1", 84, 1389),
	new MonsterEntry("sandmaggot1", "Sand Maggot", 115, "Maggot Lair Level 2", 84, 1389),
	new MonsterEntry("sandmaggot2", "Rock Worm", 115, "Maggot Lair Level 2", 84, 1389),
	new MonsterEntry("swarm2", "Black Locusts", 120, "Maggot Lair Level 2", 84, 1389),
	new MonsterEntry("scarab2", "Sand Warrior", 145, "Maggot Lair Level 2", 84, 1389),
	new MonsterEntry("scarab3", "Scarab", 145, "Maggot Lair Level 2", 84, 1389),
	new MonsterEntry("sandmaggot1", "Sand Maggot", 115, "Maggot Lair Level 3", 85, 1403),
	new MonsterEntry("sandmaggot2", "Rock Worm", 115, "Maggot Lair Level 3", 85, 1403),
	new MonsterEntry("swarm2", "Black Locusts", 120, "Maggot Lair Level 3", 85, 1403),
	new MonsterEntry("scarab2", "Sand Warrior", 145, "Maggot Lair Level 3", 85, 1403),
	new MonsterEntry("scarab3", "Scarab", 145, "Maggot Lair Level 3", 85, 1403),
	new MonsterEntry("wraith4", "Apparition", 130, "Tal Rasha's Tomb", 80, 1329),
	new MonsterEntry("scarab4", "Steel Weevil", 145, "Tal Rasha's Tomb", 80, 1329),
	new MonsterEntry("mummy4", "Preserved Dead", 95, "Tal Rasha's Tomb", 80, 1329),
	new MonsterEntry("unraveler3", "Unraveler", 120, "Tal Rasha's Tomb", 80, 1329),
	new MonsterEntry("vampire1", "Ghoul Lord", 100, "Tal Rasha's Tomb", 80, 1329),
	new MonsterEntry("blunderbore2", "Gorbelly", 80, "Tal Rasha's Tomb", 80, 1329),
	new MonsterEntry("wraith3", "Specter", 130, "Arcane Sanctuary", 79, 1314),
	new MonsterEntry("goatman4", "Hell Clan", 60, "Arcane Sanctuary", 79, 1314),
	new MonsterEntry("vampire1", "Ghoul Lord", 100, "Arcane Sanctuary", 79, 1314),
	new MonsterEntry("baboon3", "Jungle Hunter", 110, "Spider Forest", 79, 1314),
	new MonsterEntry("mosquito1", "Sucker", 95, "Spider Forest", 79, 1314),
	new MonsterEntry("thornhulk1", "Thorned Hulk", 140, "Spider Forest", 79, 1314),
	new MonsterEntry("fetish2", "Fetish", 125, "Spider Forest", 79, 1314),
	new MonsterEntry("fetishblow2", "Fetish", 110, "Spider Forest", 79, 1314),
	new MonsterEntry("foulcrow4", "Cloud Stalker", 120, "Spider Forest", 79, 1314),
	new MonsterEntry("fetish3", "Flayer", 125, "Flayer Jungle", 80, 1329),
	new MonsterEntry("fetishshaman3", "Flayer Shaman", 100, "Flayer Jungle", 80, 1329),
	new MonsterEntry("fetish4", "Soul Killer", 125, "Flayer Jungle", 80, 1329),
	new MonsterEntry("fetishshaman4", "Soul Killer Shaman", 100, "Flayer Jungle", 80, 1329),
	new MonsterEntry("vulture4", "Winged Nightmare", 85, "Flayer Jungle", 80, 1329),
	new MonsterEntry("frogdemon3", "Slime Prince", 95, "Flayer Jungle", 80, 1329),
	new MonsterEntry("fetishblow3", "Flayer", 110, "Flayer Jungle", 80, 1329),
	new MonsterEntry("baboon4", "Doom Ape", 110, "Lower Kurast", 80, 1329),
	new MonsterEntry("sandleaper4", "Tree Lurker", 130, "Lower Kurast", 80, 1329),
	new MonsterEntry("vulture3", "Hell Buzzard", 85, "Lower Kurast", 80, 1329),
	new MonsterEntry("zealot1", "Zakarumite", 80, "Lower Kurast", 80, 1329),
	new MonsterEntry("thornhulk3", "Thrasher", 140, "Kurast Bazaar", 81, 1344),
	new MonsterEntry("swarm4", "Hell Swarm", 120, "Kurast Bazaar", 81, 1344),
	new MonsterEntry("zealot2", "Faithful", 80, "Kurast Bazaar", 81, 1344),
	new MonsterEntry("cantor1", "Sexton", 75, "Kurast Bazaar", 81, 1344),
	new MonsterEntry("cantor3", "Heirophant", 75, "Travincal", 82, 1358),
	new MonsterEntry("vampire2", "Night Lord", 100, "Travincal", 82, 1358),
	new MonsterEntry("arach3", "Poison Spinner", 135, "Spider Cavern", 79, 1314),
	new MonsterEntry("arach4", "Flame Spider", 135, "Spider Cavern", 79, 1314),
	new MonsterEntry("batdemon2", "Fiend", 110, "Spider Cavern", 79, 1314),
	new MonsterEntry("sandmaggot4", "Giant Lamprey", 115, "Spider Cavern", 79, 1314),
	new MonsterEntry("mummy4", "Preserved Dead", 95, "Sewers Level 1", 85, 1403),
	new MonsterEntry("mosquito2", "Feeder", 95, "Sewers Level 1", 85, 1403),
	new MonsterEntry("batdemon3", "Gloombat", 110, "Sewers Level 1", 85, 1403),
	new MonsterEntry("unraveler4", "Horadrim Ancient", 120, "Sewers Level 1", 85, 1403),
	new MonsterEntry("bonefetish4", "Undead Soul Killer", 135, "Sewers Level 1", 85, 1403),
	new MonsterEntry("mummy4", "Preserved Dead", 95, "Sewers Level 2", 85, 1403),
	new MonsterEntry("unraveler4", "Horadrim Ancient", 120, "Sewers Level 2", 85, 1403),
	new MonsterEntry("mosquito4", "Blood Wing", 95, "Sewers Level 2", 85, 1403),
	new MonsterEntry("frogdemon3", "Slime Prince", 95, "Sewers Level 2", 85, 1403),
	new MonsterEntry("bonefetish4", "Undead Soul Killer", 135, "Sewers Level 2", 85, 1403),
	new MonsterEntry("brute5", "Wailing Beast", 85, "Ruined Temple", 85, 1403),
	new MonsterEntry("corruptrogue5", "Flesh Hunter", 95, "Ruined Temple", 85, 1403),
	new MonsterEntry("arach5", "Spider Magus", 135, "Ruined Temple", 85, 1403),
	new MonsterEntry("vampire2", "Night Lord", 100, "Ruined Temple", 85, 1403),
	new MonsterEntry("brute5", "Wailing Beast", 85, "Disused Fane", 85, 1403),
	new MonsterEntry("corruptrogue5", "Flesh Hunter", 95, "Disused Fane", 85, 1403),
	new MonsterEntry("arach5", "Spider Magus", 135, "Disused Fane", 85, 1403),
	new MonsterEntry("vampire2", "Night Lord", 100, "Disused Fane", 85, 1403),
	new MonsterEntry("mummy5", "Cadaver", 95, "Durance of Hate Level 1", 83, 1374),
	new MonsterEntry("vampire3", "Dark Lord", 100, "Durance of Hate Level 1", 83, 1374),
	new MonsterEntry("blunderbore3", "Mauler", 80, "Durance of Hate Level 1", 83, 1374),
	new MonsterEntry("bonefetish5", "Undead Stygian Doll", 135, "Durance of Hate Level 1", 83, 1374),
	new MonsterEntry("mummy5", "Cadaver", 95, "Durance of Hate Level 2", 83, 1374),
	new MonsterEntry("vampire3", "Dark Lord", 100, "Durance of Hate Level 2", 83, 1374),
	new MonsterEntry("blunderbore3", "Mauler", 80, "Durance of Hate Level 2", 83, 1374),
	new MonsterEntry("bonefetish5", "Undead Stygian Doll", 135, "Durance of Hate Level 2", 83, 1374),
	new MonsterEntry("vampire4", "Blood Lord", 100, "Durance of Hate Level 3", 83, 1374),
	new MonsterEntry("sandleaper5", "Razor Pit Demon", 130, "Outer Steppes", 82, 1358),
	new MonsterEntry("vilemother1", "Flesh Spawner", 80, "Outer Steppes", 82, 1358),
	new MonsterEntry("fingermage1", "Groper", 120, "Outer Steppes", 82, 1358),
	new MonsterEntry("regurgitator1", "Corpulent", 95, "Outer Steppes", 82, 1358),
	new MonsterEntry("doomknight1", "Doom Knight", 115, "Outer Steppes", 82, 1358),
	new MonsterEntry("megademon3", "Venom Lord", 115, "Outer Steppes", 82, 1358),
	new MonsterEntry("willowisp3", "Burning Soul", 115, "Plains of Despair", 83, 1374),
	new MonsterEntry("vilemother1", "Flesh Spawner", 80, "Plains of Despair", 83, 1374),
	new MonsterEntry("fingermage1", "Groper", 120, "Plains of Despair", 83, 1374),
	new MonsterEntry("regurgitator1", "Corpulent", 95, "Plains of Despair", 83, 1374),
	new MonsterEntry("doomknight1", "Doom Knight", 115, "Plains of Despair", 83, 1374),
	new MonsterEntry("megademon3", "Venom Lord", 115, "Plains of Despair", 83, 1374),
	new MonsterEntry("sandmaggot5", "World Killer", 115, "River of Flame", 85, 1403),
	new MonsterEntry("blunderbore4", "Urdar", 80, "River of Flame", 85, 1403),
	new MonsterEntry("vilemother3", "Grotesque", 80, "River of Flame", 85, 1403),
	new MonsterEntry("fingermage2", "Strangler", 120, "River of Flame", 85, 1403),
	new MonsterEntry("regurgitator3", "Maw Fiend", 95, "River of Flame", 85, 1403),
	new MonsterEntry("doomknight2", "Abyss Knight", 115, "River of Flame", 85, 1403),
	new MonsterEntry("megademon2", "Pit Lord", 115, "River of Flame", 85, 1403),
	new MonsterEntry("minion1", "Minionexp", 100, "Bloody Foothills", 80, 1329),
	new MonsterEntry("deathmauler1", "Death Mauler1", 95, "Bloody Foothills", 80, 1329),
	new MonsterEntry("overseer1", "Over Seer", 90, "Bloody Foothills", 80, 1329),
	new MonsterEntry("imp1", "Imp1", 110, "Bloody Foothills", 80, 1329),
	new MonsterEntry("sk_archer6", "Burning Dead Archer", 100, "Bloody Foothills", 80, 1329),
	new MonsterEntry("quillrat6", "Quill Rat", 80, "Bloody Foothills", 80, 1329),
	new MonsterEntry("foulcrow5", "Foul Crow", 125, "Bloody Foothills", 80, 1329),
	new MonsterEntry("vulture5", "Carrion Bird", 85, "Bloody Foothills", 80, 1329),
	new MonsterEntry("thornhulk5", "Thorned Hulk", 140, "Bloody Foothills", 80, 1329),
	new MonsterEntry("slinger7", "Slinger", 95, "Bloody Foothills", 80, 1329),
	new MonsterEntry("imp3", "Imp3", 110, "Frigid Highlands", 81, 1344),
	new MonsterEntry("siegebeast1", "Siege Beast", 90, "Frigid Highlands", 81, 1344),
	new MonsterEntry("minion2", "Slayerexp", 100, "Frigid Highlands", 81, 1344),
	new MonsterEntry("deathmauler2", "Death Mauler2", 95, "Frigid Highlands", 81, 1344),
	new MonsterEntry("sk_archer6", "Burning Dead Archer", 100, "Frigid Highlands", 81, 1344),
	new MonsterEntry("cr_archer6", "Vile Archer", 90, "Frigid Highlands", 81, 1344),
	new MonsterEntry("cr_lancer6", "Vile Lancer", 95, "Frigid Highlands", 81, 1344),
	new MonsterEntry("slinger8", "Slinger", 95, "Frigid Highlands", 81, 1344),
	new MonsterEntry("blunderbore5", "Blunderbore", 80, "Frigid Highlands", 81, 1344),
	new MonsterEntry("overseer2", "Lasher", 90, "Frigid Highlands", 81, 1344),
	new MonsterEntry("deathmauler3", "Death Mauler3", 95, "Arreat Plateau", 81, 1344),
	new MonsterEntry("minion4", "Fire Boar", 100, "Arreat Plateau", 81, 1344),
	new MonsterEntry("siegebeast3", "Blood Bringer", 90, "Arreat Plateau", 81, 1344),
	new MonsterEntry("overseer5", "Hell Whip", 90, "Arreat Plateau", 81, 1344),
	new MonsterEntry("imp3", "Imp3", 110, "Arreat Plateau", 81, 1344),
	new MonsterEntry("slinger9", "Slinger", 95, "Arreat Plateau", 81, 1344),
	new MonsterEntry("skmage_ltng5", "Returned Mage", 90, "Arreat Plateau", 81, 1344),
	new MonsterEntry("skmage_fire5", "Returned Mage", 90, "Arreat Plateau", 81, 1344),
	new MonsterEntry("goatman7", "Night Clan", 90, "Arreat Plateau", 81, 1344),
	new MonsterEntry("fallenshaman6", "Carver Shaman", 75, "Arreat Plateau", 81, 1344),
	new MonsterEntry("snowyeti1", "Snow Yeti1", 85, "Crystalline Passage", 82, 1358),
	new MonsterEntry("frozenhorror1", "Frozen Horror1", 100, "Crystalline Passage", 82, 1358),
	new MonsterEntry("succubus1", "Succubusexp", 115, "Crystalline Passage", 82, 1358),
	new MonsterEntry("bloodlord3", "Blood Lord3", 130, "Crystalline Passage", 82, 1358),
	new MonsterEntry("sandraider7", "Infidel", 100, "Crystalline Passage", 82, 1358),
	new MonsterEntry("sandleaper6", "Cave Leaper", 130, "Crystalline Passage", 82, 1358),
	new MonsterEntry("skmage_cold5", "Bone Mage", 90, "Crystalline Passage", 82, 1358),
	new MonsterEntry("cr_archer7", "Dark Archer", 90, "Crystalline Passage", 82, 1358),
	new MonsterEntry("wraith6", "Ghost", 130, "Crystalline Passage", 82, 1358),
	new MonsterEntry("clawviper6", "Claw Viper", 115, "Crystalline Passage", 82, 1358),
	new MonsterEntry("snowyeti1", "Snow Yeti1", 85, "Frozen River", 83, 1374),
	new MonsterEntry("frozenhorror1", "Frozen Horror1", 100, "Frozen River", 83, 1374),
	new MonsterEntry("succubus6", "Succubusexp", 115, "Frozen River", 83, 1374),
	new MonsterEntry("reanimatedhorde1", "Rot Walker", 70, "Frozen River", 83, 1374),
	new MonsterEntry("succubuswitch6", "Dominus", 115, "Frozen River", 83, 1374),
	new MonsterEntry("willowisp5", "Gloam", 115, "Frozen River", 83, 1374),
	new MonsterEntry("skmage_cold5", "Bone Mage", 90, "Frozen River", 83, 1374),
	new MonsterEntry("cr_lancer7", "Dark Lancer", 95, "Frozen River", 83, 1374),
	new MonsterEntry("wraith6", "Ghost", 130, "Frozen River", 83, 1374),
	new MonsterEntry("clawviper6", "Claw Viper", 115, "Frozen River", 83, 1374),
	new MonsterEntry("snowyeti1", "Snow Yeti1", 85, "Glacial Trail", 83, 1374),
	new MonsterEntry("frozenhorror1", "Frozen Horror1", 100, "Glacial Trail", 83, 1374),
	new MonsterEntry("reanimatedhorde1", "Rot Walker", 70, "Glacial Trail", 83, 1374),
	new MonsterEntry("skeleton6", "Bone Warrior", 100, "Glacial Trail", 83, 1374),
	new MonsterEntry("wraith7", "Wraith", 130, "Glacial Trail", 83, 1374),
	new MonsterEntry("batdemon6", "Gloombat", 110, "Glacial Trail", 83, 1374),
	new MonsterEntry("skmage_cold5", "Bone Mage", 90, "Glacial Trail", 83, 1374),
	new MonsterEntry("bloodlord6", "Blood Lord1", 130, "Glacial Trail", 83, 1374),
	new MonsterEntry("clawviper7", "Pit Viper", 115, "Glacial Trail", 83, 1374),
	new MonsterEntry("frozenhorror2", "Frozen Horror2", 100, "The Ancients' Way", 82, 1358),
	new MonsterEntry("snowyeti2", "Snow Yeti2", 85, "The Ancients' Way", 82, 1358),
	new MonsterEntry("bloodlord7", "Blood Lord4", 130, "The Ancients' Way", 82, 1358),
	new MonsterEntry("fallenshaman6", "Carver Shaman", 75, "The Ancients' Way", 82, 1358),
	new MonsterEntry("quillrat7", "Spike Fiend", 80, "The Ancients' Way", 82, 1358),
	new MonsterEntry("cr_lancer7", "Dark Lancer", 95, "The Ancients' Way", 82, 1358),
	new MonsterEntry("skmage_cold5", "Bone Mage", 90, "The Ancients' Way", 82, 1358),
	new MonsterEntry("reanimatedhorde2", "Reanimated Horde", 70, "The Ancients' Way", 82, 1358),
	new MonsterEntry("bighead6", "Afflicted", 90, "The Ancients' Way", 82, 1358),
	new MonsterEntry("snowyeti2", "Snow Yeti2", 85, "Icy Cellar", 85, 1403),
	new MonsterEntry("succubus4", "Hell Temptress", 115, "Icy Cellar", 85, 1403),
	new MonsterEntry("bloodlord7", "Blood Lord4", 130, "Icy Cellar", 85, 1403),
	new MonsterEntry("frozenhorror2", "Frozen Horror2", 100, "Icy Cellar", 85, 1403),
	new MonsterEntry("clawviper7", "Pit Viper", 115, "Icy Cellar", 85, 1403),
	new MonsterEntry("bonefetish5", "Undead Stygian Doll", 135, "Icy Cellar", 85, 1403),
	new MonsterEntry("willowisp5", "Gloam", 115, "Icy Cellar", 85, 1403),
	new MonsterEntry("batdemon6", "Gloombat", 110, "Icy Cellar", 85, 1403),
	new MonsterEntry("wraith6", "Ghost", 130, "Icy Cellar", 85, 1403),
	new MonsterEntry("succubuswitch6", "Dominus", 115, "Icy Cellar", 85, 1403),
	new MonsterEntry("reanimatedhorde3", "Prowling Dead", 70, "Halls of Anguish", 83, 1374),
	new MonsterEntry("bloodlord2", "Blood Lord2", 130, "Halls of Anguish", 83, 1374),
	new MonsterEntry("deathmauler5", "Death Mauler5", 95, "Halls of Anguish", 83, 1374),
	new MonsterEntry("skeleton7", "Returned", 100, "Halls of Anguish", 83, 1374),
	new MonsterEntry("sandleaper7", "Tomb Creeper", 130, "Halls of Anguish", 83, 1374),
	new MonsterEntry("fallenshaman7", "Devilkin Shaman", 75, "Halls of Anguish", 83, 1374),
	new MonsterEntry("scarab6", "Scarab", 145, "Halls of Anguish", 83, 1374),
	new MonsterEntry("fetish6", "Flayer", 125, "Halls of Anguish", 83, 1374),
	new MonsterEntry("skmage_pois5", "Horror Mage", 90, "Halls of Anguish", 83, 1374),
	new MonsterEntry("baboon7", "Temple Guard", 110, "Halls of Anguish", 83, 1374),
	new MonsterEntry("bloodlord2", "Blood Lord2", 130, "Halls of Pain", 84, 1389),
	new MonsterEntry("sandraider7", "Infidel", 100, "Halls of Pain", 84, 1389),
	new MonsterEntry("baboon8", "Temple Guard", 110, "Halls of Pain", 84, 1389),
	new MonsterEntry("goatman9", "Blood Clan", 90, "Halls of Pain", 84, 1389),
	new MonsterEntry("quillrat8", "Razor Spine", 80, "Halls of Pain", 84, 1389),
	new MonsterEntry("unraveler6", "Guardian", 120, "Halls of Pain", 84, 1389),
	new MonsterEntry("fetishblow6", "Flayer", 110, "Halls of Pain", 84, 1389),
	new MonsterEntry("cantor5", "Heirophant", 75, "Halls of Pain", 84, 1389),
	new MonsterEntry("vilemother4", "Grotesque", 80, "Halls of Pain", 84, 1389),
	new MonsterEntry("sandmaggot6", "World Killer", 115, "Halls of Pain", 84, 1389),
	new MonsterEntry("minion9", "Slayerexp", 120, "Halls of Vaught", 84, 1389),
	new MonsterEntry("succubus4", "Hell Temptress", 115, "Halls of Vaught", 84, 1389),
	new MonsterEntry("putriddefiler2", "Putrid Defiler2", 65, "Halls of Vaught", 84, 1389),
	new MonsterEntry("reanimatedhorde3", "Prowling Dead", 70, "Halls of Vaught", 84, 1389),
	new MonsterEntry("wraith6", "Ghost", 130, "Halls of Vaught", 84, 1389),
	new MonsterEntry("arach6", "Arach", 135, "Halls of Vaught", 84, 1389),
	new MonsterEntry("sk_archer9", "Returned Archer", 100, "Halls of Vaught", 84, 1389),
	new MonsterEntry("fetishshaman6", "Flayer Shaman", 100, "Halls of Vaught", 84, 1389),
	new MonsterEntry("baboon6", "Night Marauder", 140, "Halls of Vaught", 84, 1389),
	new MonsterEntry("clawviper9", "Tomb Viper", 115, "Halls of Vaught", 84, 1389),
	new MonsterEntry("reanimatedhorde6", "Unholy Corpse", 70, "The Worldstone Keep Level 1", 85, 1403),
	new MonsterEntry("succubuswitch8", "Vile Witch", 115, "The Worldstone Keep Level 1", 85, 1403),
	new MonsterEntry("putriddefiler3", "Putrid Defiler3", 65, "The Worldstone Keep Level 1", 85, 1403),
	new MonsterEntry("sandraider9", "Invader", 100, "The Worldstone Keep Level 1", 85, 1403),
	new MonsterEntry("bloodlord5", "Blood Lord5", 130, "The Worldstone Keep Level 1", 85, 1403),
	new MonsterEntry("cr_lancer8", "Black Lancer", 95, "The Worldstone Keep Level 1", 85, 1403),
	new MonsterEntry("vilemother5", "Flesh Spawner", 80, "The Worldstone Keep Level 1", 85, 1403),
	new MonsterEntry("cantor6", "Heirophant", 75, "The Worldstone Keep Level 1", 85, 1403),
	new MonsterEntry("vampire7", "Ghoul Lord", 100, "The Worldstone Keep Level 1", 85, 1403),
	new MonsterEntry("fetishshaman8", "Soul Killer Shaman", 100, "The Worldstone Keep Level 1", 85, 1403),
	new MonsterEntry("suicideminion6", "Frenzied Ice Spawn", 85, "The Worldstone Keep Level 2", 85, 1403),
	new MonsterEntry("minion11", "Greater Hell Spawn", 120, "The Worldstone Keep Level 2", 85, 1403),
	new MonsterEntry("fetish8", "Soul Killer", 125, "The Worldstone Keep Level 2", 85, 1403),
	new MonsterEntry("batdemon7", "Fiend", 110, "The Worldstone Keep Level 2", 85, 1403),
	new MonsterEntry("clawviper10", "Serpent Magus", 115, "The Worldstone Keep Level 2", 85, 1403),
	new MonsterEntry("mummy6", "Cadaver", 95, "The Worldstone Keep Level 2", 85, 1403),
	new MonsterEntry("skmage_pois6", "Horror Mage", 90, "The Worldstone Keep Level 2", 85, 1403),
	new MonsterEntry("unraveler8", "Horadrim Ancient", 120, "The Worldstone Keep Level 2", 85, 1403),
	new MonsterEntry("scarab7", "Steel Weevil", 145, "The Worldstone Keep Level 2", 85, 1403),
	new MonsterEntry("willowisp6", "Black Soul", 115, "The Worldstone Keep Level 2", 85, 1403),
	new MonsterEntry("bloodlord5", "Blood Lord5", 130, "Throne of Destruction", 85, 1403),
	new MonsterEntry("succubuswitch5", "Hell Witch", 115, "Throne of Destruction", 85, 1403),
	new MonsterEntry("bonefetish7", "Undead Soul Killer", 135, "Throne of Destruction", 85, 1403),
	new MonsterEntry("sandraider10", "Assailant", 100, "Throne of Destruction", 85, 1403),
	new MonsterEntry("willowisp7", "Burning Soul", 115, "Throne of Destruction", 85, 1403),
	new MonsterEntry("vampire8", "Dark Lord", 100, "Throne of Destruction", 85, 1403),
	new MonsterEntry("megademon5", "Pit Lord", 115, "Throne of Destruction", 85, 1403),
	new MonsterEntry("unraveler9", "Horadrim Ancient", 120, "Throne of Destruction", 85, 1403),
	new MonsterEntry("dkmag2", "Oblivion Knight", 115, "Throne of Destruction", 85, 1403),
	new MonsterEntry("clawviper10", "Serpent Magus", 115, "Throne of Destruction", 85, 1403)
];

export { container, number, debug, data };