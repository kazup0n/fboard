import Firebase from 'firebase';

let firebase = new Firebase('https://fboard.firebaseio.com/');

export function isLoggedIn(){
    return firebase.getAuth() ? true: false;
}

export function login(){
    return new Promise(function(resolve, reject){
        firebase.authWithOAuthPopup('google', function(error, authData){
            if(error){
                reject(error);
            }else{
                resolve(authData);
                window.location.reload();
            }
        });
    });
};

export function logout(){
    firebase.unauth();
    window.location.reload();
}

export function getSlides(){
    return new Promise(function(resolve, reject){
        firebase.child('slides').once('value', function(snapshot){
            let slides = [];
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key();
                var childData = childSnapshot.val();
                slides.push(Object.assign({}, childData, {id: key}));
            });
            resolve(slides);
         });
    });
}

export function updateSlide(id, slide){
    return new Promise(function(resolve, reject){
        firebase.child('slides/' + id).set(slide, function(error){
            if(error){
                reject(error);
            }else{
                resolve();
            }
        });
    });
}

export function addSlide(slide){
    return new Promise(function(resolve, reject){
        firebase.child('slide').push(slide, function(){
            resolve();
        });
    });
}

export function removeSlide(id){
    return new Promise(function(resolve, reject){
            firebase.child('slides/' + id).remove(function(error){
                if(error){
                    reject(error);
                }else{
                    resolve();
                }
            });
    });
}