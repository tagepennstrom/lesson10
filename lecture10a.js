"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mg_dfs_visit_order = exports.lg_dfs_visit_order = exports.lg_bfs_visit_order = exports.lg_transpose = exports.lg_from_edges = exports.lg_new = exports.mg_from_edges = exports.mg_new = exports.undirected = void 0;
const queue_array_1 = require("../lib/queue_array");
const list_1 = require("../lib/list");
/**
 * Add all reverse edges to an edge list, and remove all self loops.
 * @param el an edge list
 * @returns el with all reverse edges present, and all self loops removed
 */
function undirected(el) {
    if ((0, list_1.is_null)(el)) {
        return el;
    }
    else if ((0, list_1.head)((0, list_1.head)(el)) === (0, list_1.tail)((0, list_1.head)(el))) {
        return undirected((0, list_1.tail)(el));
    }
    else {
        const source = (0, list_1.head)((0, list_1.head)(el));
        const target = (0, list_1.tail)((0, list_1.head)(el));
        return (0, list_1.pair)((0, list_1.pair)(target, source), undirected((0, list_1.filter)(edge => (0, list_1.head)(edge) !== target
            || (0, list_1.tail)(edge) !== source, (0, list_1.tail)(el))));
    }
}
exports.undirected = undirected;
// Build an array based on a function computing the item at each index
function build_array(size, content) {
    const result = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}
/**
 * Create a new matrix graph with no edges
 * @param size the number of nodes
 * @returns the new matrix graph, where each inner array entry is false.
 */
function mg_new(size) {
    return { size,
        adj: build_array(size, _ => build_array(size, _ => false)) };
}
exports.mg_new = mg_new;
/**
 * Create a new matrix graph with a given set of edges
 * @param size the number of nodes
 * @param edges an edge list
 * @invariant all node ids in the edge list are < size.
 * @returns the new matrix graph, with the given edges.
 */
function mg_from_edges(size, edges) {
    const result = mg_new(size);
    (0, list_1.for_each)(p => result.adj[(0, list_1.head)(p)][(0, list_1.tail)(p)] = true, edges);
    return result;
}
exports.mg_from_edges = mg_from_edges;
/**
 * Create a new ListGraph with no edges
 * @param size the number of nodes in the list graph
 * @returns a new list graph with size edges.
 */
function lg_new(size) {
    return { size, adj: build_array(size, _ => null) };
}
exports.lg_new = lg_new;
/**
 * Create a new ListGraph with a given set of edges
 * @param size the number of nodes in the list graph
 * @param edges an edge list
 * @invariant all node ids in the edge list are < size.
 * @returns the new ListGraph, with the given edges.
 */
function lg_from_edges(size, edges) {
    const result = lg_new(size);
    (0, list_1.for_each)(p => result.adj[(0, list_1.head)(p)] = (0, list_1.pair)((0, list_1.tail)(p), result.adj[(0, list_1.head)(p)]), edges);
    return result;
}
exports.lg_from_edges = lg_from_edges;
/**
 * Transpose a list graph
 * @param adj a list graph
 * @returns the transpose of adj
 */
function lg_transpose({ size, adj }) {
    const result = lg_new(size);
    for (var i = 0; i < size; i = i + 1) {
        (0, list_1.for_each)(p => result.adj[p] = (0, list_1.pair)(i, result.adj[p]), adj[i]);
    }
    return result;
}
exports.lg_transpose = lg_transpose;
/**
 * Node colours for traversal algorithms
 * @constant white an unvisited node
 * @constant grey a visited but not finished node
 * @constant black a finished node
 */
const white = 1;
const grey = 2;
const black = 3;
/**
 * Get the visit order of a breadth-first traversal of a ListGraph.
 * @param lg the list graph
 * @param initial the id of the starting node. Default 0.
 * @returns A queue with the visited nodes in visiting order.
 */
function lg_bfs_visit_order({ adj, size }, initial = 0) {
    const result = (0, queue_array_1.empty)();
    const pending = (0, queue_array_1.empty)();
    const colour = build_array(size, _ => white);
    // visit a white node
    function bfs_visit(current) {
        colour[current] = grey;
        (0, queue_array_1.enqueue)(current, result);
        (0, queue_array_1.enqueue)(current, pending);
    }
    bfs_visit(initial);
    while (!(0, queue_array_1.is_empty)(pending)) {
        const current = (0, queue_array_1.head)(pending);
        (0, queue_array_1.dequeue)(pending);
        (0, list_1.for_each)(bfs_visit, (0, list_1.filter)(node => colour[node] === white, adj[current]));
        colour[current] = black;
    }
    return result;
}
exports.lg_bfs_visit_order = lg_bfs_visit_order;
/**
 * Get the visit order of a depth-first traversal of a ListGraph.
 * @param lg the list graph
 * @param restart_order the order of nodes to restart the traversal in.
 *      Default: in numeric order 0, 1, 2, ...
 * @returns A queue with the visited nodes in visiting order.
 */
function lg_dfs_visit_order({ adj, size }, restart_order = null) {
    const result = (0, queue_array_1.empty)();
    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        restart_order = (0, list_1.enum_list)(0, size - 1);
    }
    else { }
    // visit a node.  Each node is processed at most once.
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            (0, queue_array_1.enqueue)(current, result);
            (0, list_1.for_each)(dfs_visit, adj[current]);
            colour[current] = black;
        }
        else { }
    }
    (0, list_1.for_each)(dfs_visit, restart_order);
    return result;
}
exports.lg_dfs_visit_order = lg_dfs_visit_order;
/**
 * Get the visit order of a depth-first traversal of a MatrixGraph.
 * @param mg the graph
 * @param restart_order the order of nodes to restart the traversal in.
 *      Default: in numeric order 0, 1, 2, ...
 * @returns A queue with the visited nodes in visiting order.
 */
function mg_dfs_visit_order({ adj, size }, restart_order = null) {
    const result = (0, queue_array_1.empty)();
    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        restart_order = (0, list_1.enum_list)(0, size - 1);
    }
    else { }
    // visit a node. Each node is processed at most once.
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            (0, queue_array_1.enqueue)(current, result);
            for (var sink = 0; sink < size; sink = sink + 1) {
                if (adj[current][sink]) {
                    dfs_visit(sink);
                }
                else { }
            }
            colour[current] = black;
        }
        else { }
    }
    (0, list_1.for_each)(dfs_visit, restart_order);
    return result;
}
exports.mg_dfs_visit_order = mg_dfs_visit_order;
