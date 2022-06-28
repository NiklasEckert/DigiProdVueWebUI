import {createRouter, createWebHistory} from 'vue-router'
import DashboardView from "@/components/dashboard/DashboardView";
import WorkstationsView from "@/components/workstation/WorkstationsView";
import componentTypesView from "@/components/component_type/ComponentTypesView";
import employeesView from "@/components/employee/EmployeesView";
import NoItemSelectedView from "@/components/util/no_item_selected/NoItemSelectedView";
import componentsView from "@/components/imacs_component/ComponentsView";
import componentView from "@/components/imacs_component/ComponentView";
import ComponentTypeDetailScreen from "@/components/component_type/ComponentTypeDetailScreen";

export const componentTypeRoute = {
    navCaption: "Comp. Types",
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
                text_primary: "No Component Type selected",
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

const routes = [
    {navCaption: "Home", path: '/', name: 'Home', redirect: '/dashboard', component: DashboardView, position: 'none', icon: ['fas', 'lineChart']},
    {navCaption: "Dashboard", path: '/dashboard', name: 'Dashboard', component: DashboardView, position: 'sidebar', icon: ['fas', 'chart-line']},
    componentTypeRoute,
    componentRoute,
    {navCaption: "Workstations", path: '/workstations', name: 'Workstations', component: WorkstationsView, position: 'sidebar', icon: ['fas', 'computer']},
    {navCaption: "Employees", path: '/employee', name: 'Mitarbeiter', component: employeesView, position: 'sidebar', icon: ['fas', 'user-large']},
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