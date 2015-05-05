<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../Content/App.css" rel="stylesheet" />
    <script type="text/javascript" src="../Scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <%--<script type="text/javascript" src="/_layouts/15/sp.js"></script>--%>
    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/kendo.common-office365.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/kendo.office365.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/kendo.dataviz.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/kendo.dataviz.office365.min.css" />


    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/utils.js"></script>
    <script type="text/javascript" src="../Scripts/app.js"></script>
    <script type="text/javascript" src="../Scripts/kendo.all.min.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div id="sidebar">
        <img src="../Images/180.png" alt="Avatar" />
        <span id="employee-name">Margaret Peacock</span>
        <div>
            <h3 class="subtitle">Remaining days</h3>
            <span id="remaining-days"></span>
            <ul class="remaining-by-type">
                <li class="vacation">Vacation <span id="vacation-days"></span></li>
                <li class="bonus">Bonus <span id="bonus-days"></span></li>
            </ul>
        </div>
    </div>
    <div id="right-content">
        <div class="left-col">
            <h1>My leaves</h1>
            <div id="chart-totals"></div>
        </div>
        <div class="right-col">
            <h1>Leaves per month</h1>
            <div id="chart"></div>
        </div>
        <h1>Leaves Schedule</h1>
        <div class="scheduler-header">
            <a href="#" id="new-request" class="action-button">new leave request</a>
            <div class="team-picker">
                Select a team: <select id="dropdown"></select>
            </div>
        </div>
        <div id="scheduler"></div>
    </div>

    <script type="text/x-kendo-template" id="detail-template">
               <img src="#:data.assignee.avatar_url#" alt="" style="width:20px;height:20px; border-radius:10px" />
               <span>#:data.title#</span><br />
               <span>\\##:data.number#</span><br />
               <span>Opened: #:calculateDays(data.created_at)# by #:data.user.login#</span><br />
               Tags: <span>#:getLabels(data.labels)# </span>

    </script>

    <script id="customEditorTemplate" type="text/x-kendo-template">
         <div class="k-edit-label"><label for="name">Name: </label></div>
         <div data-container-for="name" class="k-edit-field">
            <input type="text" class="k-input k-textbox" name="name" required="required" data-bind="value:person">
        </div>

        <div class="k-edit-label">
        <label for="start">Start: </label>
        </div>
        <div data-container-for="start" class="k-edit-field">
            <input type="text" 
               data-role="datepicker" 
               data-type="date" 
               data-bind="value:start" 
               name="start"/>
        </div>

        <div class="k-edit-label">
        <label for="end">End: </label>
        </div>
        <div data-container-for="end" class="k-edit-field">
            <input type="text" 
               data-role="datepicker" 
               data-type="date" 
               data-bind="value:end" 
               name="end"/>
        </div>

        <div class="k-edit-label"><label for="vacationType">Vacation Type</label></div>
        <div data-container-for="vacationType" class="k-edit-field">
            <select id="vacationType" data-bind="value:vacationType" data-role="dropdownlist">
              <option value="1">Vacation</option>
              <option value="2">Bonus</option>
            </select>
      </div>
    </script>
</asp:Content>




