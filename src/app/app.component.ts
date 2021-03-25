import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rent-car-system-frontend';
}

// 1. npm install -g @angular/cli
// 2. C:\Users\ahmet\Desktop\WebstormProjects\angular-workspace\>ng new rent-car-system-frontend
// 3. components, services, models directories added to app
// 4. bootstrap installed C:\Users\ahmet\Desktop\WebstormProjects\angular-workspace\rent-car-system-frontend\node_modules>npm install bootstrap@5.0.0-beta2
  // 4.1 angular.json styles added "./node_modules/bootstrap/dist/css/bootstrap.min.css",
// 5. components created C:\Users\ahmet\Desktop\WebstormProjects\angular-workspace\rent-car-system-frontend\src\app\components>ng g component {component_name}
  // 5.1 components are automatically added to app.module.ts declarations
  // 5.2 add components to app.component.html
  // 5.3 add service in constructor and use service to get data and show in component
// 6. Models are created
  // 6.1 response models
// 7. Services are created C:\Users\ahmet\Desktop\WebstormProjects\angular-workspace\rent-car-system-frontend\src\app\services\brand>ng g service {service_name}
  // 7.1 add necessary methods like in backend controllers
// 8. HttpClient added for services by injection
  // 8.1 add app.module imports HttpClientModule
  // 8.2 add client into service constructor and import
  // 8.3 add apiUrl for service client
  // 8.4 add backend webAPI startup services.AddCors(); and app.UseCors(builder => builder.WithOrigins("http://localhost:4200").AllowAnyHeader());
