function fetchIssues()
{
	let issues = JSON.parse(localStorage.getItem("issues"));
	let issuesList = document.getElementById("issuesList");
	issuesList.innerHTML = "";
	if(issues === null)
		issues = [];
	for (let i = 0; i < issues.length; i++){
		let issue = issues[i];
		let id =issue.id;
		let desc = issue.description;
		let severity = issue.severity;
		let assignedTo = issue.status;
		issuesList.innerHTML += "<div class='well'>" 
								+ "<h6>Issue ID: " + id + "</h6>"
								+ "<p><span class='label label-info'>" + status + "</span></p>"
								+ "<h3>" + desc +"</h3>"
								+ "<p><span class='glyphicon glyphicon-time'></<span> " + severity + "</p>"
								+ "<p><span class='glyphicon glyphicon-user'></<span> " + assignedTo + "</p>"
								+ "<a href='#' class='btn btn-warning' onclick='setStatusClosed(\"" + id + "\")'>Close</a> "
								+ "<a href='#' class='btn btn-warning' onclick='deleteIssue(\"" + id + "\")'>Delete</a>";
	}
}

//Setting an event listener on submit for the form
document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

//saveIssue
function saveIssue(e)
{
	//Getting a random ID using chance.js
	let issueId = chance.guid();
	//Getting the issue properties from the inputs
	let issueDesc = document.getElementById("issueDescInput").value;
	let issueSeverity = document.getElementById("issueAssignedToInput").value;
	let issueStatus = "open";
	//Creating a new issue object
	let issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		status: issueStatus
	}
	//
	let issues = [];
	if(localStorage.getItem("issues") !== null)
		issues = JSON.parse(localStorage.getItem("issues"));
	issues.push(issue);
	localStorage.setItem("issues", JSON.stringify(issues));
	document.getElementById("issueInputForm").reset();
	fetchIssues();
	//Avoid submitting the form
	e.preventDefault();
}

//setStatusClosed
function setStatusClosed(id)
{
	let issues = JSON.parse(localStorage.getItem("issues"));
	for(let i=0; i<issues.length; i++)
	{
		if(issues[i].id == id)
			issues[i].status = "closed";
	}
	localStorage.setItem("issues", JSON.stringify(issues));
	fetchIssues();
}

//deleteIssue
function deleteIssue(id)
{
	console.log(id);
	let issues = JSON.parse(localStorage.getItem('issues'));
	for(let i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues.splice(i, 1);
		}
	}
	localStorage.setItem('issues', JSON.stringify(issues));
  	fetchIssues();
}