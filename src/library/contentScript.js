$(document).ready(function () {





  //Hide Controls Not going to be used due to how I use node (Manaully execute from printer however want to monitor remote)
 /*  let header = document.getElementsByClassName("logo1");
  header[0].classList.add("none");
  let hideButtons1 = document.getElementsByClassName("table-t1");
  hideButtons1[0].classList.add("none");
  let hideButtons2 = document.getElementsByClassName("table-t2");
  hideButtons2[0].classList.add("none");

  let items = document.getElementsByClassName("table-responsive");
  for (var index = 0; index < items.length; index++) {
    items[index].classList.add("none");
  }

  let items1 = document.getElementsByClassName("form-inline");
  for (var index = 0; index < items1.length; index++) {
    items1[index].classList.add("none");
  }

  let printFilename = document.getElementsByClassName("c-si");
  printFilename[0].lastElementChild.classList.add("none"); */



  //when loaded retrieve the sentry config setup from the extension options - if this is not provided alert them to add it in - if not found we wont add the camera screen item
  chrome.storage.sync.get(["sentryNode"], function (e) {
    if (
      e.sentryNode === undefined ||
      e.sentryNode === "null" ||
      e.sentryNode === null ||
      e.sentryNode === ""
    ) {

      $(".logo1").append(  `      
      <!-- Modal -->
      <div class="modal fade" id="noipset" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Sentry IP not set</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            Set Sentry IP including port in Extesnion Options, reload page once saved - without this the camera feed cannot be displayed.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`)
  
      var myModal = new bootstrap.Modal(document.getElementById('noipset'), {
          keyboard: true
        })
  
        myModal.toggle()







    } else {
      var timecollection = document.getElementsByClassName("table-responsive3");
      //debugger
      var kk = timecollection[0];
      var node =
        `<div class="table-responsive">
      <label for="camera_view">Camera</label>
<div id="mydiv" class="test"><iframe src="http://` +
        e.sentryNode +
        `" width="100%" height="400" style="border:none zoom: 0.75"></iframe></div>
      
</div>`;
      $(node).insertBefore(kk);
    }
  });


  //Source taken from the node webpage and repurposed for my self so that the percentage and finish notiication works
  //as I do not send the item to the pinter using node just to monitor this enables the functions not coded for due to how I use it
  //note for self, look into custom build of Node Flash to add this to the code for general usage of my self

  var nodeSource = new EventSource("/events");
  nodeSource.addEventListener(
    "gcode_cli",
    function (ne) {

      var nodeobj = ne.data;

      let result = nodeobj.includes("NORMAL MODE");

      if (result) {
        var currentPercent = between_text(nodeobj, "Percent done: ", ";");
        var percent_update = document.getElementById("print-progess");
        percent_update.innerHTML = currentPercent.toString();
        if (currentPercent.toString() === "100") {
          alert("Print job finish!");
        }
      }
    },
    false
  );



})





//This function allows us to get data between to strings of text for easier handling of data
function between_text(txt_to_search, start_tag, end_tag) {
  var start_index = txt_to_search.indexOf(start_tag);
  if (start_index > -1) {
    start_index += start_tag.length;
    var end_index = txt_to_search.indexOf(end_tag, start_index);
    if (end_index > -1) {
      return txt_to_search.substr(start_index, end_index - start_index);
    } else {
      return "";
    }
  } else {
    return "";
  }
}

