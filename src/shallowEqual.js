
module.exports = function shallowEqual(objA, objB) {
  var key;

  if (objA === objB) return true;

  for (key in objA) 
    if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key]))
      return false;

  for (key in objB) 
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) 
      return false;
    
  return true;
}