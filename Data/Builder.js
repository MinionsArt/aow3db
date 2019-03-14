function addUnitTypeIcon(a,b) {
    var abilityName, abilityIcon, abilityDescr = "";
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
                  if(b == "yes"){
                abilityName = "<span style=\"color:magenta\">" + abilityName + "</span>";
            }
            tex.innerHTML = abilityName;
            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "./Icons/Passives/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder").appendChild(btn);
            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);

        }
    }

}

function addAbilityslot(a,b) {
    var abilityName, abilityIcon, abilityDescr, abilityDam, abilityAcc, abilityRange, abilityType = "";

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
               if(b == "yes"){
                abilityName = "<span style=\"color:magenta\">" + abilityName + "</span>";
            }
            tex.innerHTML = abilityName;
            var dam = document.createElement("DIV");
            dam.className = "ability_damage";
            dam.innerHTML = abilityDam;
            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size:18px\">" + abilityName + "&nbsp;&nbsp;&nbsp;" + abilityDam + "</span>" + "</p>"+
                abilityRange + "<hr>" + abilityDescr;
            imag.setAttribute("src", "./Icons/Abilities/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder").append(btn);
            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);
            btn.append(dam);

        }
    }

}

function addPassiveslot(a,b) {
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
                  if(b == "yes"){
                abilityName = "<span style=\"color:magenta\">" + abilityName + "</span>";
            }
            tex.innerHTML = abilityName;
         
            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "./Icons/Passives/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder").appendChild(btn);
            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);

        }
    }

}

function addResistanceSlot(a,b) {
    var abilityName, abilityIcon, abilityDescr, abilityDam = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].slug;
            abilityDescr = jsonUnitAbilities.abilities[j].description;
            abilityDam = jsonUnitAbilities.abilities[j].damage;
            var btn = document.createElement("DIV");
            btn.className = "unit_passiveslot";
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";
            var spa = document.createElement("SPAN");
            var tex = document.createElement("DIV");
            var dam = document.createElement("DIV");
            dam.className = "ability_damage";
            dam.innerHTML = abilityDam;

            tex.className = "tooltip";
                  if(b == "yes"){
                abilityName = "<span style=\"color:magenta\">" + abilityName + "</span>";
            }
            tex.innerHTML = abilityName;

            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "./Icons/Resistances/" + abilityIcon + ".png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder").appendChild(btn);
            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);
            btn.append(dam);


        }
    }

}

function addEliteSkill(a) {
    var abilityName, abilityIcon, abilityDescr = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].slug;
            abilityDescr = jsonUnitAbilities.abilities[j].description;

            var btn = document.createElement("DIV");
            btn.className = "unit_elite_skill";
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";
            var spa = document.createElement("SPAN");
            var tex = document.createElement("DIV");
            tex.className = "tooltip";
            tex.innerHTML = abilityName;
            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "./Icons/UI/elite_rank.png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder").appendChild(btn);
            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);

        }
    }

}

function showUnit(a) {
    var hp, mp, shield, armor, descr, j, k, x, y, z, unitName, icon, imagelink, prodcost, tier, levels = "";
    for (i in jsonUnits.units) {
        if (a == jsonUnits.units[i].name) {
            icon = document.getElementById("uniticon");
            icon.setAttribute("src", "./Icons/UnitIcons/" + a + ".png");
            unitName = document.getElementById("unitstring");
            unitName.innerHTML =  jsonUnits.units[i].string;
            descr = document.getElementById("description");
            descr.innerHTML = jsonUnits.units[i].description;
            imagelink = document.getElementById("vid")
            imagelink.setAttribute('src', "./UnitPreviews/" + jsonUnits.units[i].image_link);
            hp = document.getElementById("hp")
            hp.innerHTML = jsonUnits.units[i].hp + "/" +jsonUnits.units[i].hp;
            armor = document.getElementById("defense")
            armor.innerHTML = jsonUnits.units[i].armor;
            shield = document.getElementById("resistance")
            shield.innerHTML = jsonUnits.units[i].shield;
            mp = document.getElementById("mp");
            mp.innerHTML = jsonUnits.units[i].mp +"/" + jsonUnits.units[i].mp;
            tier = document.getElementById("tier");
            tier.innerHTML = "Tier " + jsonUnits.units[i].tier;
            prodcost = document.getElementById("productioncost");
            prodcost.innerHTML = "Cost: " + jsonUnits.units[i].cost;
            levels = document.getElementById("levelups");
           levels.innerHTML = "<div style=\"background-color: rgba(30, 30, 40, 1); padding-bottom:5px; margin-bottom:5px;\"> Level Up: &nbsp;<x-medal_none> </x-medal_none>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Recruit </div>"  +"<div style=\"background-color: #23545B; \">"+ "<p><x-medal_trooper> </x-medal_trooper> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Trooper"+ jsonUnits.units[i].level_trooper + "</div>"+ "<p><x-medal_veteran> </x-medal_veteran> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Veteran" + jsonUnits.units[i].level_veteran +"<div style=\"background-color: #23545B;\">"+  "<p><x-medal_expert> </x-medal_expert> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Expert" + jsonUnits.units[i].level_expert + "</div>"+ "<p><x-medal_elite> </x-medal_elite> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Elite" + jsonUnits.units[i].level_elite + "<div style=\"background-color: #23545B;\">"+  "<p><x-medal_champion> </x-medal_champion> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Champion <ul> <li> +10 <x-hp> </x-hp></li></ul>" + "</div>";
            for (k in jsonUnits.units[i].abilities) {
                addAbilityslot(jsonUnits.units[i].abilities[k].slug, jsonUnits.units[i].abilities[k].unique);

            }
           

            for (x in jsonUnits.units[i].passives) {
                addPassiveslot(jsonUnits.units[i].passives[x].slug,jsonUnits.units[i].passives[x].unique);

            }
             for (z in jsonUnits.units[i].resistances) {
                addResistanceSlot(jsonUnits.units[i].resistances[z].slug,jsonUnits.units[i].resistances[z].unique);

            }
             for (j in jsonUnits.units[i].unit_types) {
                addUnitTypeIcon(jsonUnits.units[i].unit_types[j].slug,jsonUnits.units[i].unit_types[j].unique);

            }


            addEliteSkill(jsonUnits.units[i].elite_skill);



        }
    }

}

function showAbility(a) {
    var hp, mp, shield, armor, descr, j, abilityname, imagelink = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityname = document.getElementById(a + "_description");
            abilityname.innerHTML = jsonUnitAbilities.abilities[j].description;

        }
    }
}
