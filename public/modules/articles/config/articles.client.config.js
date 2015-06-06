'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
    Menus.addMenuItem('topbar', 'Proyectos', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'Listar Proyectos', 'articles');
    Menus.addSubMenuItem('topbar', 'articles', 'Nuevo Proyecto', 'articles/create');
	}
]);