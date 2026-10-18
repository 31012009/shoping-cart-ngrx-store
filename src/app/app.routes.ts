import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./products/products.component').then((module) => module.ProductsComponent)
	},
	{
		path: 'cart',
		loadChildren: () => import('./cart/cart.module').then((module) => module.CartModule)
	},
	{ path: '**', redirectTo: '' }
];
