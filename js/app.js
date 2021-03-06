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

    //prices section

    var priceBox = document.querySelectorAll(".listOfPrices__box");

    priceBox.forEach(function(box){
        box.addEventListener("mouseover", function() {
            this.style.border = "rgba(0, 176, 255, 0.67) 3px solid ";
        })
    });

    priceBox.forEach(function(box){
        box.addEventListener("mouseout", function() {
            this.style.border = "#c0c0c0 1px solid"
        })
    });


    //listy drop-down

    var selects = document.querySelectorAll(".drop_down_list div");

    selects.forEach(function(select){
        select.addEventListener("click", function() {
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
            this.parentElement.previousElementSibling.firstElementChild.innerText = this.innerText;
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
            this.parentElement.previousElementSibling.firstElementChild.innerText = this.innerText;
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
            this.parentElement.previousElementSibling.firstElementChild.innerText = this.innerText;
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
    });


    //smooth scroll

    //function that returns current y offset of page
    function currentYPosition () {
        //Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) {
            return self.pageYOffset;
        } else {
            return 0;
        }
    }


    function elementYPosition(elementId) {
        var element = document.getElementById(elementId);

        //offsetTop returns the distance of element relative to the top of the offsetParent
        var yPosition = element.offsetTop;

        //offsetParent return the nearest ancestor of element that has position other than static (if there's not such
        //element returns document.body).
        var node = element;

        while (node.offsetParent && node.offsetParent !== document.body) {
            node = node.offsetParent;
            yPosition += node.offsetTop;
        } return yPosition;

    }

    function smoothScroll(elementId) {
        var startY = currentYPosition();
        var stopY = elementYPosition(elementId);
        var distance = stopY > startY ? stopY - startY : startY - stopY;

        //if there's a short distance, just scroll down (no smooth scroll)
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }

        var speed = Math.round(distance / 50);
        if (speed >= 20) speed = 20;

        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;

        if (stopY > startY) {
            //as long as startY is lower than stopY set timeout, add step to leapY(current position between startY and stopY) and increment timer
            for (var i = startY; i < stopY; i+=step) {
                const currentLeapY = leapY; //I have to declare const, var is a global variable and loop ends faster than first timeout

                //if I would make window.scrollTo(0, leapY), the loop finish faster than first timeout (timeout waits for callback function
                //window.scrollTo(0, leapY) and in that time loop ends with leapY = stopY (there's no smooth scroll). window.scrollTo(0, leapY)
                //would be call only once with leapY = stopY
                setTimeout(function() {
                    window.scrollTo(0, currentLeapY);
                },timer * speed);

                leapY += step;

                if (leapY > stopY) {
                    leapY = stopY;
                }

                timer++;

            } return;
        }

        //in case when startY is greater than stopY:
        for (var j = startY; j > stopY; j-=step) {
            const currentLeapY = leapY;

            setTimeout(function() {
                window.scrollTo(0, currentLeapY);
            },timer * speed);

            leapY -= step;

            if (leapY < stopY) {
                leapY = stopY;
            }

            timer++;
        }
    }


    var galleryLink = document.getElementById('galleryLink');
    galleryLink.addEventListener("click", function() {
        smoothScroll('gallery');
    });

    var contactLink = document.getElementById('contactLink');
    contactLink.addEventListener("click", function() {
        smoothScroll('contact');
    })

});
