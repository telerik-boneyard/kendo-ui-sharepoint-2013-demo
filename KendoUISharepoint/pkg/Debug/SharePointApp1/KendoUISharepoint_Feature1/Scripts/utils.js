function calculateWorkDays(from, to) {
    var total = 1;
    while (from.getDate() !== to.getDate()) {
        if (from.getDay() !== 6 && from.getDay() !== 0) {
            total++;
        }
        from.setDate(from.getDate() + 1);
    }
    return total;
}

function getJobTitle(id) {
    var data = ["Sales Representative", "Sales Manager", "Sales Representative", "Sales Representative", "Inside Sales Coordinator", "Sales Representative", "Sales Representative", "Vice President", "Sales Representative"];
    return data[id]
}

function initLoginFailed() {
    alert("Did not authenticate");
}

function parseLeavesData(data) {
    var result = {};
    var paidUsed = 0;
    var bonusUsed = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].VacationType == 1) {
            paidUsed += calculateWorkDays(new Date(data[i].StartTime), new Date(data[i].EndTime))
        } else {
            bonusUsed += calculateWorkDays(new Date(data[i].StartTime), new Date(data[i].EndTime))
        }
    }

    result.paidTotal = data[0].VacationDays;
    result.paidUsed = paidUsed;
    result.paidLeft = result.paidTotal - result.paidUsed;
    result.bonusTotal = data[0].BonusDays;
    result.bonusUsed = bonusUsed;
    result.bonusLeft = result.bonusTotal - result.bonusUsed;
    setDaysTotal(result.paidLeft, result.bonusLeft);
    
    return result;
}

function setDaysTotal(paidLeft, bonusLeft) {
    if (paidLeft == 1) {
        $("#vacation-days").html(paidLeft + " days left");
    } else {
        $("#vacation-days").html(paidLeft + " days left");
    }

    if (bonusLeft == 1) {
        $("#bonus-days").html(bonusLeft + " day left");
    } else {
        $("#bonus-days").html(bonusLeft + " days left");
    }

}



function columnTemplate(dataItem) {
    if (dataItem.assignee) {
        return dataItem.assignee.login
    } else {
        return "unassigned"
    }
}

function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.slice(1) + "ListItem";
}

function assigneeTemplate(data) {
    if (data.assignee) {
        return "<img src=" + data.assignee.avatar_url + " style='width:20px; height:20px; border-radius:10px'/> " + data.assignee.login;
    } else {
        return "unassigned"
    }
}

function authorTemplate(data) {
    return data.user.login;
}

function updateLogo() {
    $("#ctl00_onetidHeadbnnr2").attr("src", "../Images/180x64.png");
}