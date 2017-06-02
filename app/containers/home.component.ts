import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    template: `

        <div style='margin-top:20px'>
            <h1 class='h1 text-center'> Home Page </h1>
            <div style='text-align:center'>
           <p>
                This Todo app was created using Angular 4 and styled using ng-bootstrap (bootstrap 4.0).
            </p>
            <p>
                It calls a backend REST service using rxjs. The source for the backend can be found at 
                <a href='https://github.com/grooveymo/todo-rest-api'>REST api</a>                
            </p>
            <p>
            
            </p>

           </div>

            <!--    
            <ngb-alert type='danger'>
                    <strong>danger!</strong> Better check yourself, you're not looking too good.
            </ngb-alert>

            <ngb-alert type='success'>
                    <strong>success!</strong> Better check yourself, you're not looking too good.
            </ngb-alert>
            -->    

         </div>       
    `
})
export class HomeComponent {

}