##Frameworks Wars

This tool is an excellent way to compare stats, available through GitHub API, on different front-end frameworks.

Considering the requirement of building a tool that wouldn't require a page refresh, I was first inclined to use React or Angular but decided to take the challenge of keeping a very simple file structure and make most of the lifting with Vanilla JS. 

During the planning phase, I spend some time on figuring out the best way to consume the API and store the data locally. That led me to decide to use javascript's native fetch, then turn the data into JSON.

As I'm using Bootstrap to speed up the layout of the UX, I leveraged on jQuery mainly for selecting DOM elements. 

The tool is broken down into files according to their features:
main.js - main controller
table.js - initialization and methods for the table
chart.js - initialization and methods for the chart

I've included some comments throughout the source files as well.

The libraries used for this project are:
Bootstrap + jQuery
DataTables
and Chart.js

Overall I had a lot of fun with this challenge, deciding on a framework might require more consideration than what this statistics can offer, but I sure hope this will help you in your decision. 


