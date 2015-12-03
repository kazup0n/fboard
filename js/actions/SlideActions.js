import jQuery from 'jQuery';
import Firebase from 'firebase';

let firebase = new Firebase('https://fboard.firebaseio.com/slides');

export default class SlideActions {

	static getSlides(){
		firebase.once('value', function(slides){
			let markdowns = [];
			slides.forEach(function(slide){
				let now = Date.now();
				if(Date.parse(slide.child('issuedAt').val()) <= now && now <= Date.parse(slide.child('expiredAt').val())){
					markdowns.push("## " + slide.child('title').val() + "\n\n" + slide.child('body').val());
				}
			});
			jQuery('#slides').html(markdowns.join("\n\n---\n\n"));
			setTimeout(function(){
				Reveal.initialize({
					center: true,
					transition: 'slide',
					autoSlide: 3000,
					dependencies: [
						{ src: 'public/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
						{ src: 'public/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					]
				});
				Reveal.addEventListener('slidechanged', function(){
					if(Reveal.isLastSlide()){
						setTimeout(function(){ Reveal.slide(0, 0, 0); Reveal.toggleAutoSlide(true);}, 3000);
					}
				});

			}, 500);
			firebase.once('child_changed', function(){
				window.location.reload();
			});
			firebase.once('child_removed', function(){
				window.location.reload();
			});
		});
	}
}
