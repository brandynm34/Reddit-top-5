// The above script searches reddit’s current top five posts on cats. Take these results and display them in HTML in a list. You are getting back the post title and URL, so make a list of clickable links. Make it pretty!
// Extra credit: Add a search bar where you can update the search term from cats to anything you want.
getReq('https://www.reddit.com/r/php/search.json?q=cats&limit=5', processAjax);

const newPosts = [];
function getReq(url, callback){
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function(){
        if(req.readyState === 4 && req.status === 200){
            callback(JSON.parse(req.responseText));
        }else{
            console.log('error', req.statusText);
        }
    }
    req.send(null);
}

function processAjax(object){
	const postList = getPostInfo(object);
	loadData();
}

function getPostInfo(postObject) {
	// We will explain the 'postData => {' syntax on Tuesday
	postObject.data.children.forEach(postData => {
		const post = { title: '', url: '' };

		postData = postData.data;
		post.title = postData.title;
		post.url = postData.url;
		newPosts.push(post);
	});

	return newPosts;
}

var pTag1 = document.getElementById("child1");
var pTag2 = document.getElementById("child2");


var parent1 = pTag1.parentNode;
var parent2 = pTag2.parentNode;


function loadData() {
	newPosts.forEach(post => {
    var p = document.createElement('p');
    var a = document.createElement('a');
		p.id = 'titleId';
    a.id = 'urlId';
    a.href =  post.url

		p.innerHTML = '<strong>Title: </strong>' + post.title;
    a.innerHTML =  'Click here for link'

		parent1.appendChild(p);
    parent2.appendChild(a);
	})
}
