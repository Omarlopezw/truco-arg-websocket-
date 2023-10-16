
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
        this.newController = new TrucoController(this.innerController.model); // Crea un nuevo controlador
        this.newGame = new TrucoEntry(this.newController);
        
        this.trucoEntry.addEventListener('changeTrucoView',() => { this.changeView() })
        this.trucoTable.addEventListener('finishGame',() => { this.finishGame() })
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
    finishGame()
    {
        this.removeChild(this.CurrentViewScreen);
        // this.trucoTable = new TrucoTable(this.newController);
        this.CurrentViewScreen = this.newGame;
        this.appendChild(this.CurrentViewScreen)
    }
}

customElements.define('truco-game', Truco);

export {Truco};