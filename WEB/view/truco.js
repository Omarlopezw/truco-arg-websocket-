
import { TrucoTable } from '../view/trucoTableView.js';
import { TrucoEntry } from '../view/trucoEntry.js';
import {TrucoController} from '../controller/trucoController.js';


class Truco extends HTMLElement 
{
    constructor(model) 
    {
        super();
        this.innerController = new TrucoController(model);
        this.trucoEntry = new TrucoEntry(this.innerController);
        this.trucoTable = new TrucoTable(this.innerController);
        this.CurrentViewScreen = this.trucoEntry;
        //login state

        this.trucoEntry.addEventListener('changeTrucoView',() => { this.changeView() })
    }
    connectedCallback()
    {
        this.appendChild(this.CurrentViewScreen);
    }
    changeView()
    {
        this.removeChild(this.CurrentViewScreen);
        this.CurrentViewScreen = this.trucoTable;
        this.appendChild(this.CurrentViewScreen)
    }
}

// Registrar el componente personalizado para el mazo de 40 cartas
customElements.define('truco-game', Truco);

export {Truco};