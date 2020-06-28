import Vue from "vue"
import VueRouter from "vue-router"
import routes from './routes'
import store from "../store"


Vue.use(VueRouter)


let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.push

VueRouter.prototype.push = function(location,onComplete,onAbort){
    if(!onComplete && !onAbort){
        return originPush.call(this,location).catch(err =>{
            console.log(err.message);        
        })
    }else{
        originPush.call(this,location,onComplete,onAbort)
    }
}

VueRouter.prototype.replace = function(location,onComplete,onAbort){
    if(!onComplete && !onAbort){
        return originReplace.call(this,location).catch(err =>{
            console.log(err.message);        
        })
    }else{
        originReplace.call(this,location,onComplete,onAbort)
    }
}

const router = new VueRouter({
    mode:'hash',
    routes,
    scrollBehavior(to,from,savadPosition){
        return {x : 0 ,y : 0}
    }
})

router.beforeEach((to,from,next)=>{
    const targetPath = to.path
    const needCheck = !!checkPaths.find(path => targetPath.indexOf(path) === 0) 
    if(needCheck){
        const name = window.localStorage.getItem('userName')
        if(name){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})
export default  router

const checkPaths = ['/tiantian']
