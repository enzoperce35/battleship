import { Game } from './game';
import { Player } from './player';
import { staticView } from './dom/static_view';
import { dynamicView } from './dom/dynamic_view';
import './index.css';

new Game(Player(true), Player()).play();
