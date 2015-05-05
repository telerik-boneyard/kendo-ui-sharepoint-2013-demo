$(document).ready(function () {

    var origin = document.location.origin;
    var leavesUrl = "/KendoUI/_api/web/lists/GetByTitle('Leaves')/items";
    var teamsUrl = "/KendoUI/_api/web/lists/GetByTitle('Teams')/items";
    var username = null;
    var teamId = null
    var user = null;
    var employeeId = null;

    $.ajax({
        url: origin + "/KendoUI/_api/web/lists/GetByTitle('Leaves')/items?$filter=substringof('Margaret Peacock',Person)",
        dataType: "json",
        headers: {
            "accept": "application/json; odata=verbose"
        },
        success: function (data) {
            username = data.d.results[0].Person;
            teamId = data.d.results[0].TeamID;
            user = data.d.results[0];
            employeeId = data.d.results[0].EmployeeID;
            init();
        }
    })
    updateLogo();

    function init() {
        initChart();
        initScheduler();

        $("#new-request").on("click", function () {
            var scheduler = $("#scheduler").data("kendoScheduler");
            scheduler.addEvent();
        })
        $("#dropdown").kendoDropDownList({
            change: function () {
                var value = parseInt(this.value())
                var scheduler = $("#scheduler").data("kendoScheduler");
                scheduler.dataSource.filter({ field: "teamId", operator: "eq", value: value });
                scheduler.resources[0].dataSource.filter({ field: "teamId", operator: "eq", value: value });
                scheduler.view(scheduler.view().name);
            },
            dataSource: {
                schema: {
                    data: function (data) {
                        return data.d.results
                    }
                },
                transport: {
                    read: {
                        dataType: "json",
                        headers: {
                            "accept": "application/json; odata=verbose"
                        },
                        url: origin + teamsUrl
                    }
                }
            },
            dataTextField: "Team",
            dataValueField: "TeamID"
        })
    }

    function initScheduler() {
        $("#scheduler").kendoScheduler({
            dataBound: onSchedulerDataBound,
            save: redrawCharts,
            remove: redrawCharts,
            date: new Date(),
            views: [{
                type: "timelineMonth",
                selected: true,
                columnWidth: 20,
                eventHeight: 50,
                workDayStart: new Date("2001/01/01 00:00"),
                workDayEnd: new Date("2001/01/01 23:59")
            }, "month", "day", "week" ],
            eventTemplate: function (data) {
                return data.person
            },
            groupHeaderTemplate: function (data) {
                var jobTitle = getJobTitle(data.value);
                return "<div class='employee-card'><img class='employee-photo' src='https://demos.telerik.com/aspnet-mvc/html5-dashboard-sample-app/content/employees/" + data.value + ".png' /><span class='employee-name'>" + data.text + "</span><span class='employee-jobtitle'>" + jobTitle + "</span></div>"
            },
            editable: {
                template: $("#customEditorTemplate").html(),
            },
            dateHeaderTemplate: function (data) {
                return data.date.getDate();
            },
            group: {
                resources: ["employeeId"],
                orientation: "vertical"
            },
            dataSource: {
                filter: {
                    field: "teamId",
                    operator: "eq",
                    value: 1
                },
                schema: {
                    model: {
                        id: "Id",
                        fields: {
                            title: { from: "EventTitle" },
                            employeeId: { from: "EmployeeID", defaultValue: employeeId },
                            start: { type: "date", from: "StartTime", defaultValue: new Date() },
                            end: { type: "date", from: "EndTime", defaultValue: new Date() },
                            isAllDay: { type: "boolean", from: "AllDay", defaultValue: true },
                            person: { from: "Person", defaultValue: username },
                            team: { from: "Team", defaultValue: "Kendo UI" },
                            teamId: { from: "TeamID", defaultValue: teamId },
                            vacationType: { from: "VacationType", defaultValue: 1 }
                        }
                    },
                    data: function (data) {
                        return data.d && data.d.results ? data.d.results : [data.d];
                    }
                },
                transport: {
                    parameterMap: function (data, type) {
                        if (type != "read") {
                            return kendo.stringify({
                                EventTitle: data.EventTitle,
                                StartTime: data.StartTime,
                                EndTime: data.EndTime,
                                Team: data.Team,
                                TeamID: data.TeamID,
                                Person: data.Person,
                                VacationType: data.VacationType,
                                EmployeeID: data.EmployeeID,
                                Id: type != "create" ? data.Id : undefined,
                                __metadata: type == "create" ? { type: GetItemTypeForListName("Leaves") } : undefined

                            });
                        }
                        return kendo.data.transports["odata"].parameterMap.apply(this, arguments);
                    },
                    read: {
                        dataType: "json",
                        headers: {
                            "accept": "application/json; odata=verbose"
                        },
                        url: origin + leavesUrl
                    },
                    create: {
                        headers: {
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                            "accept": "application/json; odata=verbose"
                        },
                        type: "POST",
                        contentType: "application/json;odata=verbose",
                        url: origin + leavesUrl
                    },
                    update: {
                        headers: {
                            "accept": "application/json; odata=verbose",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                            "X-HTTP-Method": "MERGE",
                            "If-Match": "*"
                        },
                        contentType: "application/json; charset=utf-8",
                        type: "POST",
                        url: function (model) {
                            return origin + leavesUrl + "(" + model.Id + ")"
                        }
                    },
                    destroy: {
                        headers: {
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                            "X-Http-Method": "DELETE",
                            "If-Match": "*"
                        },
                        type: "POST",
                        url: function (model) {
                            return origin + leavesUrl + "(" + model.Id + ")"
                        }
                    }
                }
            },
            resources: [
                {
                    field: "employeeId",
                    dataSource: {
                        data: [
                                { value: 1, teamId: 1, text: "Margaret Peacock", color: "#e03163" },
                                { value: 2, teamId: 1, text: "Steven Buchanan", color: "#6544b4" },
                                { value: 3, teamId: 1, text: "Michael Suyama", color: "#3a97f1" },
                                { value: 4, teamId: 1, text: "Robert King", color: "#3abad2" },
                                { value: 5, teamId: 1, text: "Laura Callahan", color: "#59ab54" },
                                { value: 6, teamId: 2, text: "Anne Dodsworth", color: "#cdd846" },
                                { value: 7, teamId: 2, text: "Janet Leverling", color: "#f6cb32" },
                                { value: 8, teamId: 2, text: "Andrew Fuller", color: "#f75b2c" },
                                { value: 9, teamId: 2, text: "Nancy Davolio", color: "#af2923" }
                        ],
                        filter: { field: "teamId", operator: "eq", value: 1 }
                    },
                    title: "Person",
                    name: "employeeId"
                }
            ]
        })
    }

    function initChart() {
        $("#chart").kendoChart({
            dataSource: {
                group: {
                    field: "type"
                },
                transport: {
                    read: {
                        url: origin + "/KendoUI/_api/web/lists/GetByTitle('Leaves')/items?$filter=substringof('Margaret Peacock',Person)",
                        dataType: "json",
                        headers: {
                            "accept": "application/json; odata=verbose"
                        }
                    }
                },
                schema: {
                    parse: function (response) {
                        var result = [];
                        for (var i = 0; i < response.d.results.length; i++) {
                            var item = {};
                            var date = new Date(response.d.results[i].StartTime);
                            date.setHours(0, 0, 0, 0);
                            date.setDate(1);
                            item.type = response.d.results[i].VacationType;
                            item.month = date
                            item.days = Math.floor((Date.parse(response.d.results[i].EndTime) - Date.parse(response.d.results[i].StartTime)) / 86400000) + 1;
                            result.push(item);
                        }
                        return result
                    }
                }
            },
            chartArea: {
                background: "transparent"
            },
            seriesColors: ["#0072c6", "#ec236a"],
            series: [{
                stack: true,
                field: "days",
                categoryField: "month",
                gap: 0.2,
                spacing: 0,
                overlay: {
                    gradient: "none"
                }
            }],
            valueAxis: [{
                labels: {
                    format: "{0}"
                },
                line: {
                    visible: false
                },
                majorTicks: {
                    visible: false
                        }
            }],
            categoryAxis: [{
                majorTicks: {
                    visible: false
                },
                labels: {
                    format: "{0:MMM}"
                },
                min: new Date("2015/01/01"),
                max: new Date("2015/12/01")
            }],
            legend: {
                visible: false
            },
            tooltip: {
                visible: true,
                template: "#:kendo.toString(category, 'MMM')#: #:value# day#:value > 1 ? 's': ''# off"
            }
        })

        $.ajax({
            url: origin + "/KendoUI/_api/web/lists/GetByTitle('Leaves')/items?$filter=substringof('Margaret Peacock',Person)",
            dataType: "json",
            headers: {
                "accept": "application/json; odata=verbose"
            },
            success: function (data) {
                var data = parseLeavesData(data.d.results);
                initLeavesChart(data);
            }
        })
    }

    function initLeavesChart(data) {
        $("#chart-totals").kendoChart({
            legend: {
                visible: false
            },
            chartArea: {
                background: "transparent"
            },
            seriesColors: ["#0072c6", "#ec236a"],
            seriesDefaults: {
                type: "bar",
                stack: true,
                overlay: {
                    gradient: "none"
                }
            },
            series: [{
                name: "Paid",
                data: [data.paidTotal, data.paidUsed, data.paidLeft]
            }, {
                name: "Bonus",
                data: [data.bonusTotal, data.bonusUsed, data.bonusLeft]
            }],
            valueAxis: {
                labels: {
                    format: "{0}"
                },
                line: {
                    visible: false
                },
                majorTicks: {
                    visible: false
                }
            },
            categoryAxis: {
                categories: ["Entitled", "Used", "Remaining"],
                majorTicks: {
                    visible: false
                },
                line: {
                    visible: false
                }
            },
            tooltip: {
                visible: true,
                format: "{0}%",
                template: "#= series.name #: #= value #"
            }
        });
    }

    function onSchedulerDataBound(e) {
        var data = this.dataSource.data();
        var days = 0;
        var remaining = 0;
        var vacation = 0;
        var bonus = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].employeeId == employeeId) {
                var from = new Date(data[i].start);
                var to = new Date(data[i].end);

                if (data[i].vacationType == 1) {
                    vacation += calculateWorkDays(from, to);
                } else {
                    bonus += calculateWorkDays(from, to);
                }
            }
        }
        remaining = user.VacationDays + user.BonusDays - (vacation + bonus);
        $("#remaining-days").html(remaining + " days left");
        setDaysTotal(user.VacationDays - vacation, user.BonusDays - bonus);
    }

    function redrawCharts() {
        $("#chart").data("kendoChart").dataSource.read();
        $("#chart-totals").data("kendoChart").dataSource.read();
    }
});

