import { Component } from '@angular/core';

@Component({
    selector : 'app-home',
    template : `

    <ngb-alert type='danger'>
            <strong>danger!</strong> Better check yourself, you're not looking too good.
    </ngb-alert>

    <ngb-alert type='success'>
            <strong>success!</strong> Better check yourself, you're not looking too good.
    </ngb-alert>

            <ngb-alert>
                <!--span class='alert alert-warning alert-dismissible' -->
                    Welcome the Angular 2 app
                <!-- /span -->    
            </ngb-alert>

        <div style='color:red; background-color:yellow'>
             <p>Welcome to the home page</p>   
        </div>
    `
})
export class HomeComponent {

}