import { Icon } from '@iconify/react';
import "../css/ScribbleBtn.css"

export default function ScribbleBtn(){
    return (
        <div className="ScribbleBtn-div">
            <button className="ScribbleBtn"><Icon icon="tabler:scribble" width="60px" /></button>
        </div>
    )
}