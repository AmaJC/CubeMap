var map = {
  "grid": [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  "cells": {
    0: {
      "fillStyle": 'rgba(255, 255, 255, 0.01)',
      "padding": 3,
      "pad": 'rgba(0, 0, 0, 1)',
    },
    1: {
      "fillStyle": 'rgba(197, 198, 201, 1)',
      "padding": 3,
      "pad": 'rgba(0, 0, 0, 1)',
    }
  }
}

function setup() {
  var canvas = document.getElementById('playing');
  canvas_dim = Math.min(document.body.clientWidth, document.body.clientHeight);
  canvas.width = canvas_dim;
  canvas.height = canvas_dim;
  map.pause = true;
  var ctx = canvas.getContext('2d');
  window.requestAnimationFrame(function() {
    draw(ctx, map)
  });
}

function startGame(map) {
  console.log("new game");
  document.getElementById('game').style.display = 'block';
  document.getElementById('startgame').style.display = 'none';
  map.pause = false
  map.bullets = []
  map.zombies = []
  map.players = []
  map.width = map.grid[0].length
  map.height = map.grid.length
  var cell_dimension = Math.min(
      playing.width / map.width,
      playing.height / map.height);
  console.log(cell_dimension)
  map.cell_dimension = cell_dimension
}

function draw(ctx, map) {
  console.log("draw");
  if (!map.pause) {
    ctx.clearRect(0, 0, playing.width, playing.height);
    drawMap(ctx, map);
  }
  window.requestAnimationFrame(function() {
    draw(ctx, map)
  });
}

function drawBorder(x, y, ctx) {
  styles = map.cells[map.grid[0][0]];
  ctx.fillStyle = styles.pad;
  ctx.fillRect(
      0,
      48,
      3,
      map.cell_dimension);
}

function drawCell(x, y, map, ctx, styles) {
  if (styles === undefined) {
    styles = map.cells[map.grid[y][x]];
  }
  drawBorder(x, y, ctx);
  ctx.fillStyle = styles.fillStyle;
  ctx.fillRect(
      map.cell_dimension * x + styles.padding,
      map.cell_dimension * y + styles.padding,
      map.cell_dimension - (styles.padding * 2),
      map.cell_dimension - (styles.padding * 2));
}

function drawMap(ctx, map) {
  ctx.fillStyle = 'rgba(0, 0, 200, 0.25)';
  for (var i = 0; i < map.grid.length; i++) {
    for (var j = 0; j < map.grid[0].length; j++) {
      drawCell(j, i, map, ctx)
    }
  }
}

function endGame() {
  document.getElementById('playing').style.display = 'none';
  document.getElementById('endgame').style.display = 'block';
}

window.onload = function() {
  setup();
}
