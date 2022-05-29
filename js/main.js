//Make an api request using async await

document.querySelector('#submit').addEventListener('click', getReq)

async function getReq() {
	
	const children = retrieveValues('haveChildren')
	const physicallyActive = retrieveValues('physicallyActive')
	const bigDogs = retrieveValues('bigDogs')

	const res = await fetch(`/api?children=${children}&physicallyActive=${physicallyActive}&bigDogs=${bigDogs}`)
	const data = await res.json()

  	console.log(data);

	document.querySelector('h2').innerText = data.dog
	document.getElementById('photo').style.background = `url(${data.pic})`
	document.getElementById('photo').style.backgroundRepeat = "no-repeat"
	document.getElementById('photo').style.backgroundPosition = "bottom"

}

// Returns boolean value pulled from DOM
function retrieveValues(radioName) {
	if (document.querySelector(`#${radioName}Y`).checked) {
		return true
	} else if (document.querySelector(`#${radioName}N`).checked) {
		return false
	} else {
		return 'err'
	}
}

//                       isActive? children?  big?
//Greyhound               yes      yes        yes
//Shih Tzu                yes      yes        no
//Chihuahua               yes      no         no
//Yorkshire Terrior       no       no         no
//Rottweiler              no       no         yes
//Saint Bernard           no       yes        yes
//Maltese                 no       yes        no
//Pitbull                 yes      no         yes
