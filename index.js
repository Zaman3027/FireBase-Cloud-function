const functions = require('firebase-functions');
var admin = require("firebase-admin");
var db = admin.initializeApp();
db = db.database()
var ref = db.ref("/User/");

 exports.onMessageCreate = functions.database.ref('/User/{Userid}')
 .onCreate((snapshot,context)=>{
     const Userid = context.params.Userid;
     console.log(`New Userid ${Userid}`)
     const userData = snapshot.ref.parent.on('value',data=>{
         let keys = []
        data.forEach(value=>{
            keys.push(value.key)
            if(keys.length>10){
                var rand = Math.floor((Math.random() * 9) + 1);
                data.child(keys[0]).ref.remove()
            }
        })

        for(var i =0; i<keys.length; i++){
            keys.pop()
        }
    });

     console.log('Done')
     return userData;

 })