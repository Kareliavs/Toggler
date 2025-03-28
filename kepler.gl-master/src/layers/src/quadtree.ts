//EUREKA
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
  
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }
  
  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }
  
  function euclidDistance(x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
  }
  
  function mindist(x, y, x1, y1, x2, y2) {
    var dx1 = x - x1,
      dx2 = x - x2,
      dy1 = y - y1,
      dy2 = y - y2;
  
    if (dx1 * dx2 < 0) {
      // x is between x1 and x2
      if (dy1 * dy2 < 0) {
        // (x,y) is inside the rectangle
        return 0; // return 0 as point is in rect
      }
      return Math.min(Math.pow(Math.abs(dy1), 2), Math.pow(Math.abs(dy2), 2));
    }
    if (dy1 * dy2 < 0) {
      // y is between y1 and y2
      // we don't have to test for being inside the rectangle, it's already tested.
      return Math.min(Math.pow(Math.abs(dx1), 2), Math.pow(Math.abs(dx2), 2));
    }
    return Math.min(
      Math.min(euclidDistance(x, y, x1, y1), euclidDistance(x, y, x2, y2)),
      Math.min(euclidDistance(x, y, x1, y2), euclidDistance(x, y, x2, y1))
    );
  }
  
  function knearest(bestqueue, resultqueue, x, y, k) {
    bestqueue.sort(function(a, b) {
      // sort children according to their mindist/dist to searchpoint
      [a, b].forEach(function(val) {
        if (val.mindist == undefined) {
          // add minidst to nodes if not there already
          if (!val.length) {
            // is leaf
            val.mindist = euclidDistance(x, y, val.data[0], val.data[1]);
          } else {
            val.mindist = mindist(x, y, val.x1, val.y1, val.x2, val.y2);
          }
        }
      });
      return b.mindist - a.mindist;
    });
  
    for (var i = bestqueue.length - 1; i >= 0; i--) {
      // add nearest leafs if any
      var elem = bestqueue[i];
      if (!elem.length) {
        // is leaf
        bestqueue.pop();
        resultqueue.push(elem);
        if (resultqueue.length >= k || bestqueue.length == 0) {
          // return if k neighbors found or no points left
          return;
        }
      } else {
        break;
      }
    }
  
    var visited = bestqueue.pop();
    for (var i = 0; i < visited.length; i++) {
      // add child quadrants to queue
      if (visited[i]) {
        visited[i].mindist = undefined; // reset before adding it to the queue
        bestqueue.push(visited[i]);
      }
    }
  
    knearest(bestqueue, resultqueue, x, y, k); // recursion
  }
  
  // collapses a quadtree into a list of nodes, adding their depth
  export function retrieveNodesAndDepth(quadtree) {
    const nodes = [];
    let maxdepth = 0;
    quadtree.root().depth = 0; // root node depth
    quadtree.visit((node, x1, y1, x2, y2) => {
      node.x1 = x1;
      node.y1 = y1;
      node.x2 = x2;
      node.y2 = y2;
      nodes.push(node);
      for (var i = 0; i < node.length; i++) {
        if (node[i]) {
          node[i].depth = node.depth + 1;
          maxdepth = node[i].depth > maxdepth ? node[i].depth : maxdepth;
        }
      }
      return false;
    });
  
    return {nodes: nodes, depth: maxdepth};
  }
  
  export function findradius(quadtree,mouse_lat,mouse_lng,k) {
    k=Math.ceil(k);
    //let radius = (Math.floor(Math.random() * 5) + 1)*100000;
    const x = mouse_lat,
      y = mouse_lng;
    //get nearest neighbuors
    if (typeof quadtree.root() == 'undefined') {
      return 0;
    }
    quadtree.root().mindist = 0;
    const bestqueue = new Array(quadtree.root()); // start with the root node of the quadtree
    const resultqueue = [];
    knearest(bestqueue, resultqueue, x, y, k);
    
    let dist = 0;
    try
    {
      dist = calcCrow(x, y, resultqueue[resultqueue.length - 1].data[0], resultqueue[resultqueue.length - 1].data[1]) * 1000; //km*1000=m
    }
    catch
    {
      console.log("No actualiza dist");
    }
      return dist; ///ENCONTRAR EL RADIO Y VER SI AFECTA NODOS O ARISTAS
  }
  
  
  
  