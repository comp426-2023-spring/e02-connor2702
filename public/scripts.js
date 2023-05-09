// This function shows and hides the shot selection in the interface based 
// on whether or not the #opponent checkbox is checked
function showHideShots() {
// Get the info from the checkbox
    let rps = document.getElementById('rps');
    let rpsls = document.getElementById('rpsls');
    let check = document.getElementById('opponent');

// Check if the checkbox is checked and show or hide options accordingly
    if (check.checked == true && rps.checked == true) {
// Here, instead of just showing all of the options, use similar logic to 
// check which of the game radio buttons is checked and show only those
// options relevant to the game being selected (rps or rpsls). You can 
// use similar jQuery 
        $('r-p-s-l-s').hide()
        $('r-p-s').show()
    } else if (check.checked == true && rpsls.checked == true) {
        $('r-p-s').show()
        $('r-p-s-l-s').show()
    } else {
        $('r-p-s').hide()
        $('r-p-s-l-s').hide()
    }
}
// This function clears the input form and also resets the shot selection
// radio buttons. 
function startOver () {
    document.getElementById('userinput').reset();
    $('game-player').hide()
    $('game-opponent').hide()
    $('game-result').hide()
    showHideShots();
}

async function playGame () {
    // Get which game is being played based on the value in the form
    let game = $('input[type=radio][name=game]:checked').val();
    // Get option for playing versus opponent or not
    let opponent = document.getElementById('opponent');
    // Identify the base URL based on browser information
    let baseurl = window.location.href + 'app/'
    // Log the base URL
    console.log(baseurl)
    // Get and display results based on if opponent is selected or not
    if (opponent.checked == true) {
        $('game-player').hide()
        $('game-opponent').hide()
        $('game-result').hide()
        // Get which shot is being played based on the value in the form
        let shot = $('input[type=radio][name=shot]:checked').val();
        let url = baseurl + game + '/play/' + shot

        // Log the full URL
        console.log(url)	

        let response = await fetch(url)
        let result = await response.json()
        // Log the result
        console.log(result)

        // Display the result
        document.getElementById('outputp').innerHTML = result.player
        document.getElementById('outputo').innerHTML = result.opponent
        document.getElementById('outputr').innerHTML = result.result

        $('game-player').show()
        $('game-opponent').show()
        $('game-result').show()
    } else {
        $('game-player').hide()
        $('game-opponent').hide()
        $('game-result').hide()
        let url = baseurl + game + '/play/'

        // Log the full URL
        console.log(url)	

        let response = await fetch(url)
        let result = await response.json()
        // Log the result
        console.log(result)

        // Display the result
        document.getElementById('outputp').innerHTML = result.player

        $('game-player').show()
    }
}