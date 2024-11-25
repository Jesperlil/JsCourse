const greeting = 'Hallå elle, hur de me dej? '

const currentDate = new Date().toDateString()

console.log(greeting + currentDate)

const filename = window.location.pathname.split('/')[1]
const nav = `
<ul class="mynavbar">
<li><a href="index.html">Me</a></li>
<li><a href="redovisning.html">Redovisning</a></li>
<li><a href="om.html">Om</a></li>  
<li><a href="kmom02.html">Kmom02</a></li>
<li><a href="kmom03.html"${filename === 'kmom03.html' ? 'active' : ''}>Kmom03</a></li>
<li><a href="kmom04.html"${filename === 'kmom04.html' ? 'active' : ''}>Kmom04</a></li>
<li><a href="kmom05.html"${filename === 'kmom05.html' ? 'active' : ''}>Kmom05</a></li>
<li><a href="kmom06.html"${filename === 'kmom06.html' ? 'active' : ''}>Kmom06</a></li>
<li><a href="kmom10.html"${filename === 'kmom10.html' ? 'active' : ''}>Kmom10</a></li>
</ul>
`

document.getElementById('mynav').innerHTML = nav
