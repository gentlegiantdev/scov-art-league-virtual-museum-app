

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '981px',   '1280px' ],
			narrow:    [ '841px',   '980px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ '481px',   '736px'  ],
			mobilep:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

})(jQuery);


document.querySelector('button').addEventListener('click', getArt)

document.querySelector('#txtSearch').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      getArt();
    }
});


function getArt(){
    let choice = document.querySelector('input').value

    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${choice}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => { 
        console.log(data)

        let myArray= data.data
        let i= Math.floor(Math.random() * data.data.length);

        document.querySelector('#titleName').innerText = data.data[i].title
        document.querySelector('h4').innerText = data.data[i].thumbnail.alt_text
        let identification = data.data[i].id


        fetch(`https://api.artic.edu/api/v1/artworks/${identification}`)
        .then(res => res.json()) // parse response as JSON
        .then(secondData => {
            console.log(secondData)
            document.querySelector('#nine').innerText = secondData.data.medium_display
            document.querySelector('#eight').innerText = secondData.data.is_on_view
            document.querySelector('#seven').innerText = secondData.data.date_display
            document.querySelector('#six').innerText = secondData.data.dimensions
            document.querySelector('#five').innerText = secondData.data.department_title
            document.querySelector('#four').innerText = secondData.data.artwork_type_title
            document.querySelector('#three').innerText = secondData.data.exhibition_history
            document.querySelector('#two').innerText = secondData.data.place_of_origin
            document.querySelector('#one').innerText = secondData.data.provenance_text
            document.querySelector('h3').innerText = secondData.data.artist_title
            
            const artwork = secondData.data.image_id
            document.querySelector('img').src = `https://www.artic.edu/iiif/2/${artwork}/full/843,/0/default.jpg`  
        
    })
        
    })


    .catch(err => {
        console.log(`error ${err}`)
    });

}




