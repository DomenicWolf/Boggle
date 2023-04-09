let score = 0;
let $form=null
let starting = false
let high = ''

window.addEventListener('load', function() {
     $form = $('form');
     let test=true;
     let $start = $('.Start')
     let $high = $('.high')
     
     $start.on('click', function(e){
        e.preventDefault()
        starting = true;
        setTimeout(async function(){
            starting = false
            alert('times up')
            let resp = await axios.post('/save-score',  {scores:score})
            high = resp.data.scores
            $high.text(`high score is ${high}`)
        },30000)
     })
    $form.on('submit',async function (e){
        e.preventDefault();
        const value = $form.find('input[name="guess"]').val();
        if(starting===true){
                let response = await axios.get('/check-word',{params:{guess: value}});
                if (response.data.result === "not-word"){
                    alert('giveup')
                }
                else if  (response.data.result === "not-on-board"){
                    alert('KYS')
                }
                else{
                    let $list = $('ul')
                    for(let li of $list.children()){
                        if (li.textContent==value){
                             alert('no')  
                            test=false;
                        }   
                     }
                     if(test===true){
                         $list.append($('<li>', {text : value}))
                          let $score = $('.score')
                         let newScore = score += value.length
                        $score.text(`Your score is ${newScore}`)
            }
                    $form.find('input[name="guess"]').val('');
        }




        }
        
    })
});
  


 