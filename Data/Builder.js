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
            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aow3db/Icons/Passives/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder_" + c).appendChild(btn);
            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);

        }
    }
    if (abilityName === "") {
        console.warn("no unittype found for" + a);
    }

}

function addAbilityslot(a, unique, damage, c) {
    var abilityName, abilityIcon, abilityDescr, abilityDam, abilityRange = "";

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
            if (damage != "") {
                abilityDam = damage;
            } else {
                abilityDam = "";
            }
            tex.innerHTML = abilityName;
            var dam = document.createElement("DIV");
            dam.className = "ability_damage";
            dam.innerHTML = abilityDam;
            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size:18px\">" + abilityName + "&nbsp;&nbsp;&nbsp; " + abilityDam + "</span>" + "</p>" +
                abilityRange + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aow3db/Icons/Abilities/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder_" + c).appendChild(btn);
            tex.appendChild(spa);

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

            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aow3db/Icons/Passives/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder_" + c).appendChild(btn);
            tex.appendChild(spa);

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

            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aow3db/Icons/Passives/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder_" + c).appendChild(btn);
            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);



        }
    }
    if (abilityName === "") {
        console.warn("no resistance found for " + a);
    }
}




function showUnit(a) {

    var hp, mp, shield, armor, descr, j, k, x, t, y, z, unitName, icon, imagelink, mpicon, prodcost, tier, levels = "";
    for (i in jsonUnits.units) {
        if (a == jsonUnits.units[i].name) {
            icon = document.getElementById("uniticon_" + a);
            icon.setAttribute("src", "/aow3db/Icons/UnitIcons/" + a + ".png");
            unitName = document.getElementById("unitstring_" + a);
            unitName.innerHTML = jsonUnits.units[i].string;
            descr = document.getElementById("description_" + a);
            descr.innerHTML = jsonUnits.units[i].description;
            imagelink = document.getElementById("vid_" + a);
            imagelink.setAttribute('src', "/aow3db/PreviewGifs/" + jsonUnits.units[i].image_link);
            hp = document.getElementById("hp_" + a);
            hp.innerHTML = jsonUnits.units[i].hp + "/" + jsonUnits.units[i].hp;
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
            levels.innerHTML = "<div style=\"background-color: rgba(30, 30, 40, 1); padding:10px; padding-bottom:5px; margin-bottom: 5 px;\"> Level Up: <x-medal_none> </x-medal_none> Recruit 0/" + jsonUnits.units[i].xp + " <x-xp></x-xp></div>" + "<div style=\"background-color: #23545B; padding:10px; padding-bottom:3px;padding-top:3px; \">" + "<p><x-medal_trooper> </x-medal_trooper> Trooper" + jsonUnits.units[i].level_trooper + "</div>" + "<div style=\"padding:10px; padding-bottom:3px;padding-top:3px;\"><p><x-medal_veteran> </x-medal_veteran> Veteran</p>" + jsonUnits.units[i].level_veteran + "</div>" + "<div style=\"background-color: #23545B; padding:10px; padding-bottom:3px;padding-top:3px; \">" + "<p><x-medal_expert> </x-medal_expert> Expert" + jsonUnits.units[i].level_expert + "</div>" + "<div style=\"padding:10px; padding-bottom:3px;padding-top:3px;\"><x-medal_elite> </x-medal_elite> Elite" + jsonUnits.units[i].level_elite + "</div>" + "<div style=\"padding:10px; padding-bottom:3px;padding-top:3px;background-color: #23545B;\"><p><x-medal_champion> </x-medal_champion> Champion</p><li> +10 <x-hp> </x-hp> Hit Points</li>" + "</div>";
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

}

function showAbility(a) {
    var j, text, abilityDam, abilityName, abilityDescr, abilityType = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;

            abilityDescr = jsonUnitAbilities.abilities[j].description;
            abilityDam = jsonUnitAbilities.abilities[j].damage;
            abilityType = jsonUnitAbilities.abilities[j].range;
            if (abilityType != null) {
                text = "<p>" + "<span style=\"font-size:18px\">" + abilityName + "&nbsp;&nbsp;&nbsp;" + abilityDam + "</span>" + "</p>" +
                    abilityType + "<hr>" + abilityDescr;
            } else {
                text = "<p>" + "<span style=\"font-size:18px\">" + abilityName + "" + abilityDam + "</span>" + "<hr>" + abilityDescr;
            }

        }

    }
    return text;
}

function searchData() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    searchUnits(filter);
}

function searchUnits(keyword) {
    var i, output, textvalue, j, l = "";
    var list = new Array();
    output = document.getElementById("searchOutput");

    for (i = 0; i < jsonUnits.units.length; i++) {
        textvalue = jsonUnits.units[i].string;
        if (textvalue.toUpperCase().indexOf(keyword) > -1) {
            if (list.length >= 1) {
                if (!isInArray(list, jsonUnits.units[i].name)) {
                    list.push(jsonUnits.units[i].name);
                }
            } else {
                list.push(jsonUnits.units[i].name);
            }



        }
        for (j = 0; j < jsonUnits.units[i].abilities.length; j++) {
            textvalue = jsonUnits.units[i].abilities[j].slug;
            if (textvalue.toUpperCase().indexOf(keyword) > -1) {
                if (list.length >= 1) {
                    if (!isInArray(list, jsonUnits.units[i].string)) {
                        list.push(jsonUnits.units[i].name);
                    }
                } else {
                    list.push(jsonUnits.units[i].name);
                }



            }
        }
        for (j = 0; j < jsonUnits.units[i].passives.length; j++) {
            textvalue = jsonUnits.units[i].passives[j].slug;
            if (textvalue.toUpperCase().indexOf(keyword) > -1) {
                if (list.length >= 1) {
                    if (!isInArray(list, jsonUnits.units[i].string)) {
                        list.push(jsonUnits.units[i].name);
                    }
                } else {
                    list.push(jsonUnits.units[i].name);
                }



            }
        }
        for (j = 0; j < list.length; j++) {
            addSearchResultUnit(list[j]);
        }

        // output.innerHTML = list.toString();
    }
}

function addSearchResultUnit(unit) {
    var output = document.getElementById("searchOutput");
    for (l = 0; l < jsonUnits.units.length; l++)
        if (unit == jsonUnits.units[l].name) {
            var holder = document.createElement("div");
            holder.className = ".unit_abilityslot ";
            var icon = document.createElement("img");
            icon.setAttribute("src", "/aow3db/Icons/UnitIcons/" + unit + ".png");
            var unitName = document.createElement("p");
            unitName.innerHTML = jsonUnits.units[l].string;
            output.innerHTML = "done the thing";
            output.appendChild(holder);
            holder.appendChild(icon);
            holder.append(unitName);
        } else {
            //output.innerHTML = "done some thing";
        }

}

function isInArray(array, search) {
    return array.indexOf(search) >= 0;
}

function showBuilding(a, b) {
    var buildingName, description, cost, type, prereq, j, imagelink = "";
    for (j in jsonBuildings.buildings) {
        if (a == jsonBuildings.buildings[j].slug) {
            buildingName = document.getElementById("buildingname" + b);
            buildingName.innerHTML = jsonBuildings.buildings[j].name;
            description = document.getElementById("buildingdescription" + b);
            description.innerHTML = jsonBuildings.buildings[j].description;
            type = document.getElementById("buildingtype" + b);
            type.innerHTML = jsonBuildings.buildings[j].type;

            cost = document.getElementById("buildingcost" + b);
            cost.innerHTML = "Cost : " + jsonBuildings.buildings[j].cost;
            if (jsonBuildings.buildings[j].prereq != "") {

                prereq = document.getElementById("buildingprereq" + b);
                prereq.innerHTML = jsonBuildings.buildings[j].prereq;
            }
            imagelink = document.getElementById("buildingicon" + b);
            imagelink.setAttribute("src", "/aow3db//Icons/Buildings/" + jsonBuildings.buildings[j].image_link + ".png");
        }
    }
}
