import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
   
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'layout',
    url: 'home'
  },
  {
    id: 'children',
    title: 'Children',
    translate: 'MENU.CHILDREN',
    type: 'item',
    icon: 'users',
    url: 'child/list'
  },   
  {
    id: 'traveler',
    title: 'Travelers',
    translate: 'MENU.TRAVELER',
    type: 'item',
    icon: 'user',
    url: 'traveler/list'
  },
  {
    id: 'region',
    title: 'Region',
    translate: 'MENU.REGION',
    type: 'item',
    icon: 'map-pin',
    url: 'region/manage'
  },

   //IMMUNIZATION
   {
    id: 'immunization',
    type: 'section',
    title: 'Immunization',
    translate: 'MENU.IMMUNIZATION',
    icon: 'home',
    children: [     
      {
        id: 'Flow Records',
        title: 'Flow Records',
        translate: 'MENU.FLOWRECORDS',
        type: 'item',
        icon: 'repeat',
        url: 'flow/registration/guardian'
      },
      {
        id: 'immunizations',
        title: 'Immunizations',
        translate: 'MENU.IMMUNIZATIONS.COLLAPSIBLE',
        type: 'collapsible',    
        icon: 'umbrella',  
        children: [
          {
            id: 'vaccination',
            title: 'Vaccination',
            translate: 'MENU.IMMUNIZATIONS.LIST',
            type: 'item',         
            icon: 'circle',
            url: 'immunizations/vaccinations'
          },
          {
            id: 'vaccineManagement',
            title: 'Vaccine Management',
            translate: 'MENU.IMMUNIZATIONS.LIST',
            type: 'item',         
            icon: 'circle',
            url: 'immunizations/vaccine-list'
          }
        ]
      }
    ]
  },
  
  
  //ADMINISTRATION
  {
    id: 'administration',
    type: 'section',
    title: 'Administration',
    translate: 'MENU.ADMINISTRATION',
    icon: 'home',
    children: [     
      // Users
    {
      id: 'users',
      title: 'Users',
      translate: 'MENU.USERS.COLLAPSIBLE',
      type: 'collapsible',    
      icon: 'user',  
      children: [
        {
          id: 'userlist',
          title: 'User List',
          translate: 'MENU.USERS.LIST',
          type: 'item',         
          icon: 'circle',
          url: 'user/list'
        },
        {         
          id: 'permissions',
          title: 'Permissions',
          translate: 'MENU.USERS.PERMISSIONS',
          type: 'item',
          icon: 'circle',
          url: 'user/permissions/list'
        }
      ]
    },
      {
        id: 'reporting',
        title: 'Reporting',
        translate: 'MENU.REPORTING',
        type: 'item',
        icon: 'bar-chart-2',
        url: 'reporting'
      },
      {
        id: 'organization',
        title: 'Organization',
        translate: 'MENU.ORGANIZATION',
        type: 'item',
        icon: 'minimize',
        url: 'organization/list'
      },
      {
        id: 'settings',
        title: 'Settings',
        translate: 'MENU.SETTINGS',
        type: 'item',
        icon: 'settings',
        url: 'settings/edit'
      },
    
    ]
  },
]
