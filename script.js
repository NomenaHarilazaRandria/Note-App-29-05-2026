const form = document.getElementById('noteForm');
const outputNotes = document.getElementById('notesContainer');
const noteTitre = document.getElementById('titleInput');
const noteText = document.getElementById('contentInput');
const nbrChar = document.getElementById('nbrChar');

//compteur de caractère
noteText.addEventListener('input',()=>{
	nbrChar.textContent = noteText.value.length;
});
let notes = [];
let editId = null;
//fonction qui permet de compter le nombre de caractères dans le textarea
form.addEventListener("submit", function(e) {
	e.preventDefault();
	if(!(noteTitre.value && noteText.value)){
		alert('Veuillez remplir le titre et la note !');
		return;
	} else {
	if(editId === null){
		addNotes();
		saveNotes();
	}else{
		updateNotes();
		saveNotes();
	}
	noteTitre.value="";
	noteText.value ="";
	renderNotes();
	editId = null;
	}
});

//fonction qui permet d'ajouter chaque note dans le tableau notes
function addNotes(){
	notes.unshift(
	{
		id:Date.now(),
		title : noteTitre.value,
		text: noteText.value,
		date: new Date().toLocaleString()
	}
	);
	noteTitre.value="";
	noteText.value ="";
}
//fonction qui permet d'afficher les notes, de supprimer et de modifier
function renderNotes(){
	outputNotes.textContent = "";
	notes.forEach((el)=>{
		const divContainer = document.createElement('div');
		divContainer.classList.add('carte');
		const h2 = document.createElement('h2');
		const p = document.createElement('p');
		const spanText = document.createElement('span');
		spanText.classList.add('titleText');
		const spanDate = document.createElement('span');
		spanDate.classList.add('titleDate');
		spanText.textContent = el.title;
		spanDate.textContent = el.date;
		h2.appendChild(spanText);
		h2.appendChild(spanDate);
		p.textContent = el.text;
		const divControle = document.createElement('div');
		divControle.classList.add('controles');
		const sprBtn = document.createElement('button');
		sprBtn.textContent = "Supprimer";
		sprBtn.addEventListener('click',()=>{
			notes = notes.filter(note => note.id !== el.id);
			saveNotes();
			renderNotes();
		});
		const modifBtn = document.createElement('button');
		modifBtn.textContent ="Modifier";
		modifBtn.addEventListener('click',()=>{
			editId = el.id;
			noteTitre.value = el.title;
			noteText.value = el.text;
		});
		divControle.appendChild(sprBtn);
		divControle.appendChild(modifBtn);
		divContainer.appendChild(h2);
		divContainer.appendChild(p);
		divContainer.appendChild(divControle);
		outputNotes.appendChild(divContainer);
	});
}
//fonction qui permet de modifier une note dans notes

function updateNotes(){
	const note = notes.find(note => note.id === editId);
	note.title = noteTitre.value;
	note.text = noteText.value;
}
//fonction pour sauvegarder notes
function saveNotes(){
	localStorage.setItem('notes',JSON.stringify(notes));
}

//fonction pour lire les notes enregistrés.
function loadNotes(){
	if(localStorage.getItem('notes')){
		notes = JSON.parse(localStorage.getItem('notes'));
		renderNotes();
	}
}

loadNotes();