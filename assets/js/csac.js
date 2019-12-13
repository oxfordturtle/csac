document.querySelector('button').addEventListener('click', function () {
  document.body.classList.toggle('contents-open')
  if (document.body.classList.contains('contents-open')) {
    document.querySelector('button').innerHTML = '<i class="fas fa-times"></i>'
  } else {
    document.querySelector('button').innerHTML = '<i class="fas fa-bars"></i>'
  }
})
document.querySelector('section').addEventListener('click', function () {
  document.body.classList.remove('contents-open')
  document.querySelector('button').innerHTML = '<i class="fas fa-bars"></i>'
})
