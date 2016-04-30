import Firebase from 'firebase';

let firebase = new Firebase('https://fboard.firebaseio.com/');

export function isLoggedIn(){
    return firebase.getAuth() ? true: false;
}

export function login(email, password){
    return new Promise(function(resolve, reject){
        firebase.authWithPassword({email: email, password: password}, function(error, authData){
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
        firebase.child('slides').push(slide, function(){
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

export function speak(text){
    return new Promise(function(resolve, reject){
        firebase.child('messages').push({message: text,  postedAt: Date.now()/1000}, function(error){
            if(error){
                reject(error);
            }else{
                resolve();
            }
        });
    });
}

export function startVoiceListening(){
        let messageRef = firebase.child('messages');
        let isBooting = true;
         messageRef.orderByChild('postedAt').limitToLast(1).on('child_added', function(msg){
            if(isBooting){
                isBooting = false;
                return;
            }
            var synthes = new SpeechSynthesisUtterance(msg.child('message').val());
            synthes.lang = "ja-JP";
            synthes.volume = 5;
            var speak = function(){ speechSynthesis.speak(synthes);};
            speak();
            setTimeout(speak, 500);
        });

        let timestamp = new Date();
        timestamp.setDate(timestamp.getDate()-2);
        messageRef.orderByChild("postedAt").endAt(timestamp.getTime()/1000).on("child_added", function(snap){
            snap.ref().remove();
        });
}
