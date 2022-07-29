import {createRouter, createWebHistory} from 'vue-router'
import DashboardView from "@/components/dashboard/DashboardView";
import componentTypesView from "@/components/component_type/ComponentTypesView";
import employeesView from "@/components/employee/EmployeesView";
import employeeView from "@/components/employee/EmployeeView";
import NoItemSelectedView from "@/components/util/no_item_selected/NoItemSelectedView";
import componentsView from "@/components/imacs_component/ComponentsView";
import componentView from "@/components/imacs_component/ComponentView";
import ComponentTypeDetailScreen from "@/components/component_type/ComponentTypeDetailScreen";
import workstationsView from "@/components/workstation/WorkstationsView";
import WorkstationView from "@/components/workstation/WorkstationView";

export const componentTypeRoute = {
    navCaption: "Article Description",
    path: '/component-types',
    name: 'compTypes',
    component: componentTypesView,
    position: 'sidebar',
    icon: ['fas', 'microchip'],
    children: [
        {
            path: 'type',
            name: 'compType',
            component: ComponentTypeDetailScreen
        },
        {
            path: '',
            name: 'noCompTypeSelected',
            component: NoItemSelectedView,
            props: {
                icon: ['fas', 'microchip'],
                text_primary: "No Article Description selected",
                text_secondary: "Click on a entry on the left!"
            }
        }
    ]
}

export const componentRoute = {
    navCaption: "Components",
    path: '/components',
    name: 'components',
    component: componentsView,
    position: 'sidebar',
    icon: ['fas', 'hard-drive'],
    children: [
        {
            path: 'component',
            name: 'component',
            component: componentView
        },
        {
            path: '',
            name: 'noComponentSelected',
            component: NoItemSelectedView,
            props: {
                icon: ['fas', 'hard-drive'],
                text_primary: "No Component selected",
                text_secondary: "Click on a entry on the left!"
            }
        }
    ]
}

export const employeeRoute = {
    navCaption: "Employees",
    path: '/employees',
    name: 'employees',
    component: employeesView,
    position: 'sidebar',
    icon: ['fas', 'user-large'],
    children: [
        {
            path: 'employee',
            name: 'employee',
            component: employeeView
        },
        {
            path: '',
            name: 'noEmployeeSelected',
            component: NoItemSelectedView,
            props: {
                icon: ['fas', 'user-large'],
                text_primary: "No Employee selected",
                text_secondary: "Click on a entry on the left!"
            }
        }
    ]
}

export const workstations = {
    navCaption: "Workstations",
    path: '/workstations',
    name: 'workstations',
    component: workstationsView,
    position: 'sidebar',
    icon: ['fas', 'computer'],
    children: [
        {
            path: 'workstation',
            name: 'workstation',
            component: WorkstationView
        },
        {
            path: '',
            name: 'noWorkstationSelected',
            component: NoItemSelectedView,
            props: {
                icon: ['fas', 'computer'],
                text_primary: "No workstation selected",
                text_secondary: "Click on a entry on the left!"
            }
        }
    ]
}


const routes = [
    {navCaption: "Home", path: '/', name: 'Home', redirect: '/dashboard', component: DashboardView, position: 'none', icon: ['fas', 'lineChart']},
    {navCaption: "Dashboard", path: '/dashboard', name: 'Dashboard', component: DashboardView, position: 'sidebar', icon: ['fas', 'chart-line']},
    componentTypeRoute,
    componentRoute,
    employeeRoute,
    workstations,
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        return savedPosition || new Promise((resolve)=>{
            setTimeout(()=> resolve({ top:0 }), 300)
        })
    }
})

export default router