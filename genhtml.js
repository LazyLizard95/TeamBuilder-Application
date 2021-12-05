const fs = require('fs');


function generate(employees){
const hdr =`<!DOCTYPE html>
<html>
<head>
<link rel='stylesheet' href='style.css'>
</head>
<h1>Your Super Team!</h1>\n`;
fs.writeFile("team.html", hdr ,err => {if(err){console.log("Error when generating Manager")}})
const managerHtml =  `<br><div class="card"><h1 class="manaName">${employees.pos}: ${employees.name}</h1> 
<h2 class="empId">ID:#${employees.id}</h2>
<h2 class="empEmail"><a href ="mailto:${employees.email}" target="blank">${employees.email}</a></h2>
<h2> Office:#${employees.officeNum}</h2></div><br>\n`
        
const engiHtml =  `<br><div class="card"><h1 class="engiName">${employees.pos}: ${employees.name}</h1> 
<h2 class="empId">ID:#${employees.id}</h2>
<h2 class="empEmail"><a href ="mailto:${employees.email}" target="blank">${employees.email}</a></h2>
<h2><a href="https://github.com/${employees.gitHub}" target="blank">GitHub: ${employees.gitHub}</a></h2></div><br>\n`
        
const internHtml =  `<br><div class="card"><h1 class="internName">${employees.pos}: ${employees.name}</h1> 
<h2 class="empId">ID:#${employees.id}</h2>
<h2 class="empEmail"><a href ="mailto:${employees.email}" target="blank">${employees.email}</a></h2>
<h2>University:${employees.school}</h2></div><br>\n`
    
    
    
    employees = JSON.stringify(employees);
    employees = JSON.parse(employees);
    switch(employees.pos){
        
        case "Manager":
        fs.appendFile("team.html", managerHtml,err => {if(err){console.log("Error when generating Manager")}}) 
        break;
        case "Intern":
        fs.appendFile("team.html", internHtml,err => {if(err){console.log("Error when generating Intern")}}) 
        break;
        case "Engineer":
        fs.appendFile("team.html", engiHtml,err => {if(err){console.log("Error when generating Engineer")}}) 
        break;
        default:
        console.log("Case not found!");
        break;
}}

    module.exports = generate;

