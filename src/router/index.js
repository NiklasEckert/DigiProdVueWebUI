import {createRouter, createWebHistory} from 'vue-router'
import DashboardView from "@/components/dashboard/DashboardView";
import ComponentsView from "@/components/imacs_component/ComponentsView";
import WorkstationsView from "@/components/workstation/WorkstationsView";
import componentTypesView from "@/components/component_type/ComponentTypesView";
import employeesView from "@/components/employee/EmployeesView";

const routes = [
    {path: '/', name: 'Home', redirect: '/dashboard', component: DashboardView, position: 'none'},
    {path: '/dashboard', name: 'Dashboard', component: DashboardView, position: 'sidebar'},
    {path: '/component_types', name: 'Komponenten Typen', component: componentTypesView, position: 'sidebar'},
    {path: '/components', name: 'Komponenten', component: ComponentsView, position: 'sidebar'},
    {path: '/workstations', name: 'Workstations', component: WorkstationsView, position: 'sidebar'},
    {path: '/employee', name: 'Mitarbeiter', component: employeesView, position: 'sidebar'}
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