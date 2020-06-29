import React, {Suspense, lazy} from 'react'
import {Route, Switch} from "react-router-dom"
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

// main components for router
const Welcome = lazy(() => import("./components/Welcome"))

const NotFound = lazy(() => import("./components/NotFound/NotFound404"))

const routes = (
    <Suspense fallback={<div className={"main-loader"}><Loader type="Rings" color="#1079f8" height={100} width={100}/></div>}>
        <Switch>
            {/* main routes */}
            <Route path="/" exact={true} component={Welcome}/>

            <Route path='*' exact={true} component={NotFound} />
        </Switch>
    </Suspense>
)

export default routes
