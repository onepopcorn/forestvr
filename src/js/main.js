(function(){
	/* Preloader */
	var scene = document.querySelector('a-scene')
	var loading = document.querySelector('#preloader')
	
	if(scene.hasLoaded){
		start()
	} else {
		scene.addEventListener('loaded', start)
	}

	function start () {
		var startBtn = loading.querySelector('p')
		
		startBtn.innerText = 'click me to start'
		startBtn.classList.add('start_btn')

		startBtn.onclick = show_content

		
	}

	function show_content() {
		// Hide VR button if not mobile
		if(!scene.isMobile) {
			scene.setAttribute("vr-mode-ui","enabled: false")
		}

		document.body.querySelector('audio').play()

		// Show content
		document.body.removeChild(loading)
		document.body.classList.add('loaded')	
	}
})()