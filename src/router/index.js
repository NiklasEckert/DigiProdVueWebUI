import {createRouter, createWebHistory} from 'vue-router'
import DashboardView from "@/components/dashboard/DashboardView";
import ComponentsView from "@/components/imacs_component/ComponentsView";
import WorkstationsView from "@/components/workstation/WorkstationsView";
import componentTypesView from "@/components/component_type/ComponentTypesView";
import employeesView from "@/components/employee/EmployeesView";
import componentTypeView from "@/components/component_type/ComponentTypeView";
import NoItemSelectedView from "@/components/util/no_item_selected/NoItemSelectedView";

export const componentTypeRoute = {
    navCaption: "Comp. Types",
    path: '/component-types',
    name: 'Komp. Typen',
    component: componentTypesView,
    position: 'sidebar',
    icon: ['fas', 'microchip'],
    children: [
        {
            path: ':art',
            name: 'Komp. Typ',
            components: {
                default: componentTypeView
            }
        },
        {
            path: '',
            name: 'No CompType Selected',
            component: NoItemSelectedView,
            props: {
                icon: ['fas', 'microchip'],
                text_primary: "No Component Type selected",
                text_secondary: "Click on a entry on the left!"
            }
        }
    ]
}

const routes = [
    {navCaption: "Home", path: '/', name: 'Home', redirect: '/dashboard', component: DashboardView, position: 'none', icon: ['fas', 'lineChart']},
    {navCaption: "Dashboard", path: '/dashboard', name: 'Dashboard', component: DashboardView, position: 'sidebar', icon: ['fas', 'chart-line']},
    componentTypeRoute,
    {navCaption: "Components", path: '/components', name: 'Komponenten', component: ComponentsView, position: 'sidebar', icon: ['fas', 'hard-drive']},
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