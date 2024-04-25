var jsonRaceDescriptions, jsonBuildings;

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

    const jsonFilePaths = ['/aow3db/Data/RaceDescriptions.json', '/aow3db/Data/Buildings.json'];
    await fetchJsonFiles(jsonFilePaths)
        .then(dataArray => {
            dataArray.forEach((data, index) => {
                // console.log(`Data from ${jsonFilePaths[index]}:`, data);
                if (index == 0) {
                    jsonRaceDescriptions = data;
                } else if (index == 1) {
                    jsonBuildings = data;
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
                content.style.maxHeight = content.scrollHeight + "px";
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
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].icon_name;
            abilityDescr = jsonUnitAbilities.abilities[j].description;

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

    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].icon_name;
            abilityDescr = jsonUnitAbilities.abilities[j].description;
            abilityDam = jsonUnitAbilities.abilities[j].damage;
            abilityRange = jsonUnitAbilities.abilities[j].range;
            abilityAcc = jsonUnitAbilities.abilities[j].accuracy;
            abilityType = jsonUnitAbilities.abilities[j].type;
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
            spa.innerHTML = "<p>" + "<span style=\"font-size:18px\">" + abilityName + "&nbsp;&nbsp;&nbsp; " + abilityDamageFinal + "</span>" + "</p>" +
                abilityRange + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aow3db/Icons/Abilities/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder_" + c).appendChild(btn);

            addTooltipListeners(tex, spa);
            btn.appendChild(imag);
            btn.append(tex);
            btn.append(dam);
        }
    }
    if (abilityName === "") {
        console.warn("no ability found for " + a);
    }
}

function addPassiveslot(a, b, c) {
    var abilityName, abilityIcon, abilityDescr = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].icon_name;
            abilityDescr = jsonUnitAbilities.abilities[j].description;

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
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].icon_name;
            abilityDescr = jsonUnitAbilities.abilities[j].description;
            abilityDam = jsonUnitAbilities.abilities[j].damage;
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

    for (var i = 0; i < list.length; i++) {
        var iDiv = unit_card_template.content.cloneNode(true);
        list[i].appendChild(iDiv);
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

async function showUnitsFromClassList(list) {

    await spawnCards(list);

    for (var i = 0; i < list.length; i++) {
        var id = list[i].id;

        var stringarray = id.match(/[A-Z][a-z]+/g);
        id = stringarray.join('_').toLowerCase();
        setUnitIds(id);
        showUnit(id);
    };

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
    for (i in jsonUnits.units) {
        if (a == jsonUnits.units[i].name) {
            found = true;
            icon = document.getElementById("uniticon_" + a);
            icon.setAttribute("src", "/aow3db/Icons/UnitIcons/" + a + ".png");
            unitName = document.getElementById("unitstring_" + a);
            unitName.innerHTML = jsonUnits.units[i].string;
            descr = document.getElementById("description_" + a);
            descr.innerHTML = jsonUnits.units[i].description;
            imagelink = document.getElementById("vid_" + a);
            imagelink.setAttribute('src', "/aow3db/PreviewGifs/" + jsonUnits.units[i].image_link);
            hp = document.getElementById("hp_" + a);
            hp.innerHTML = jsonUnits.units[i].hp;
            armor = document.getElementById("defense_" + a);
            armor.innerHTML = jsonUnits.units[i].armor;
            shield = document.getElementById("resistance_" + a);
            shield.innerHTML = jsonUnits.units[i].shield;
            mpicon = document.getElementById("mp_icon_" + a);
            if (jsonUnits.units[i].movement_type == "walking") {
                mpicon.setAttribute('src', "/aow3db/Icons/Text/mp.png");
            }
            if (jsonUnits.units[i].movement_type == "flying") {
                mpicon.setAttribute('src', "/aow3db/Icons/Text/flying.png");
            }
            mp = document.getElementById("mp_" + a);
            mp.innerHTML = jsonUnits.units[i].mp;
            tier = document.getElementById("tier_" + a);
            tier.innerHTML = "Tier " + jsonUnits.units[i].tier;
            prodcost = document.getElementById("productioncost_" + a);
            prodcost.innerHTML = "Cost: " + jsonUnits.units[i].cost;
            if (jsonUnits.units[i].origin_building != "") {
                origin_building = document.getElementById("originbuilding_" + a);
                //  var aTag = document.createElement('a');
                //aTag.setAttribute('href', "/aow3db/Pages/Other/buildings.html#" + jsonUnits.units[i].origin_building);
                //aTag.innerHTML = "Requires: " + jsonUnits.units[i].origin_building;
                origin_building.innerHTML = "Requires: " + jsonUnits.units[i].origin_building;
                //origin_building.appendChild(aTag);
            }
            if (jsonUnits.units[i].origin_research != "") {
                origin_research = document.getElementById("originresearch_" + a);
                // var aTag = document.createElement('a');
                //aTag.setAttribute('href', "DraconianHatchling.html");
                //aTag.innerHTML = "Requires: " + jsonUnits.units[i].origin_research;
                origin_research.innerHTML = "Requires: " + jsonUnits.units[i].origin_research;
                //origin_research.appendChild(aTag);
            }
            levels = document.getElementById("levelups_" + a);
            levels.innerHTML = "<div style=\"padding-bottom: 5px;margin-bottom: 5 px;position: absolute;right: 83px;top: -30px; font-family:'Number';\">0/" + jsonUnits.units[i].xp + " <x-xp></x-xp></div>" + "<div class=\"unit_levelupAlternate\">" + "<p class=\"medals\"><x-medal_trooper> </x-medal_trooper> Trooper</p>" + jsonUnits.units[i].level_trooper + "</div>" + "<div class=\"unit_levelupAlternate2\"> <p class = \"medals\"><x-medal_veteran> </x-medal_veteran> Veteran</p>" + jsonUnits.units[i].level_veteran + "</div>" + "<div class=\"unit_levelupAlternate\">" + "<p class=\"medals\"><x-medal_expert> </x-medal_expert> Expert</p>" + jsonUnits.units[i].level_expert + "</div>" + "<div class=\"unit_levelupAlternate2\"><p class=\"medals\"><x-medal_elite> </x-medal_elite> Elite </p>" + jsonUnits.units[i].level_elite + "</div>" + "<div class=\"unit_levelupAlternate\"><p class=\"medals\"><x-medal_champion> </x-medal_champion> Champion</p><bullet> +10 <x-hp> </x-hp> Hit Points</bullet>" + "</div>";
            for (k in jsonUnits.units[i].abilities) {
                addAbilityslot(jsonUnits.units[i].abilities[k].slug, jsonUnits.units[i].abilities[k].unique, jsonUnits.units[i].abilities[k].damage, a);

            }


            for (x in jsonUnits.units[i].passives) {
                addPassiveslot(jsonUnits.units[i].passives[x].slug, jsonUnits.units[i].passives[x].unique, a);

            }

            for (j in jsonUnits.units[i].unit_types) {
                addUnitTypeIcon(jsonUnits.units[i].unit_types[j].slug, jsonUnits.units[i].unit_types[j].unique, a);

            }
            for (z in jsonUnits.units[i].resistances) {
                addResistanceSlot(jsonUnits.units[i].resistances[z].slug, jsonUnits.units[i].resistances[z].unique, a);

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
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;

            abilityDescr = jsonUnitAbilities.abilities[j].description;
            abilityDam = jsonUnitAbilities.abilities[j].damage;
            abilityType = jsonUnitAbilities.abilities[j].range;
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
    var buildingName, description, cost, type, prereq, j, imagelink = "";
    for (j in jsonBuildings) {
        if (a == jsonBuildings[j].slug) {
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
    handleCollapsible();


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



            if ('buildings_t1' in jsonRaceDescriptions[index]) {
                var buildings = jsonRaceDescriptions[index].buildings_t1.split(",");
                var buildingsHolder1 = document.getElementById("city_t1");
                cityTier1name.innerHTML = jsonRaceDescriptions[index].name + " City Tier 1 Buildings";
                for (let i = 0; i < buildings.length; i++) {
                    spawnBuildingCards(buildingsHolder1);
                    showBuilding(buildings[i]);
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
                    showBuilding(buildings[i]);
                    // var newDiv = document.createElement("Div");
                    // newDiv.innerHTML = buildings[i];
                    // buildingsHolder1.appendChild(newDiv);
                }
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
                    showBuilding(buildings[i]);
                }
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
                    showBuilding(buildings[i]);
                }
            }

        }


    }


}

function getAbilityName(slug) {
    for (j in jsonUnitAbilities.abilities) {
        if (slug == jsonUnitAbilities.abilities[j].slug) {
            return jsonUnitAbilities.abilities[j].name;
        }

    }
}



async function spawnBuildingCards(holder) {



    var iDiv = building_template.content.cloneNode(true);
    holder.appendChild(iDiv);


}
