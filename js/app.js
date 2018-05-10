document.addEventListener('DOMContentLoaded', function() {

    //menu rozwijalne
    var dropDownMenu = document.querySelector(".drop_down_menu");
    var droppable = document.querySelector(".droppable");

    dropDownMenu.hidden = true;

    function toggleMenu() {
        dropDownMenu.hidden = !dropDownMenu.hidden
    }

    droppable.addEventListener("mouseover", toggleMenu);

    droppable.addEventListener("mouseout", toggleMenu);


    //hamburger menu
    var hamburgerIcon = document.querySelector('.hamburger');
    var menu = document.querySelector('.menu');

    hamburgerIcon.addEventListener("click", function() {
        if (menu.style.display === "block") {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    });

    //chowanie opisu zdjęć

    var photosBox = document.querySelectorAll(".photos__box");
    var descriptions = document.querySelectorAll(".photos__box .photos__description");

    photosBox.forEach(function(photo, index) {

        function toggleDescription() {
            descriptions[index].hidden = !descriptions[index].hidden;
        }

        photo.addEventListener("mouseover", toggleDescription);

        photo.addEventListener("mouseout", toggleDescription);
    });


    //slider

    var photosLi = document.querySelectorAll(".slider li");
    var prev = document.querySelector(".about .container div:first-child");
    var next = document.querySelector(".about .container > div:last-child");

    var counter = 0;

    photosLi[counter].classList.add("visible");

    next.addEventListener("click", function() {
        photosLi[counter].classList.remove("visible");

        counter++;

        if(counter > photosLi.length - 1)
            counter = 0;

        photosLi[counter].classList.add("visible");
    });

    prev.addEventListener("click", function() {
        photosLi[counter].classList.remove("visible");

        counter--;

        if(counter < 0)
            counter = photosLi.length - 1;

        photosLi[counter].classList.add("visible");
    });


    //listy drop-down

    var listArrows = document.querySelectorAll(".list_arrow");

    listArrows.forEach(function(arrow){
        arrow.addEventListener("click", function() {
            var listPanel = this.nextElementSibling;

            if(listPanel.style.display === "none" || listPanel.style.display === "") {
                listPanel.style.display = "block";
            } else {
                listPanel.style.display = "none";
            }
        });
    });

    //summary

    //sum
    var toAdd = document.querySelectorAll(".summary_panel .panel_right>*");
    var summarySum = document.querySelector(".summary_panel .sum");

    function getSum() {
        var sum = 0;

        toAdd.forEach(function(element){
           if(element.innerText !== "" && element.innerText !== "-") {
               sum += parseInt(element.innerText);
           }
        });
        return sum;
    }


    //type of chair
    var liTypes = document.querySelectorAll(".choose_type li");
    var summaryType = document.querySelector(".summary_panel .panel_left h4");
    var summaryTypeValue = toAdd[0];

    liTypes.forEach(function(type){
        type.addEventListener("click", function() {
            //wpisanie typu do tabeli z podsumowaniem
            summaryType.innerText = this.innerText;
            //schowanie listy drop-down
            this.parentElement.style.display = "none";
            //wyświetlenie w polu wyboru, wybranego typu
            this.parentElement.previousElementSibling.previousElementSibling.innerText = this.innerText;
            //wpisanie ceny do tabeli
            summaryTypeValue.innerText = this.dataset.chairPrice;
            //przeliczenie sumy
            summarySum.innerText = getSum();
        });
    });

    //color
    var liColors = document.querySelectorAll(".choose_color li");
    var summaryColor = document.querySelector(".summary_panel .panel_left .color");
    var summaryColorValue = toAdd[1];

    liColors.forEach(function(color){
        color.addEventListener("click", function(){
            summaryColor.innerText = this.innerText;
            this.parentElement.style.display = "none";
            this.parentElement.previousElementSibling.previousElementSibling.innerText = this.innerText;
            summaryColorValue.innerHTML = "-";
        });
    });

    //material
    var liMaterials = document.querySelectorAll(".choose_material li");
    var summaryMaterial = document.querySelector(".summary_panel .panel_left .pattern");
    var summaryMaterialValue = toAdd[2];

    liMaterials.forEach(function(type){
        type.addEventListener("click", function() {
            summaryMaterial.innerText = this.innerText;
            this.parentElement.style.display = "none";
            this.parentElement.previousElementSibling.previousElementSibling.innerText = this.innerText;
            summaryMaterialValue.innerText = this.dataset.materialPrice;
            summarySum.innerText = getSum();
        });
    });

    //transport
    var transportCheckbox = document.getElementById("transport");
    var summaryTransport = document.querySelector(".summary_panel .panel_left .transport");
    var summaryTransportValue = toAdd[3];

    transportCheckbox.addEventListener("click", function() {
        if (this.checked) {
            summaryTransport.innerText = this.nextElementSibling.innerText;
            summaryTransportValue.innerText = this.dataset.transportPrice;
        } else {
            summaryTransport.innerText = "";
            summaryTransportValue.innerText = "";
        }
        summarySum.innerText = getSum();
    })

});