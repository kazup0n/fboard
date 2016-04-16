import * as Firebase from '../firebase';

export function getSlides(){
    return (dispatch) =>{
        return Firebase.getSlides().then(function(slides){
            dispatch({
                type: 'GET_SLIDES',
                slides: slides
            });
        });
    };
}

export function login(){
    return (dispatch) =>{
        Firebase.login();
    };
}

export function addSlide(slide){
    return (dispatch) =>{
        Firebase.addSlide(slide).then(function(){
            return Firebase.getSlides();
        }).then(function(slides){
            dispatch({
                type: 'GET_SLIDES',
                slides: slides
            });
        });
    }
}

export function removeSlide(slide){
    return (dispatch) =>{
        Firebase.removeSlide(slide.id).then(function(){
            return Firebase.getSlides();
        }).then(function(slides){
            dispatch({
                type: 'GET_SLIDES',
                slides: slides
            });
        });
    };
}

export function updateSlide(slide){
    return (dispatch) =>{
        Firebase.updateSlide(slide.id, slide).then(function(){
            return Firebase.getSlides();
        }).then(function(slides){
            dispatch({
                type: 'GET_SLIDES',
                slides: slides
            });
        });
    };
}