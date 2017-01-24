/* GA */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');


(function(){
	/* analytics */
	ga('create', 'UA-83939238-1', 'auto');
	ga('send', {
		hitType:'pageview',
		page: location.href 
	})

	/* Preloader */
	var loader = document.querySelector('a-assets')
	var scene = document.querySelector('a-scene')
	var loading = document.querySelector('#preloader')
	
	if(scene.hasLoaded){
		start()
	} else {
		scene.addEventListener('loaded', start)
	}

	var interval

	function start () {
		// Hide VR button if not mobile
		if(!scene.isMobile) {
			scene.setAttribute("vr-mode-ui","enabled: false")
		}

		// Show content
		document.body.removeChild(loading)
		document.body.classList.add('loaded')	
	}
})()