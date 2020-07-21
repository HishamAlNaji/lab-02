'use strict'

var animals = [];
var keywordsArr = [];

// getting the data from json files :

function pageOne() {
    $.get('data/page-1.json').then(data => {
        data.forEach(animal => {
            let newAnimal = new Animal(animal.image_url, animal.title, animal.description, animal.keyword, animal.horns)
            newAnimal.render();
            newAnimal.options();

        });
    });
}

function pageTwo() {
    $.get('data/page-2.json').then(data => {
        data.forEach(animal => {
            let newAnimal = new Animal(animal.image_url, animal.title, animal.description, animal.keyword, animal.horns)
            newAnimal.render();
            newAnimal.options();
        });

    });
}

// animal objects constructor :

function Animal(img, title, description, keyword, horns) {
    this.image_url = img;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    animals.push(this);
}

pageOne();

// event for page one :

$('#page1').on('click', function() {
    $('.page').remove();
    animals = [];
    pageOne();
})

$('#page2').on('click', function() {
    $('.page').remove();
    animals = [];
    pageTwo();
})

renderSelected();
renderSorted()

// Render the photos for animals 

Animal.prototype.render = function() {
    // let photoTemplate = $('#photo-template');
    // photoTemplate = $('#photo-template').clone();
    // photoTemplate.removeAttr('id');
    // photoTemplate.attr('class', this.keyword);
    // photoTemplate.addClass('page');
    // photoTemplate.find('h2').text(this.title);
    // photoTemplate.find('img').attr('src', this.image_url);
    // photoTemplate.find('p').text(this.description);
    // $('main').append(photoTemplate);
    let mustacheTemplate = $('#mustache-template').html();
    let htmlPage = Mustache.render(mustacheTemplate, this);
    $('main').append(htmlPage);
    $('section').addClass('page');

    // console.log(this);
}

Animal.prototype.options = function() {
    if (keywordsArr.includes(this.keyword) === false) {
        $('#filter').append(`<option>${this.keyword}</option>`);
        keywordsArr.push(this.keyword);
    }
};

function renderSelected() {
    $('#filter').change(function() {
        $('.page').remove();
        for (let i = 0; i < animals.length; i++) {
            if (animals[i].keyword === $(this).val()) {
                animals[i].render();
            }
        }
    });
};

function renderSorted() {
    $('#sort').change(function() {

        $('.page').remove();

        if ('title' === $(this).val()) {
            animals.sort((a, b) => {
                return a.title.localeCompare(b.title)
            });
            for (let i = 0; i < animals.length; i++) {
                animals[i].render();
            }
        } else if ('horns' === $(this).val()) {
            animals.sort((a, b) => {
                return a.horns - b.horns
            });
            for (let i = 0; i < animals.length; i++) {
                animals[i].render();
            }
        }

    });
}