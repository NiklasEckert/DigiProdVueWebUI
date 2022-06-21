import {createRouter, createWebHistory} from 'vue-router'
import DashboardView from "@/components/dashboard/DashboardView";
import ComponentsView from "@/components/imacs_component/ComponentsView";
import WorkstationsView from "@/components/workstation/WorkstationsView";
import componentTypesView from "@/components/component_type/ComponentTypesView";
import employeesView from "@/components/employee/EmployeesView";

const routes = [
    {path: '/', name: 'Home', redirect: '/dashboard', component: DashboardView, position: 'none', icon: ['fas', 'lineChart']},
    {path: '/dashboard', name: 'Dashboard', component: DashboardView, position: 'sidebar', icon: ['fas', 'chart-line']},
    {path: '/component_types', name: 'Komp. Typen', component: componentTypesView, position: 'sidebar', icon: ['fas', 'microchip']},
    {path: '/components', name: 'Komponenten', component: ComponentsView, position: 'sidebar', icon: ['fas', 'hard-drive']},
    {path: '/workstations', name: 'Workstations', component: WorkstationsView, position: 'sidebar', icon: ['fas', 'computer']},
    {path: '/employee', name: 'Mitarbeiter', component: employeesView, position: 'sidebar', icon: ['fas', 'user-large']}
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