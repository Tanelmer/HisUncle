function Queue() {
  this._oldestIndex = 1;
  this._newestIndex = 1;
  this._storage = {};
}

Queue.prototype.size = function() {
  return this._newestIndex - this._oldestIndex;
}


/*入队列*/
Queue.prototype.enqueue = function(data) {
  this._storage[this._newestIndex] = data;
  this._newestIndex++; 
}
/*出队列*/
Queue.prototype.dequeue = function() {
  var oldestIndex = this._oldestIndex,
      newestIndex = this._newestIndex,
      deleteData;

  if(oldestIndex != newestIndex) {
    deleteData = this._storage[oldestIndex];
    delete this._storage[oldestIndex];
    this._oldestIndex++;
    return deleteData;
  }


}