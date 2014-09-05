(function() {

'use strict';

function SideMenuCtrl($http, Auth, User, $scope, $state, $stateParams, $timeout) {

        // Capture the 'this' context of the controller using vm, standing for ViewModel.
        // Use it to avoid having to call bind and unnecessary scoping issues.
        var vm = this;

        vm.someObject = 'Some value';

        vm.stuff = [];
    
    

    vm.sections = [
                        {
                            id: 0,
                            title: 'Dashboard',
                            icon: 'icon_house_alt first_level_icon',
                            link: 'auth.home'
                        },
                        {
                            id: 1,
                            title: 'Forms',
                            icon: 'icon_document_alt first_level_icon',
                            submenu: [
                                {
                                    title: 'Regular Elements',
                                    link: 'auth.forms.regular_elements'
                                },
                                {
                                    title: 'Extended Elements',
                                    link: 'auth.forms.extended_elements'
                                },
                                {
                                    title: 'Gridform',
                                    link: 'auth.forms.gridform'
                                },
                                {
                                    title: 'Validation',
                                    link: 'auth.forms.validation'
                                },
                                {
                                    title: 'Wizard',
                                    link: 'auth.forms.wizard'
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: 'Pages',
                            icon: 'icon_folder-alt first_level_icon',
                            badge: true,
                            submenu: [
                                {
                                    title: 'Chat',
                                    link: 'auth.pages.chat'
                                },
                                {
                                    title: 'Help/Faq',
                                    link: 'auth.pages.helpFaq.all'
                                },
                                {
                                    title: 'Invoices',
                                    link: 'auth.pages.invoices'
                                },
                                {
                                    title: 'Mailbox',
                                    link: 'auth.pages.mail.inbox'
                                },
                                {
                                    title: 'Search Page',
                                    link: 'auth.pages.search'
                                },
                                {
                                    title: 'User List',
                                    link: 'auth.pages.userList'
                                },
                                {
                                    title: 'User Profile',
                                    link: 'auth.pages.userProfile'
                                }
                            ]
                        },
                        {
                            id: 3,
                            title: 'Components',
                            icon: 'icon_puzzle first_level_icon',
                            submenu: [
                                {
                                    title: 'Gallery',
                                    link: 'auth.components.gallery'
                                },
                                {
                                    title: 'Grid',
                                    link: 'auth.components.grid'
                                },
                                {
                                    title: 'Icons',
                                    link: 'auth.components.icons'
                                },
                                {
                                    title: 'Notifications/Popups',
                                    link: 'auth.components.notificationsPopups'
                                },
                                {
                                    title: 'UI Bootstrap',
                                    link: 'auth.components.bootstrapUI'
                                },
                                {
                                    title: 'Typography',
                                    link: 'auth.components.typography'
                                }

                            ]
                        },
                        {
                            id: 4,
                            title: 'Plugins',
                            icon: 'icon_lightbulb_alt first_level_icon',
                            badge: true,
                            submenu: [
                                {
                                    title: 'Calendar',
                                    link: 'auth.plugins.calendar.basic'
                                },
                                {
                                    title: 'Charts',
                                    link: 'auth.plugins.charts'
                                },
                                {
                                    title: 'Google Maps',
                                    link: 'auth.plugins.googleMaps'
                                },
                                {
                                    title: 'Tables',
                                    link: 'auth.plugins.tables.footable'
                                },
                                {
                                    title: 'Vector Maps',
                                    link: 'auth.plugins.vectorMaps'
                                },
                                {
                                    title: '404',
                                    link: 'error.404'
                                }
                            ]
                            }
                    ];

            // accordion menu
            $(document).off('click').on('click', '.side_menu_expanded #main_menu .has_submenu > a', function () {
                var $this_parent = $(this).parent('.has_submenu'),
                    panel_active = $this_parent.hasClass('section_active');
                $('#main_menu .has_submenu').removeClass('section_active').children('ul').slideUp('200');
                if (!panel_active) {
                    $this_parent.addClass('section_active').children('ul').slideDown('200');
                }
            });

            $timeout( function() {
                $('#main_menu .has_submenu .act_nav').closest('.has_submenu').children('a').click();
            },0);
        }
        
    
  angular.module('app')
    .controller('SideMenuCtrl', SideMenuCtrl);
})();