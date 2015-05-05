function initGrid() {
    $("#grid").kendoGrid({
        toolbar: ["add"],
        editable: "popup",
        columns: [
            { field: "FirstName" },
            { field: "FullName" },
            { field: "Twitter" },
            { command: ["edit", "destroy"] }
        ],
        filterable: true,
        sortable: true,
        pageable: true,
        dataSource: {
            serverFiltering: true,
            serverSprting: true,
            type: "odata",
            schema: {
                model: {
                    id: "Id"
                },
                data: function (data) {
                    return data.d && data.d.results ? data.d.results : [];
                }
            },
            transport: {
                parameterMap: function (data, type) {
                    if (type != "read") {
                        return kendo.stringify({
                            FirstName: data.FirstName,
                            FullName: data.FullName,
                            Twitter: data.Twitter,
                            Id: type != "create" ? data.Id : undefined
                        });
                    }
                    return kendo.data.transports["odata"].parameterMap.apply(this, arguments);
                },
                read: {
                    dataType: "json",
                    headers: {
                        "accept": "application/json; odata=verbose"
                    },
                    url: origin + "/SPGrid2/_api/web/lists/GetByTitle('MyList')/items"
                },
                update: {
                    headers: {
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        "X-HTTP-Method": "MERGE",
                        "If-Match": "*"
                    },
                    type: "POST",
                    url: function (model) {
                        return origin + "/SPGrid2/_api/web/lists/GetByTitle('MyList')/items(" + model.Id + ")"
                    }
                },
                create: {
                    headers: {
                        "X-RequestDigest": $("#__REQUESTDIGEST").val()
                    },
                    type: "POST",
                    url: origin + "/SPGrid2/_api/web/lists/GetByTitle('MyList')/items"
                },
                destroy: {
                    headers: {
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        "X-Http-Method": "DELETE",
                        "If-Match": "*"
                    },
                    type: "POST",
                    url: function (model) {
                        return origin + "/SPGrid2/_api/web/lists/GetByTitle('MyList')/items(" + model.Id + ")"
                    }
                }
            }
        }
    })
}