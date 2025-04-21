A = [2, 6];

function swap(A, i, j) {
  let temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

function sort(A) {
  var i = 0;
  while(i < A.length - 1) {
    j = i + 1;

    while(j < A.length) {
      if(A[i] < A[j]) {
        swap(A, i, j);
      }
      j++;
    }
    i++;
  }
}


sort(A);
A.forEach(e => {
  console.log(e, ' ');
})