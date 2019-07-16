import { CategoriaPage } from './../categoria/categoria';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the TabCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-categoria',
  templateUrl: 'tab-categoria.html',
})
export class TabCategoriaPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private app: App) {

  }

  ionViewDidLoad() {
    this.app.getRootNav().setRoot(CategoriaPage, true)
  }

}
