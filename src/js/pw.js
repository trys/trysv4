(function() {
  const wrap = document.querySelector('.password')
  if (!wrap) return

  const input = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz?!*^%0123456789'.split('')
  const output = wrap.querySelector('.password__result')

  const rand = (min, max) => Math.floor(Math.random() * ( max - min + 1) + min)
  const generate = () => output.innerText = Array.from(Array(15)).map(x => input[rand(0, input.length - 1)]).join('')
  generate()
  wrap.querySelector('.password__generate').addEventListener('click', generate)

  wrap.querySelector('.password__copy')  
    .addEventListener('click', (event) => {
      const range = document.createRange();
      range.selectNode(output);  
      window.getSelection().addRange(range);  

      try {
        document.execCommand('copy');
        event.target.classList.add('button--success')
      } catch(e) {
        event.target.classList.add('button--failure')
      }

      setTimeout(() => ['button--failure', 'button--success'].forEach(c => event.target.classList.remove(c)), 2000) 
      window.getSelection().removeAllRanges();  
    })

})()
