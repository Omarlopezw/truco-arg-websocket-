import { TrucoPlayer } from './view/trucoPlayerView.js';
import { TrucoTable } from './view/trucoTableView.js';
import { TrucoModel } from './model/trucoModel.js';
import { Truco } from './view/truco.js';
import { TrucoEntry } from './view/trucoEntry.js';


let main = function()
{
    let model = new TrucoModel();
    // let mesa = new TrucoTable(model);
    let truco = new Truco(model);
    // mesa.appendChild(player1);
    // mesa.appendChild(player2);
    document.body.appendChild(truco);
}
window.onload = main;