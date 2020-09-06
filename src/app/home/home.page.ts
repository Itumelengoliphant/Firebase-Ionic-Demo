import { Component } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AlertController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {ToastController} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items: Observable<any[]> 

  getData(){ 
    this.firestore.collection('ToDoList').valueChanges().subscribe((items: any) => { 
    this.items = items; 
    console.log(items) 
    }) }
    
    delete(id) { 
      console.log(id); 
      this.firestore.collection("ToDoList").doc(id).delete().then(()=>{ 
      this.presentToast("deleted successfully") 
      }) 
      } 
    

  constructor(private firestore: AngularFirestore, public alertController: 
    AlertController, public toastController: ToastController){this.getData();}

    submit(message) { 
      let id = this.firestore.createId(); 
      this.firestore.collection('ToDoList').doc(id).set({ 
      todoItem: message 
    }).then(() => { 
      this.presentToast("Added successfully") 
      }).catch((error) => { 
      console.log(error); 
      })     
      

} async presentAlertPrompt() { 
  const alert = await this.alertController.create({ 
  cssClass: 'my-custom-class', 
  header: 'Todo item', 
  inputs: [ 
  { 
  name: 'item', 
  type: 'text', 
  placeholder: 'Enter a todo item' 
  }, 
  ], 
  buttons: [ 
  { 
  text: 'Cancel', 
  role: 'cancel', 
  cssClass: 'secondary', 
  handler: () => { 
  console.log('Confirm Cancel'); 
  } 
}, { text: 'Add', 
handler: (item) => { 
console.log(item.item) 
this.submit(item.item)
} 
} 
] 
}); 
await alert.present();
 }
 
 async presentToast(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

async presentToastWithOptions() {
  const toast = await this.toastController.create({
    header: 'Toast header',
    message: 'Click to Close',
    position: 'top',
    buttons: [
      {
        side: 'start',
        icon: 'star',
        text: 'Favorite',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Done',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  toast.present();
}


}
