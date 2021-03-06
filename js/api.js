var base_url = "https://api.football-data.org/v2/competitions/2002/standings?standingType=TOTAL";
var token = "590c7b06bf5d4a7ca5a5d73e4d84645a"

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getKlasemen() {
  if ("caches" in window) {
    caches.match(base_url).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let klasemenHTML = "";
          let dataTeamHTML = "";
          data.standings.forEach(function (a_standing) {
            a_standing.table.forEach(function (a_team) {

              dataTeamHTML +=
                `<tr>
                <td class="center-align">${a_team.position}</td>
                <td>
                <a href="./detail.html?id=${a_team.team.id}">
                <p class="hide-on-small-only">
                <img class = "show-on-medium-and-up show-on-medium-and-down" src=${a_team.team.crestUrl} style="float:left;width:22px;height:22px;margin-right:20px">
                ${a_team.team.name}
                </p>
                <p class="hide-on-med-and-up">
                <img src=${a_team.team.crestUrl}  style="float:left;width:22px;height:22px;margin-right:20px">
                </p>
      
                </a>
                </td>
                <td class="center-align">${a_team.playedGames}</td>
                <td class="center-align">${a_team.won}</td>
                <td class="center-align">${a_team.draw}</td>
                <td class="center-align">${a_team.lost}</td>
                <td class="center-align">${a_team.goalsFor}</td>
                <td class="center-align">${a_team.goalsAgainst}</td>
                <td class="center-align">${a_team.goalDifference}</td>
                 <td class="center-align">${a_team.points}</td>
              </tr>`
            });
            klasemenHTML += `
          <div class="row">
          <div class="col s12 m12" id="tabelKlasmen">
            <div class="card">
              <div class="card-content">
                <table class="responsive-table striped ">
                  <thead>
                    <tr>
                      <th class="center-align">Position</th>
                      <th>Team</th>
                      <th class="center-align">Play</th>
                      <th class="center-align">Won</th>
                      <th class="center-align">Draw</th>
                      <th class="center-align">Lost</th>
                      <th class="center-align">GF</th>
                      <th class="center-align">GA</th>
                      <th class="center-align">GD</th>
                      <th class="center-align">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${dataTeamHTML}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>         
            `
          });
          document.getElementById("body-content").innerHTML = klasemenHTML
        })
      }
    })
  }

  fetch(base_url, {
    method: "GET",
    headers: {
      "X-Auth-Token": token
    }
  }).then(status).then(json).then(function (data) {
    let klasemenHTML = "";
    let dataTeamHTML = "";
    data.standings.forEach(function (a_standing) {
      a_standing.table.forEach(function (a_team) {

        dataTeamHTML +=
          `<tr>
          <td class="center-align">${a_team.position}</td>
          <td>
          <a href="./detail.html?id=${a_team.team.id}">
          <p class="hide-on-small-only">
          <img class = "show-on-medium-and-up show-on-medium-and-down" src=${a_team.team.crestUrl} style="float:left;width:22px;height:22px;margin-right:20px">
          ${a_team.team.name}
          </p>
          <p class="hide-on-med-and-up">
          <img src=${a_team.team.crestUrl}  style="float:left;width:22px;height:22px;margin-right:20px">
          </p>

          </a>
          </td>
          <td class="center-align">${a_team.playedGames}</td>
          <td class="center-align">${a_team.won}</td>
          <td class="center-align">${a_team.draw}</td>
          <td class="center-align">${a_team.lost}</td>
          <td class="center-align">${a_team.goalsFor}</td>
          <td class="center-align">${a_team.goalsAgainst}</td>
          <td class="center-align">${a_team.goalDifference}</td>
           <td class="center-align">${a_team.points}</td>
        </tr>`
      });
      klasemenHTML += `
    <div class="row">
    <div class="col s12 m12" id="tabelKlasmen">
      <div class="card">
        <div class="card-content">
          <table class="responsive-table striped ">
            <thead>
              <tr>
                <th class="center-align">Position</th>
                <th>Team</th>
                <th class="center-align">Play</th>
                <th class="center-align">Won</th>
                <th class="center-align">Draw</th>
                <th class="center-align">Lost</th>
                <th class="center-align">GF</th>
                <th class="center-align">GA</th>
                <th class="center-align">GD</th>
                <th class="center-align">Points</th>
              </tr>
            </thead>
            <tbody>
              ${dataTeamHTML}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>         
      `
    });
    document.getElementById("body-content").innerHTML = klasemenHTML
  })
}

function getDetailTeam() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  fetch(`https://api.football-data.org/v2/teams/${idParam}`, {
      method: "GET",
      headers: {
        "X-Auth-Token": token
      }
    }).then(status).then(json).then(function (data) {
      console.log(data);
      let squadHTML = "";
      let daftarHTML = "";
      let dbInsertFav;
      data.squad.forEach(pemain => {
        squadHTML +=
          `
            <tr>
              <td id ="id">${pemain.id}</td>
              <td id ="name">${pemain.name}</td>
              <td id ="pos">${pemain.position}</td>
              <td id ="dat">${pemain.dateOfBirth}</td>
              <td id ="count">${pemain.countryOfBirth}</td>
              <td id ="nat">${pemain.nationality}</td>
              
              <td>
              <button onclick="dbInsertFav(${pemain.id})">Favorite</button>
            </td>
            </tr>
          `
      });

      daftarHTML += `
        <div class="row">
          <div class="col s12 m12" id="tabelKlasmen">
            <div class="card">
              <div class="card-content">
                <table class="responsive-table striped ">
                  <thead>
                    <tr>
                    <th>ID</th>
                      <th>Nama</th>
                      <th>Posisi</th>
                      <th>Tanggal lahir</th>
                      <th>Tempat lahir</th>
                      <th>Kewarganegaraan</th>
                     
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${squadHTML}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>`
      // });
      document.getElementById("body-content").innerHTML = daftarHTML;
    })
    .catch(error);
}


function showAllPlayer() {
  DbshowPlayerFav().then(playerFav => {
    let listPlayer = "";
    let daftarHTML = "";
    playerFav.forEach(data => {
      console.log(data)
      listPlayer += `
         <tr>
           <td>${data.id}</td>
           <td>${data.nama}</td>
           <td>${data.awal}</td>
           <td>${data.akhir}</td>
           <td>${data.tanggal}</td>
           <td>${data.tempat}</td>
           <td>${data.negara}</td>
           <td>${data.posisi}</td>
           <td>${data.Update}</td>
           <td><button onclick="dbDeletePlayer(${data.id})">Delete</button></td>
         </tr>
         `;
      let removeButtons = document.querySelectorAll(".removeButton");
      for (let button of removeButtons) {
        button.addEventListener("click", function (event) {
          let id = event.target.id;
          dbDeletePlayer(id);
        })
      }
    });
    daftarHTML += `
      <div class="row">
        <div class="col s12 m12" id="tabelKlasmen">
          <div class="card">
            <div class="card-content">
              <table class="responsive-table striped ">
                <thead>
                  <tr>
                  <th>ID</th>
                    <th>Nama</th>
                    <th>Nama Awal</th>
                    <th>Nama Akhir</th>
                    <th>Tanggal lahir</th>
                    <th>Tempat lahir</th>
                    <th>Kewarganegaraan</th>
                    <th>Posisi</th>
                    <th>Update</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  ${listPlayer}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`
    // console.log(listPlayer)
    document.getElementById("favorit").innerHTML = daftarHTML;
  })
}