This repo provides an example of what a SharePoint add-in might look like with the Chart, DropDownList, and Scheduler components from Kendo UI 

![image](http://developer.telerik.com/wp-content/uploads/2016/06/kendo-ui-leaves.jpg)

SharePoint Online add-in that utilizes Kendo UI to visualize data stored in SharePoint that's integrated through its REST APIs. http://www.telerik.com/kendo-ui/ui-for-office-365-sharepoint/ 

<br /><br />

**Key files and folders located in the project structure** <br /><br />
-	Content: the content module for add-in stylesheets (including third-party stylesheets)<br />
-	Content/App.css: the default stylesheet for the add-in<br />
-	Pages/Default.aspx: the default starting page of the add-in<br />
-	Scripts: the scripts module for add-in JavaScript resources (including third-party stylesheets)<br />
-	Scripts/App.js: the default JavaScript file underlying the default starting page<br />
-	AppManifest.xml: the deployment package properties for your add-in<br /><br />
**This app demonstrates how to**<br /><br />
-	Add Kendo UI into a SharePoint add-in<br />
-	Reference the CDN-based stylesheets for the Office 365 theme that ships with Kendo UI and matches the default theme of SharePoint (works well with other front-end frameworks like Office UI Fabric)<br />
-	Configure the DataSource to access the SharePoint REST API<br />
-	Create SharePoint UI with the Chart, DropDownList, and Scheduler components from Kendo UI<br /><br />
**Why it makes sense to use Kendo UI**<br /><br />
-	70+ responsive UI components that integrate with the SharePoint REST API<br />
-	Built-in Office 365 theme<br />
-	Built-in export functionality to most common office formats, such as Excel, PDF and image files<br />
-	Compliance with widely-recognized accessibility standards (WAI-ARIA, WCAG 2.0 and Section 508)<br />
