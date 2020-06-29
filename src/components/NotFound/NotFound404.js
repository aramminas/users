import React, {Component} from "react"
import './NotFound404.scss'

// languages
import lang from '../../lang/en/en.json'

class NotFound404 extends Component {

    render() {
        return (
            <div className={"not-found-content"}>
                <div className={"background-content"}>
                    <figure>
                        <img src="/images/404-not-found.gif" alt="not found"/>
                    </figure>
                    <div className="message">
                        <h1>404</h1>
                        <h2>{lang.message_1}</h2>
                        <h3>{lang.message_2}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound404