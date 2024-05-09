var searchParams = new URLSearchParams(window.location.search);
var jsonRaceDescriptions, jsonBuildings, jsonRaceGovernance, jsonUnits, jsonUnitAbilities, jsonClassLevelups;

var raceList = ["draconian", "dwarf", "frostling", "goblin", "halfling", "high_elf", "human", "orc", "tigran"];

var dwellingList = ["archon", "fey", "giant", "dragon", "merfolk", "naga"];
var classList = ["arch_druid", "dreadnought", "necromancer", "sorcerer", "rogue", "theocrat", "warlord"];

function fetchJsonFiles(filePaths) {
    return Promise.all(
        filePaths.map(filePath =>
            fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
        )
    );
}

async function GetAllData() {

    const jsonFilePaths = ['/aow3db/Data/RaceDescriptions.json', '/aow3db/Data/Buildings.json', '/aow3db/Data/RaceGovernance.json', '/aow3db/Data/Units.json', "/aow3db/Data/UnitAbilities.json", "/aow3db/Data/ClassLevelups.json"];
    await fetchJsonFiles(jsonFilePaths)
        .then(dataArray => {
            dataArray.forEach((data, index) => {
                // console.log(`Data from ${jsonFilePaths[index]}:`, data);
                if (index == 0) {
                    jsonRaceDescriptions = data;
                } else if (index == 1) {
                    jsonBuildings = data;
                } else if (index == 2) {
                    jsonRaceGovernance = data;
                } else if (index == 3) {
                    jsonUnits = data;
                } else if (index == 4) {
                    jsonUnitAbilities = data;
                } else if (index == 5) {
                    jsonClassLevelups = data;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching JSON files:', error.message);
        });

}
async function CheckData() {
    if (jsonRaceDescriptions === undefined) {
        await GetAllData();

        HandlePage();
    }
}


function handleCollapsible() {


    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = "99999px";
            }
        });
    }

}

function setUnitIds(a) {
    var icon, unitName, descr, imagelink, hp, armor, shield, mpicon, mp, tier, prodcost, origin_building, origin_research, levels, holder = "";
    icon = document.getElementById("uniticon");
    icon.id = "uniticon_" + a;
    unitName = document.getElementById("unitstring");
    unitName.id = "unitstring_" + a;
    descr = document.getElementById("description");
    descr.id = "description_" + a;
    imagelink = document.getElementById("vid");
    imagelink.id = "vid_" + a;
    hp = document.getElementById("hp");
    hp.id = "hp_" + a;
    armor = document.getElementById("defense");
    armor.id = "defense_" + a;
    shield = document.getElementById("resistance");
    shield.id = "resistance_" + a;
    mpicon = document.getElementById("mp_icon");
    mpicon.id = "mp_icon_" + a;
    mp = document.getElementById("mp");
    mp.id = "mp_" + a;
    tier = document.getElementById("tier");
    tier.id = "tier_" + a;
    prodcost = document.getElementById("productioncost");
    prodcost.id = "productioncost_" + a;
    origin_building = document.getElementById("originbuilding");
    origin_building.id = "originbuilding_" + a;
    origin_research = document.getElementById("originresearch");
    origin_research.id = "originresearch_" + a;
    levels = document.getElementById("levelups");
    levels.id = "levelups_" + a;
    holder = document.getElementById("unitabholder");
    holder.id = "unitabholder_" + a;
}

var divsearch = ["unitS", "modS"];

function showhide3(id) {
    if (document.getElementById) {
        var divid = document.getElementById(id);
        //close others
        for (let i = 0; i < divsearch.length; i++) {

            var e = document.getElementById(divsearch[i])
            e.style.display = 'none'; // hide
            //  divStateweapon1[div] = false; // reset status
        }

        divid.style.display = 'contents';
    }
}


function addUnitTypeIcon(a, b, c) {
    var abilityName, abilityIcon, abilityDescr, j = "";
    for (j in jsonUnitAbilities) {
        if (a == jsonUnitAbilities[j].slug) {
            abilityName = jsonUnitAbilities[j].name;
            abilityIcon = jsonUnitAbilities[j].icon_name;
            abilityDescr = jsonUnitAbilities[j].description;

            var btn = document.createElement("DIV");
            btn.className = "unit_typeslot";
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";
            var spa = document.createElement("SPAN");
            var tex = document.createElement("DIV");
            tex.className = "tooltip";
            if (b == "yes") {
                abilityName = "<span style=\"color:magenta\">" + abilityName + "</span>";
            }
            tex.innerHTML = abilityName;
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aow3db/Icons/Passives/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder_" + c).appendChild(btn);

            addTooltipListeners(tex, spa);

            btn.appendChild(imag);
            btn.append(tex);
        }
    }
    if (abilityName === "") {
        console.warn("no unittype found for" + a);
    }

}

function addAbilityslot(a, unique, damage, c) {
    var abilityName, abilityIcon, abilityDescr, abilityDam, abilityRange, abilityDamageFinal = "";

    for (j in jsonUnitAbilities) {
        if (a == jsonUnitAbilities[j].slug) {
            abilityName = jsonUnitAbilities[j].name;
            abilityIcon = jsonUnitAbilities[j].icon_name;
            abilityDescr = jsonUnitAbilities[j].description;
            abilityDam = jsonUnitAbilities[j].damage;
            abilityRange = jsonUnitAbilities[j].range;
            abilityAcc = jsonUnitAbilities[j].accuracy;
            abilityType = jsonUnitAbilities[j].type;
            var tooltipName = document.createElement("SPAN");
            var btn = document.createElement("DIV");
            /// tooltipName.style.fontSize = "20px";
            tooltipName.innerHTML = "test";
            btn.className = "unit_abilityslot";
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";
            var spa = document.createElement("SPAN");
            var tex = document.createElement("DIV");
            tex.className = "tooltip";
            if (unique == "yes") {
                abilityName = "<span style=\"color:magenta\">" + abilityName + "</span>";
            }
            var abilityHolder = document.createElement("DIV");

            if (abilityDam != "") {
                abilityDamageFinal = abilityDam;
            } else if (damage != undefined) {
                abilityDamageFinal = damage;
            } else {
                abilityDamageFinal = "-";
            }
            tex.innerHTML = abilityName;
            var dam = document.createElement("DIV");
            dam.className = "ability_damage";
            dam.innerHTML = abilityDamageFinal;
            spa.innerHTML = "<div class\"abilitySpan\">" + "<span style=\"font-size:18px\">" + abilityName + "&nbsp;&nbsp;&nbsp; " + abilityDamageFinal + "</span>" + "</div>" +
                abilityRange + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aow3db/Icons/Abilities/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder_" + c).appendChild(btn);

            addTooltipListeners(tex, spa);
            btn.appendChild(imag);
            var abilityHolder = document.createElement("DIV");
            abilityHolder.className = "abilitySpan";
            btn.appendChild(abilityHolder);
            abilityHolder.append(tex);
            abilityHolder.append(dam);
        }
    }
    if (abilityName === "") {
        console.warn("no ability found for " + a);
    }
}

function addPassiveslot(a, b, c) {
    var abilityName, abilityIcon, abilityDescr = "";
    for (j in jsonUnitAbilities) {
        if (a == jsonUnitAbilities[j].slug) {
            abilityName = jsonUnitAbilities[j].name;
            abilityIcon = jsonUnitAbilities[j].icon_name;
            abilityDescr = jsonUnitAbilities[j].description;

            var btn = document.createElement("DIV");
            btn.className = "unit_passiveslot";
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";
            var spa = document.createElement("SPAN");
            var tex = document.createElement("DIV");
            tex.className = "tooltip";
            if (b == "yes") {
                abilityName = "<span style=\"color:magenta\">" + abilityName + "</span>";
            }
            tex.innerHTML = abilityName;
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aow3db/Icons/Passives/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder_" + c).appendChild(btn);
            addTooltipListeners(tex, spa);

            btn.appendChild(imag);
            btn.append(tex);

        }
    }
    if (abilityName === "") {
        console.warn("no passive found for " + a);
    }
}

function addResistanceSlot(a, b, c) {
    var abilityName, abilityIcon, abilityDescr, abilityDam = "";
    for (j in jsonUnitAbilities) {
        if (a == jsonUnitAbilities[j].slug) {
            abilityName = jsonUnitAbilities[j].name;
            abilityIcon = jsonUnitAbilities[j].icon_name;
            abilityDescr = jsonUnitAbilities[j].description;
            abilityDam = jsonUnitAbilities[j].damage;
            var btn = document.createElement("DIV");
            btn.className = "unit_passiveslot";
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";
            var spa = document.createElement("SPAN");
            var tex = document.createElement("DIV");
            var dam = document.createElement("DIV");

            tex.className = "tooltip";
            if (b == "yes") {
                abilityName = "<span style=\"color:magenta\">" + abilityName + "</span>";
            }
            tex.innerHTML = abilityName;
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aow3db/Icons/Passives/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder_" + c).appendChild(btn);

            addTooltipListeners(tex, spa);
            btn.appendChild(imag);
            btn.append(tex);
        }
    }
    if (abilityName === "") {
        console.warn("no resistance found for " + a);
    }
}

async function spawnCards(list) {

    var doc = document.getElementById("units");
    for (var i = 0; i < list.length; i++) {
        var iDiv = unit_card_template.content.cloneNode(true);

        doc.appendChild(iDiv);
        document.getElementById("unit_cardID").setAttribute("id", list[i] + "_card");
    }
}

function SetButtonsAndDivs(list, parent, cardType, extraCheckForLists) {

    if (parent === undefined) {
        var buttonHolder = document.getElementById("buttonHolder");
    } else {
        var buttonHolder = document.getElementById(parent);
    }
    buttonHolder.innerHTML = "";
    AddListView(list, parent, cardType, extraCheckForLists);

    for (let i = 0; i < list.length; i++) {


        var dataHolder = document.getElementById("units");
        if (dataHolder === null) {
            dataHolder = document.getElementById("mods");
        }
        if (cardType === "searchMod") {
            dataHolder = document.getElementById("mods");
        }
        var div = document.createElement("DIV");
        div.className = "w3-container w3-border city";
        div.setAttribute("id", list[i]);
        dataHolder.appendChild(div);

        var divChild = document.createElement("DIV");

        div.appendChild(divChild);
        divChild.setAttribute("id", list[i] + "_card");
        var btn = document.createElement("BUTTON");
        btn.className = "w3-bar-item w3-button tablink";
        btn.type = "button";
        btn.setAttribute("id", list[i] + "-button");
        switch (cardType) {


            case "unit":
                showUnit(list[i], list[i]);
                btn.innerHTML = GetUnitTierAndName(list[i]);
                // btn.innerHTML = list[i];
                btn.setAttribute("onclick", 'openDiv(event,\'' + list[i] + '\')');
                break;
            case "unitSearch":
                showUnit(list[i], list[i]);
                btn.innerHTML = GetUnitTierAndName(list[i]);
                // btn.innerHTML = list[i];
                btn.setAttribute("onclick", 'openDiv(event,\'' + list[i] + '\',true)');
                break;
            case "mod":
                showMod(list[i], list[i]);
                btn.innerHTML = GetModTierAndName(list[i]);

                // btn.innerHTML = list[i];
                btn.setAttribute("onclick", 'openDiv(event,\'' + list[i] + '\')');
                break;
            case "searchMod":
                showMod(list[i], list[i]);

                btn.innerHTML = GetModTierAndName(list[i]);
                var buttonHolder = document.getElementById("buttonHolder2");
                // btn.innerHTML = list[i];
                btn.setAttribute("onclick", 'openDiv(event,\'' + list[i] + '\')');
                break;

        }

        buttonHolder.appendChild(btn);


        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px; margin-left:200px");

    }

}

async function buildGovernance(race) {
    await spawnGovernanceCards();
    setRaceGovernance(race);

}

async function buildClassLevelups(className) {
    await spawnClassLevelCards();
    setClassLevelup(className);

}

function AddLevelupList(list1Holder, listLevel1) {
    for (let index = 0; index < listLevel1.length; index++) {

        var splitskill = listLevel1[index].Skill.split("\n");

        if (splitskill.length > 1) {

        }
        var imageLinkAttempt = splitskill[0].toLowerCase();
        imageLinkAttempt = imageLinkAttempt.replaceAll(" ", "_");
        imageLinkAttempt = imageLinkAttempt.replaceAll("'", "");
        var imag = document.createElement("IMG");
        imag.setAttribute("src", "/aow3db/Icons/Levels/" + imageLinkAttempt + ".png");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        var newDiv = document.createElement("div");
        newDiv.className = "levelupList";
        var extra = "";
        if (splitskill.length > 1) {
            extra = splitskill[1];
        }
        var innerPart = "<div>" + splitskill[0].toUpperCase() + " <hr> " + extra + "</div>" + "<div> Points<br>" + listLevel1[index].Points + "</div> ";
        newDiv.append(imag);
        //
        newDiv.innerHTML += "<div>" + "Level<br>" + listLevel1[index].Level + "</div>" + "<div class=\"levelupList2\">" + innerPart + "</div>";
        list1Holder.append(newDiv)


    }
}

function checkLink(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 404) {
                // Link is not found (404 error)
                callback(false);
            } else {
                // Link is found (no error)
                callback(true);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}


function setClassLevelup(className) {
    for (let i = 0; i < jsonClassLevelups.length; i++) {

        if (jsonClassLevelups[i].id == className) {
            var listLevel1 = new Array();
            for (let j = 0; j < jsonClassLevelups[i].levelups.length; j++) {
                if (jsonClassLevelups[i].levelups[j].Level == "1") {
                    listLevel1.push(jsonClassLevelups[i].levelups[j]);
                }

            }
            var list1Holder = document.getElementById("levelup1");
            AddLevelupList(list1Holder, listLevel1);
            var listLevel3 = new Array();
            for (let j = 0; j < jsonClassLevelups[i].levelups.length; j++) {
                if (jsonClassLevelups[i].levelups[j].Level == "3") {
                    listLevel3.push(jsonClassLevelups[i].levelups[j]);
                }

            }
            var list3Holder = document.getElementById("levelup3");
            AddLevelupList(list3Holder, listLevel3);

            var listLevel5 = new Array();
            for (let j = 0; j < jsonClassLevelups[i].levelups.length; j++) {
                if (jsonClassLevelups[i].levelups[j].Level == "5") {
                    listLevel5.push(jsonClassLevelups[i].levelups[j]);
                }

            }
            var list5Holder = document.getElementById("levelup5");
            AddLevelupList(list5Holder, listLevel5);

            var listLevel7 = new Array();
            for (let j = 0; j < jsonClassLevelups[i].levelups.length; j++) {
                if (jsonClassLevelups[i].levelups[j].Level == "7") {
                    listLevel7.push(jsonClassLevelups[i].levelups[j]);
                }

            }
            var list7Holder = document.getElementById("levelup7");
            AddLevelupList(list7Holder, listLevel7);

            var listLevel9 = new Array();
            for (let j = 0; j < jsonClassLevelups[i].levelups.length; j++) {
                if (jsonClassLevelups[i].levelups[j].Level == "9") {
                    listLevel9.push(jsonClassLevelups[i].levelups[j]);
                }

            }
            var list9Holder = document.getElementById("levelup9");
            AddLevelupList(list9Holder, listLevel9);

            var listLevel11 = new Array();
            for (let j = 0; j < jsonClassLevelups[i].levelups.length; j++) {
                if (jsonClassLevelups[i].levelups[j].Level == "11" || jsonClassLevelups[i].levelups[j].Level == "13") {
                    listLevel11.push(jsonClassLevelups[i].levelups[j]);
                }

            }
            var list11Holder = document.getElementById("levelup11");
            AddLevelupList(list11Holder, listLevel11);


        }

    }
}
async function spawnClassLevelCards() {
    var doc = document.getElementById("levelUpClasses");

    var iDiv = class_levelup_template.content.cloneNode(true);

    doc.appendChild(iDiv);


}
async function spawnGovernanceCards() {
    var doc = document.getElementById("raceGovernance");

    var iDiv = race_governance_template.content.cloneNode(true);

    doc.appendChild(iDiv);


}

function setRaceGovernance(race) {
    for (let i = 0; i < jsonRaceGovernance.length; i++) {
        if (jsonRaceGovernance[i].id == race) {
            var nameDiv = document.getElementById("race_governance_name");
            nameDiv.innerHTML = jsonRaceGovernance[i].name + " Race Governance";

            var nameButton = document.getElementById("race_governance_button");
            nameButton.innerHTML = jsonRaceGovernance[i].name + " Governance";
            var mil1 = document.getElementById("patron_military");
            mil1.innerHTML = jsonRaceGovernance[i].military_1;
            var mil2 = document.getElementById("protector_military");
            mil2.innerHTML = jsonRaceGovernance[i].military_2;
            var mil3 = document.getElementById("champion_military");
            mil3.innerHTML = jsonRaceGovernance[i].military_3;
            var mil4 = document.getElementById("prophet_military");
            mil4.innerHTML = jsonRaceGovernance[i].military_4;
            var mil5 = document.getElementById("deity_military");
            mil5.innerHTML = jsonRaceGovernance[i].military_5;
            var eco1 = document.getElementById("patron_economic");
            eco1.innerHTML = jsonRaceGovernance[i].economic_1;
            var eco2 = document.getElementById("protector_economic");
            eco2.innerHTML = jsonRaceGovernance[i].economic_2;
            var eco3 = document.getElementById("champion_economic");
            eco3.innerHTML = jsonRaceGovernance[i].economic_3;
            var eco4 = document.getElementById("prophet_economic");
            eco4.innerHTML = jsonRaceGovernance[i].economic_4;
            var eco5 = document.getElementById("deity_economic");
            eco5.innerHTML = jsonRaceGovernance[i].economic_5;
        }


    }
}


function AddListView(list, parent, cardType, extraCheckForLists) {
    // add list view first

    if (parent != undefined) { // but only if its a non-tiered one, if tiered only do the first one

        if (extraCheckForLists.indexOf("first") != -1) {


        } else {
            return;
        }


    }



    var buttonHolder = document.getElementById("buttonHolder");


    var btn = document.createElement("BUTTON");


    btn.className = "w3-bar-item w3-button tablink";
    btn.type = "button";
    btn.innerHTML = "<i class=\"fa fa-solid fa-list\"></i>";

    btn.setAttribute("onclick", 'openDiv(event, "' + list + '")');



    var firstChild = buttonHolder.firstChild;
    buttonHolder.insertBefore(btn, firstChild);
}



function SetCollapsibleButtonsAndDivs(overwrite, list, cardType) {
    var modName, description, cost, type, tier, i, nameString = "";
    if (cardType === "searchMod") {
        var buttonHolder = document.getElementById("buttonHolder2");
    } else {
        var buttonHolder = document.getElementById("buttonHolder");
    }

    var btn = document.createElement("BUTTON");
    btn.type = "button";

    btn.innerHTML = overwrite + " (" + list.length + ")";
    if (cardType != "mod" && cardType.indexOf("search") === -1) {
        // btn.setAttribute("onclick", 'openDiv(event,\'' + overwrite + '\')');
        // btn.setAttribute("id", overwrite + "-");
    } else if (cardType.indexOf("search") != -1) {
        console.log("search");
        btn.setAttribute("onclick", 'openDiv(event,\'' + overwrite + '\',true)');
        btn.setAttribute("id", overwrite + "-");
    }

    buttonHolder.appendChild(btn);


    btn.className = "w3-bar-item w3-button tablink";
    var dataHolder = document.getElementById("units");

    if (dataHolder === null) {
        dataHolder = document.getElementById("mods");
    }
    if (cardType === "searchMod") {
        parentDiv = document.getElementById("mods");
    }
    var holderHeight = buttonHolder.offsetHeight + 50;
    dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
    var div = document.createElement("DIV");

    div.className = "w3-container w3-border city";
    div.setAttribute("id", overwrite);


    dataHolder.appendChild(div);



    switch (cardType) {

        case "unit":
            var holderHeight = buttonHolder.offsetHeight;
            dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
            btn.className = "collapsibleUnits";
            var content = document.createElement("DIV");
            content.setAttribute("id", overwrite + "-button");
            content.className = "contentUnits";
            buttonHolder.append(content);
            // showModsFromList(list, overwrite);
            break;
        case "searchUnit":
            var holderHeight = buttonHolder.offsetHeight;
            dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
            btn.className = "collapsibleUnits";
            var content = document.createElement("DIV");
            content.setAttribute("id", overwrite + "-button");
            content.className = "contentUnits";
            buttonHolder.append(content);
            // showModsFromList(list, overwrite);
            break;
        case "searchMod":
            var holderHeight = buttonHolder.offsetHeight;
            dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
            btn.className = "collapsibleUnits";
            var content = document.createElement("DIV");
            content.setAttribute("id", overwrite + "-button");
            content.className = "contentUnits";
            buttonHolder.append(content);
            // showModsFromList(list, overwrite);
            break;

        // case "unit":
        //     btn.className = "collapsibleUnits";
        //     var content = document.createElement("DIV");
        //     content.setAttribute("id", overwrite + "-button");
        //     content.className = "contentUnits";
        //     buttonHolder.append(content);
        //     break;
    }


}

async function SetCollapsibleStuff() {
    var coll = document.getElementsByClassName("collapsibleUnits");


    for (i = 0; i < coll.length; i++) {

        coll[i].addEventListener("click", function () {
            var contents = document.getElementsByClassName("contentUnits");
            var content = this.nextElementSibling;

            for (j = 0; j < contents.length; j++) {


                if (contents[j].style != null) {
                    if (contents[j].style.display === "grid") {
                        if (contents[j].id === content.id) {

                        } else {

                            coll[j].classList.toggle("active");
                            contents[j].style.display = "none";
                        }

                    }
                }

            }
            this.classList.toggle("active");

            if (content.style.display === "grid") {
                content.style.display = "none";
            } else {
                content.style.display = "grid";
            }




            var buttonHolder = document.getElementById("buttonHolder");
            var holderHeight = buttonHolder.offsetHeight;
            var dataHolder = document.getElementById("units");


            if (dataHolder === null) {
                dataHolder = document.getElementById("mods");
            }
            dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px; margin-left:200px");
        });


    }

    var buttonHolder = document.getElementById("buttonHolder");
    var holderHeight = buttonHolder.offsetHeight;
    var dataHolder = document.getElementById("units");
    if (dataHolder === null) {
        dataHolder = document.getElementById("mods");
    }
    dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;; margin-left:200px");
}

function romanize(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
        ],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function GetUnitTierAndName(id) {


    for (i in jsonUnits) {
        if (id === jsonUnits[i].name) {



            var name = jsonUnits[i].string;

            var tier = jsonUnits[i].tier.split("-")[0];


            return "<p style=\"width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-transform: none; margin:0;\" >" + getUnitTypeTag(jsonUnits[i].passives) + getUnitTypeTag(jsonUnits[i].unit_types) + " " + name + "</p>" + "<p style=\"text-align:right; color:white; position:relative; \">" + (tier) + "</p>";




        }
    }
}


function getUnitTypeTag(passivesList) {
    var i = "";
    for (i in passivesList) {
        if (passivesList[i].slug === "irregular") {
            return "<unitIrregular></unitIrregular>";
        }
        if (passivesList[i].slug === "infantry") {
            return "<unitInfantry></unitInfantry>";
        }
        if (passivesList[i].slug === "monster") {
            return "<unitMonster></unitMonster>";
        }
        if (passivesList[i].slug === "archer") {
            return "<unitArcher></unitArcher>";
        }
        if (passivesList[i].slug === "cavalry") {
            return "<unitCavalry></unitCavalry>";
        }
        if (passivesList[i].slug === "machine" || passivesList[i].slug === "laborer") {
            return "<unitMachine></unitMachine>";
        }
        if (passivesList[i].slug === "giant") {
            return "<unitGiant></unitGiant>";
        }
        if (passivesList[i].slug === "dragon") {
            return "<unitDragon></unitDragon>";
        }
        if (passivesList[i].slug === "elemental") {
            return "<unitElemental></unitElemental>";
        }
        if (passivesList[i].slug === "polearm") {
            return "<unitPike></unitPike>";
        }
        if (passivesList[i].slug === "animal") {
            return "<unitAnimal></unitAnimal>";
        }
        if (passivesList[i].slug === "boat") {
            return "<unitBoat></unitBoat>";
        }
        if (passivesList[i].slug === "support") {
            return "<unitSupport></unitSupport>";
        }
        if (passivesList[i].slug === "sea_creature") {
            return "<unitSeaCreature></unitSeaCreature>";
        }
        if (passivesList[i].slug === "fey") {
            return "<unitFey></unitFey>";
        }
        if (passivesList[i].slug === "undead") {
            return "<unitUndead></unitUndead>";
        }
    }
    return "";
}

async function showUnitsFromListTest(list, overwritetext, extraCheckForLists, search) {

    await spawnCards(list);
    for (var i = 0; i < list.length; i++) {

        setUnitIds(list[i]);
    }

    var typeMod = "unit";

    if (search != null) {
        typeMod = "unitSearch";
    }
    if (overwritetext != undefined) {
        SetCollapsibleButtonsAndDivs(overwritetext, list, typeMod);
        SetButtonsAndDivs(list, overwritetext + "-button", typeMod, extraCheckForLists);
    } else {

        SetButtonsAndDivs(list, undefined, typeMod);
    }


    const urlParams = new URLSearchParams(window.location.search);
    const product = searchParams.get('type');


    if (product != undefined) {
        var splits = product.split("&");
        closeTabLinks(product);

        document.getElementById(splits[0] + "-button").className += " w3-red";


        await openDiv(event, splits[0]);


    }
    if (extraCheckForLists === "last") {
        await SetCollapsibleStuff();
    }
    //  await SetCollapsibleStuff();
}


async function openDiv(evt, cityName, search) {


    if (cityName != undefined) {
        currentView = cityName;
    }

    var i, x, tablinks;
    x = document.getElementsByClassName("unit_card");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    closeTabLinks(cityName);

    if (evt != null) {
        evt.currentTarget.className += " w3-red";
    }
    if (cityName.indexOf(",") != -1 || cityName.indexOf("zephyr_bird") != -1 || cityName.indexOf("spy_drone") != -1 || cityName.indexOf("cherub") != -1 || cityName.indexOf("wisp") != -1 || cityName.indexOf("grimbeak_crows") != -1 || cityName.indexOf("cadaver") != -1) {
        console.log("is array");
        var parentDiv = document.getElementById("units");
        if (parentDiv === null) {
            parentDiv = document.getElementById("mods");
        }

        if (search === true) {
            parentDiv = document.getElementById("units");
        }

        // Get all direct children of the parent div
        var children = parentDiv.children;

        // Loop through each child and set its display to "block"
        for (var i = 0; i < children.length; i++) {
            children[i].style.display = "table";
        }

    } else {

        var currentEl = document.getElementById(cityName + "_card");
        if (currentEl != null) {
            currentEl.style.display = "table";
        }

        var currenturl = window.location.href.split('?')[0];
        var currentadditive = currenturl.split('&')[1];
        if (currentadditive === undefined) {
            currentadditive = "";
        }
        if (search === undefined) {
            window.history.replaceState({}, 'foo', currenturl + "?type=" + cityName + "&" + currentadditive);
        }


        // if (sorting != undefined) {
        //     var splits = sorting.split(":");
        //     setTimeout(function () {
        //         sortDivs(splits[0], splits[1]);
        //     }, 50);
        //     // console.log(cityName);
        // }
    }
}


function closeTabLinks(cityName) {
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].id != cityName + "-button") {
            tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
        }

    }
}

async function spawnCardsNew(list, holder, multiple) {
    if (multiple === true) {
        for (var i = 0; i < list.length; i++) {
            var iDiv = unit_card_template.content.cloneNode(true);
            holder.appendChild(iDiv);
            var id = list[i];

            var stringarray = id.match(/[A-Z][a-z]+/g);
            id = stringarray.join('_').toLowerCase();
            setUnitIds(id);
            showUnit(id, iDiv);
        }
    } else {
        var iDiv = unit_card_template.content.cloneNode(true);
        holder.appendChild(iDiv);
        var id = list;

        var stringarray = id.match(/[A-Z][a-z]+/g);
        id = stringarray.join('_').toLowerCase();
        setUnitIds(id);
        showUnit(id, iDiv);
    }


}


async function showUnitsFromList(list) {

    var holder = document.getElementById("UnitHolder");
    await spawnCardsNew(list, holder, true);

    // for (var i = 0; i < list.length; i++) {

    // };

}

async function showUnitsFromListVariants(list, name, extratext) {


    var holder = document.getElementById("UnitHolder");
    var variantHolder = document.createElement("div");
    variantHolder.className = "unit_card";
    holder.append(variantHolder);
    variantHolder.innerHTML = "<p style=\"background-color:black; font-size: 26px\" class=\"unit_name\">" + name + "</p>";
    if (extratext != undefined) {
        variantHolder.innerHTML += extratext;
    }

    for (var i = 0; i < list.length; i++) {


        var buttonHolder = document.createElement("button");
        buttonHolder.className = "collapsible";
        buttonHolder.addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
        var contentHolder = document.createElement("div");
        contentHolder.className = "content";
        variantHolder.append(buttonHolder);
        variantHolder.append(contentHolder);
        await spawnCardsNew(list[i], contentHolder, false);
        var id = list[i];
        var stringarray = id.match(/[A-Z][a-z]+/g);
        id = stringarray.join('_').toLowerCase();
        //setUnitIds(id);





        buttonHolder.innerHTML = stringarray.join(' ');


        showUnit(id);
    };


}

function showUnit(a) {

    var hp, mp, shield, armor, descr, j, k, x, t, y, z, unitName, icon, imagelink, mpicon, prodcost, tier, levels = "";
    var found = false;
    for (i in jsonUnits) {
        if (a == jsonUnits[i].name) {
            found = true;
            icon = document.getElementById("uniticon_" + a);
            icon.setAttribute("src", "/aow3db/Icons/UnitIcons/" + a + ".png");
            icon.onerror = function () {
                // Second attempt: Load the image from the Abilities directory
                icon.setAttribute("src", "/aow3db/Icons/UnitIcons/blank.png");
            };
            unitName = document.getElementById("unitstring_" + a);
            unitName.innerHTML = jsonUnits[i].string;
            descr = document.getElementById("description_" + a);
            descr.innerHTML = jsonUnits[i].description;
            imagelink = document.getElementById("vid_" + a);
            imagelink.setAttribute('src', "/aow3db/PreviewGifs/" + jsonUnits[i].image_link);



            hp = document.getElementById("hp_" + a);
            hp.innerHTML = jsonUnits[i].hp;
            armor = document.getElementById("defense_" + a);
            armor.innerHTML = jsonUnits[i].armor;
            shield = document.getElementById("resistance_" + a);
            shield.innerHTML = jsonUnits[i].shield;
            mpicon = document.getElementById("mp_icon_" + a);
            if (jsonUnits[i].movement_type == "walking") {
                mpicon.setAttribute('src', "/aow3db/Icons/Text/mp.png");
            }
            if (jsonUnits[i].movement_type == "flying") {
                mpicon.setAttribute('src', "/aow3db/Icons/Text/flying.png");
            }
            mp = document.getElementById("mp_" + a);
            mp.innerHTML = jsonUnits[i].mp;
            tier = document.getElementById("tier_" + a);
            tier.innerHTML = "Tier " + jsonUnits[i].tier;
            prodcost = document.getElementById("productioncost_" + a);
            prodcost.innerHTML = "Cost: " + jsonUnits[i].cost;
            if (jsonUnits[i].origin_building != "") {
                origin_building = document.getElementById("originbuilding_" + a);
                //  var aTag = document.createElement('a');
                //aTag.setAttribute('href', "/aow3db/Pages/Other/buildings.html#" + jsonUnits[i].origin_building);
                //aTag.innerHTML = "Requires: " + jsonUnits[i].origin_building;
                origin_building.innerHTML = "Requires: " + jsonUnits[i].origin_building;
                //origin_building.appendChild(aTag);
            }
            if (jsonUnits[i].origin_research != "") {
                origin_research = document.getElementById("originresearch_" + a);
                // var aTag = document.createElement('a');
                //aTag.setAttribute('href', "DraconianHatchling.html");
                //aTag.innerHTML = "Requires: " + jsonUnits[i].origin_research;
                origin_research.innerHTML = "Requires: " + jsonUnits[i].origin_research;
                //origin_research.appendChild(aTag);
            }
            levels = document.getElementById("levelups_" + a);
            levels.innerHTML = "<div style=\"padding-bottom: 5px;margin-bottom: 5 px;position: absolute;right: 83px;top: -30px; font-family:'Number';\">0/" + jsonUnits[i].xp + " <x-xp></x-xp></div>" + "<div class=\"unit_levelupAlternate\">" + "<p class=\"medals\"><x-medal_trooper> </x-medal_trooper> Trooper</p>" + jsonUnits[i].level_trooper + "</div>" + "<div class=\"unit_levelupAlternate2\"> <p class = \"medals\"><x-medal_veteran> </x-medal_veteran> Veteran</p>" + jsonUnits[i].level_veteran + "</div>" + "<div class=\"unit_levelupAlternate\">" + "<p class=\"medals\"><x-medal_expert> </x-medal_expert> Expert</p>" + jsonUnits[i].level_expert + "</div>" + "<div class=\"unit_levelupAlternate2\"><p class=\"medals\"><x-medal_elite> </x-medal_elite> Elite </p>" + jsonUnits[i].level_elite + "</div>" + "<div class=\"unit_levelupAlternate\"><p class=\"medals\"><x-medal_champion> </x-medal_champion> Champion</p><bullet> +10 <x-hp> </x-hp> Hit Points</bullet>" + "</div>";
            for (k in jsonUnits[i].abilities) {
                addAbilityslot(jsonUnits[i].abilities[k].slug, jsonUnits[i].abilities[k].unique, jsonUnits[i].abilities[k].damage, a);

            }


            for (x in jsonUnits[i].passives) {
                addPassiveslot(jsonUnits[i].passives[x].slug, jsonUnits[i].passives[x].unique, a);

            }

            for (j in jsonUnits[i].unit_types) {
                addUnitTypeIcon(jsonUnits[i].unit_types[j].slug, jsonUnits[i].unit_types[j].unique, a);

            }
            for (z in jsonUnits[i].resistances) {
                addResistanceSlot(jsonUnits[i].resistances[z].slug, jsonUnits[i].resistances[z].unique, a);

            }
            var extratooltips = document.getElementsByClassName("tooltiptext2");
            for (t in extratooltips) {
                extratooltips[t].innerHTML = showAbility(extratooltips[t].id);
            }
        }
    }

    if (found === false) {
        console.log("Couldn't find " + a);
    }
}

function showAbility(a) {
    var j, text, abilityDam, abilityName, abilityDescr, abilityType = "";
    var div = document.createElement("Span");
    for (j in jsonUnitAbilities) {
        if (a == jsonUnitAbilities[j].slug) {
            abilityName = jsonUnitAbilities[j].name;

            abilityDescr = jsonUnitAbilities[j].description;
            abilityDam = jsonUnitAbilities[j].damage;
            abilityType = jsonUnitAbilities[j].range;
            if (abilityType != null) {
                div.innerHTML = "<p>" + "<span style=\"font-size:18px\">" + abilityName + "&nbsp;&nbsp;&nbsp;" + abilityDam + "</span>" + "</p>" +
                    abilityType + "<hr>" + abilityDescr;
            } else {
                div.innerHTML = "<p>" + "<span style=\"font-size:18px\">" + abilityName + "" + abilityDam + "</span>" + "<hr>" + abilityDescr;
            }

        }

    }
    return div.innerHTML;
}





function showBuilding(a) {
    var found = false;
    var buildingName, description, cost, type, prereq, j, imagelink = "";
    for (j in jsonBuildings) {
        if (a == jsonBuildings[j].slug) {
            found = true;
            buildingName = document.getElementById("buildingname");
            buildingName.innerHTML = jsonBuildings[j].name;
            buildingName.setAttribute("id", "buildingName" + a);
            description = document.getElementById("buildingdescription");
            description.innerHTML = jsonBuildings[j].description;
            description.setAttribute("id", "buildingdescription" + a);

            if ('unlocksunit' in jsonBuildings[j]) {

                description.innerHTML += "<br><br>Unlocks Units: <br>";
                for (let index = 0; index < jsonBuildings[j].unlocksunit.length; index++) {

                    description.innerHTML += "<bullet>" + jsonBuildings[j].unlocksunit[index].slug;
                }
            }

            if ('requires' in jsonBuildings[j]) {

                description.innerHTML += "<br><br>Requires Building: <br>";
                for (let index = 0; index < jsonBuildings[j].requires.length; index++) {

                    description.innerHTML += "<bullet>" + jsonBuildings[j].requires[index].slug;
                }
            }

            if ('leadsto' in jsonBuildings[j]) {

                description.innerHTML += "<br><br>Unlocks Building: <br>";
                for (let index = 0; index < jsonBuildings[j].leadsto.length; index++) {

                    description.innerHTML += "<bullet>" + jsonBuildings[j].leadsto[index].slug;
                }
            }
            // type = document.getElementById("buildingtype");
            //type.innerHTML = jsonBuildings[j].type;

            //cost = document.getElementById("buildingcost");
            //cost.innerHTML = "Cost : " + jsonBuildings[j].cost;
            // if (jsonBuildings[j].prereq != "") {

            //     prereq = document.getElementById("buildingprereq");
            //   prereq.innerHTML = jsonBuildings[j].prereq;
            //}
            imagelink = document.getElementById("buildingicon");
            imagelink.setAttribute("src", "/aow3db//Icons/Buildings/" + jsonBuildings[j].slug + ".png");
            imagelink.setAttribute("id", "buildingicon" + a);
        }
    }
    if (found == false) {
        console.log('couldnt find: ' + a);
    }
}


function addTooltipListeners(tooltip, span) {
    tooltip.addEventListener('mouseenter', function (event) {
        TurnOnTooltip(span);
        if (tooltip != hoverDiv) {
            updateHoverDivPosition(event);
        }

    });

    tooltip.addEventListener('mouseleave', function () {
        TurnOffTooltip();
    });
}

function removeToolTipListeners(tooltip) {
    tooltip.removeEventListener('mouseenter', tooltip);

    tooltip.removeEventListener('mouseleave', tooltip);

}

function TurnOnTooltip(spa) {
    hoverDiv = document.getElementById("hoverDiv");
    // console.log('Mouse entered the div');
    hoverDiv.style.display = 'block';
    if (spa != null) {
        hoverDiv.innerHTML = spa.innerHTML;
    }

}

function TurnOffTooltip() {
    hoverDiv = document.getElementById("hoverDiv");
    hoverDiv.style.display = 'none';
}


function getNormalizedPosition(event) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // event.clientX and event.clientY give the position of the mouse
    const xPosition = event.clientX;
    const yPosition = event.clientY;

    // Normalize to a range of 0 to 1
    const normalizedX = xPosition / screenWidth;
    const normalizedY = yPosition / screenHeight;

    return {
        x: normalizedX,
        y: normalizedY
    };
}

function updateHoverDivPosition(event) {

    // const settings = getUserSettings();

    var offset = 10;
    /* if (settings.tooltipselectable) {
        hoverDiv.setAttribute("Style", "pointer-events: all;");
 
 
    } else {
        hoverDiv.setAttribute("Style", "pointer-events: none;");
        offset = 10;
    }
*/
    var normalizedPos = getNormalizedPosition(event);
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    if (normalizedPos.x > 0.8) {
        hoverDiv.style.left = (mouseX - hoverDiv.getBoundingClientRect().width - offset + scrollLeft) + 'px';
    } else {
        hoverDiv.style.left = (mouseX + offset + scrollLeft) + 'px';
    }

    if (normalizedPos.y > 0.8) {
        hoverDiv.style.top = (mouseY - hoverDiv.getBoundingClientRect().height - offset + scrollTop) + 'px';
    } else {
        hoverDiv.style.top = (mouseY + offset + scrollTop) + 'px';
    }


}


async function spawnCardRace(holder) {



    var iDiv = race_description_template.content.cloneNode(true);
    holder.appendChild(iDiv);


}


async function BuildRaceDescription(raceID) {
    var raceHolder = document.getElementById("raceHolder");

    await spawnCardRace(raceHolder);
    SetRaceDescription(raceID);
    //  handleCollapsible();


}

function SetRaceDescription(raceID) {
    for (let index = 0; index < jsonRaceDescriptions.length; index++) {
        if (jsonRaceDescriptions[index].id === raceID) {

            var raceName = document.getElementById("race_name");
            if ('cityname' in jsonRaceDescriptions[index]) {
                raceName.innerHTML = jsonRaceDescriptions[index].cityname + "(" + jsonRaceDescriptions[index].name + ")";
            } else {
                raceName.innerHTML = jsonRaceDescriptions[index].name;
            }

            if (raceList.includes(jsonRaceDescriptions[index].id) || dwellingList.includes(jsonRaceDescriptions[index].id)) {
                document.getElementById("traitsName").innerHTML = "Terrain and Traits";
                document.getElementById("traits1").innerHTML = "Terrain";
                document.getElementById("traits2").innerHTML = "Traits";
            }

            if (classList.includes(jsonRaceDescriptions[index].id)) {
                document.getElementById("traitsName").innerHTML = "Hero Traits";
                document.getElementById("traits1").innerHTML = "Heroes start with";
                document.getElementById("secondList").style.display = "none";

            }


            var raceDescription = document.getElementById("race_descr");
            raceDescription.innerHTML = jsonRaceDescriptions[index].description;
            var raceWMPic = document.getElementById("race_wm");
            raceWMPic.setAttribute("src", "/aow3db/PreviewGifs/StrategicMap/" + jsonRaceDescriptions[index].id + ".png");
            var raceIcon = document.getElementById("race_icon");
            raceIcon.setAttribute("src", "/aow3db/Icons/Passives/" + jsonRaceDescriptions[index].id + ".png");


            var raceTerrain = document.getElementById("race_terrain");
            var raceTraits = document.getElementById("race_traits");

            var cityTier1name = document.getElementById("city_t1_name");

            var cityTier2name = document.getElementById("city_t2_name");

            var cityTier3name = document.getElementById("city_t3_name");

            var cityTier4name = document.getElementById("city_t4_name");


            if ('hero_traits' in jsonRaceDescriptions[index]) {
                for (let j = 0; j < jsonRaceDescriptions[index].hero_traits.length; j++) {
                    var Div = document.createElement("DIV");
                    if ('name' in jsonRaceDescriptions[index].hero_traits[j]) {

                        Div.innerHTML = "<p><bullet>" + jsonRaceDescriptions[index].hero_traits[j].name + "</p>";

                    }

                    else if ('slug' in jsonRaceDescriptions[index].hero_traits[j]) {
                        console.log("slug found");
                        Div.innerHTML = "<p class=\"hyperlink\"><bullet>" + getAbilityName(jsonRaceDescriptions[index].hero_traits[j].slug) + "</hyperlink></p>";
                        var spa = document.createElement("span");
                        spa.innerHTML = showAbility(jsonRaceDescriptions[index].hero_traits[j].slug);
                        addTooltipListeners(Div, spa);
                    }
                    console.log("name found");
                    raceTerrain.appendChild(Div);

                }
            }
            if ('terrain_prefs' in jsonRaceDescriptions[index]) {
                for (let i = 0; i < jsonRaceDescriptions[index].terrain_prefs.length; i++) {
                    var Div = document.createElement("DIV");
                    Div.innerHTML = jsonRaceDescriptions[index].terrain_prefs[i].entry;
                    raceTerrain.appendChild(Div);

                }
            }
            if ('traits' in jsonRaceDescriptions[index]) {
                for (let i = 0; i < jsonRaceDescriptions[index].traits.length; i++) {
                    var Div = document.createElement("DIV");
                    Div.innerHTML = "<bullet>" + jsonRaceDescriptions[index].traits[i].name;
                    if ('slug' in jsonRaceDescriptions[index].traits[i]) {
                        Div.innerHTML = "<p class=\"hyperlink\"><bullet>" + getAbilityName(jsonRaceDescriptions[index].traits[i].slug) + "</p>";
                        var spa = document.createElement("span");
                        spa.innerHTML = showAbility(jsonRaceDescriptions[index].traits[i].slug);
                        addTooltipListeners(Div, spa);
                    }
                    raceTraits.appendChild(Div);

                }
            }


            if ('buildings_class' in jsonRaceDescriptions[index]) {
                var buildings = jsonRaceDescriptions[index].buildings_class.split(",");
                var buildingsHolder1 = document.getElementById("city_t1");
                cityTier1name.innerHTML = jsonRaceDescriptions[index].name + " Class Buildings";
                for (let i = 0; i < buildings.length; i++) {
                    spawnBuildingCards(buildingsHolder1);
                    if (buildings[i].indexOf(";") != -1) {
                        spawnBuildingCards(buildingsHolder1);
                        var buildingsNEcro = buildings[i].split(";");
                        showBuilding(buildingsNEcro[0]);
                        showBuilding(buildingsNEcro[1]);
                    } else {
                        showBuilding(buildings[i]);
                    }

                    // var newDiv = document.createElement("Div");
                    // newDiv.innerHTML = buildings[i];
                    // buildingsHolder1.appendChild(newDiv);
                }
            }
            if ('buildings_t1' in jsonRaceDescriptions[index]) {
                var buildings = jsonRaceDescriptions[index].buildings_t1.split(",");
                var buildingsHolder1 = document.getElementById("city_t1");
                cityTier1name.innerHTML = jsonRaceDescriptions[index].name + " City Tier 1 Buildings";
                for (let i = 0; i < buildings.length; i++) {
                    spawnBuildingCards(buildingsHolder1);
                    if (buildings[i].indexOf(";") != -1) {
                        spawnBuildingCards(buildingsHolder1);
                        var buildingsNEcro = buildings[i].split(";");

                        showBuilding(buildingsNEcro[0]);
                        showBuilding(buildingsNEcro[1]);
                    } else {
                        showBuilding(buildings[i]);
                    }

                    // var newDiv = document.createElement("Div");
                    // newDiv.innerHTML = buildings[i];
                    // buildingsHolder1.appendChild(newDiv);
                }
            }
            if ('buildings_t2' in jsonRaceDescriptions[index]) {
                var buildings = jsonRaceDescriptions[index].buildings_t2.split(",");
                var buildingsHolder1 = document.getElementById("city_t2");
                cityTier2name.innerHTML = jsonRaceDescriptions[index].name + " City Tier 2 Buildings";
                for (let i = 0; i < buildings.length; i++) {
                    spawnBuildingCards(buildingsHolder1);
                    if (buildings[i].indexOf(";") != -1) {
                        spawnBuildingCards(buildingsHolder1);
                        var buildingsNEcro = buildings[i].split(";");
                        showBuilding(buildingsNEcro[0]);
                        showBuilding(buildingsNEcro[1]);
                    } else {
                        showBuilding(buildings[i]);
                    }
                    // var newDiv = document.createElement("Div");
                    // newDiv.innerHTML = buildings[i];
                    // buildingsHolder1.appendChild(newDiv);
                }
            } else {
                document.getElementById("city_t2_name").style.display = "none";
            }
            if ('buildings_t3' in jsonRaceDescriptions[index]) {
                var buildings = jsonRaceDescriptions[index].buildings_t3.split(",");
                var buildingsHolder1 = document.getElementById("city_t3");
                cityTier3name.innerHTML = jsonRaceDescriptions[index].name + " City Tier 3 Buildings";
                for (let i = 0; i < buildings.length; i++) {
                    // var newDiv = document.createElement("Div");
                    // newDiv.innerHTML = buildings[i];
                    // buildingsHolder1.appendChild(newDiv);
                    spawnBuildingCards(buildingsHolder1);
                    if (buildings[i].indexOf(";") != -1) {
                        spawnBuildingCards(buildingsHolder1);
                        var buildingsNEcro = buildings[i].split(";");
                        showBuilding(buildingsNEcro[0]);
                        showBuilding(buildingsNEcro[1]);
                    } else {
                        showBuilding(buildings[i]);
                    }
                }
            } else {
                document.getElementById("city_t3_name").style.display = "none";
            }
            if ('buildings_t4' in jsonRaceDescriptions[index]) {
                var buildings = jsonRaceDescriptions[index].buildings_t4.split(",");
                var buildingsHolder1 = document.getElementById("city_t4");
                cityTier4name.innerHTML = jsonRaceDescriptions[index].name + " City Tier 4 Buildings";
                for (let i = 0; i < buildings.length; i++) {
                    // var newDiv = document.createElement("Div");
                    // newDiv.innerHTML = buildings[i];
                    // buildingsHolder1.appendChild(newDiv);
                    spawnBuildingCards(buildingsHolder1);
                    if (buildings[i].indexOf(";") != -1) {
                        spawnBuildingCards(buildingsHolder1);
                        var buildingsNEcro = buildings[i].split(";");
                        showBuilding(buildingsNEcro[0]);
                        showBuilding(buildingsNEcro[1]);
                    } else {
                        showBuilding(buildings[i]);
                    }
                }
            } else {
                document.getElementById("city_t4_name").style.display = "none";
            }

            if (raceList.includes(jsonRaceDescriptions[index].id)) {
                buildGovernance(jsonRaceDescriptions[index].id);
            }
            if (classList.includes(jsonRaceDescriptions[index].id)) {
                buildClassLevelups(jsonRaceDescriptions[index].id);
            }


        }


    }



}

function getAbilityName(slug) {
    for (j in jsonUnitAbilities) {
        if (slug == jsonUnitAbilities[j].slug) {
            return jsonUnitAbilities[j].name;
        }

    }
}



async function spawnBuildingCards(holder) {



    var iDiv = building_template.content.cloneNode(true);
    holder.appendChild(iDiv);


}
