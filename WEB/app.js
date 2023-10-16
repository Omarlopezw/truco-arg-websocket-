import { TrucoPlayer } from './view/trucoPlayerView.js';
import { TrucoTable } from './view/trucoTableView.js';
import { TrucoModel } from './model/trucoModel.js';
import { Truco } from './view/truco.js';
import { TrucoEntry } from './view/trucoEntry.js';


let main = function()
{
    let model = new TrucoModel();
    let truco = new Truco(model);
    document.body.appendChild(truco);
}
window.onload = main;