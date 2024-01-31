"use strict";
//PROBLEM 1
const I = true;
const O = false;
//   A  B  C  D  E  F  G  H
const arrayGraph = [[O, I, O, I, O, O, O, O],
    [O, O, I, O, O, I, O, O],
    [O, O, O, O, O, O, O, O],
    [O, O, O, I, I, O, O, O],
    [O, O, O, O, O, O, I, O],
    [O, O, O, O, I, O, O, I],
    [O, O, O, O, O, O, I, O]];
const EdgeList = [list(1, 3),
    list(2, 5),
    list(),
    list(3, 4),
    list(2, 3, 4),
    list(6),
    list(4, 7),
    list(),
    list(6)];
