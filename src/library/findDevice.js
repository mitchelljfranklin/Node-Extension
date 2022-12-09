

(function() {
    'use strict';

    

    $("body").prepend('<button type="button" class="btn btn-default pull-right" id="btn-find-node" title="Find Node Devices within your network">Find Node Devices</button>');




    const findnodeButton = document.getElementById('btn-find-node');


    findnodeButton.onclick = () => {

            alert('clicked')

      };

   
})();