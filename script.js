$(document).ready(() => {
    let pos = $('.canvas').offset();
    let canvas_width = $('.canvas').width();
    let canvas_height = $('.canvas').height();


    $('#add-square').click(() => {
        let square_length = $('#Square_length').val();
        if (square_length !== "") {
            new Square(pos.left, pos.top, canvas_width, canvas_height, square_length)
        }
    })

    $('#add-circle').click(() => {
        let circle_radius = $('#Circle_radius').val();
        if (circle_radius !== ""){
            new Circle(pos.left, pos.top, canvas_width, canvas_height, circle_radius)
        }
    })

    $('#add-rectangle').click(() => {
        let rectangle_height = $('#Rectangle_height').val();
        let rectangle_width = $('#Rectangle_width').val();
        if (rectangle_height !== "" && rectangle_width !== ""){

            new Rectangle(pos.left, pos.top, canvas_width, canvas_height, rectangle_width, rectangle_height);
        }
    })
})

const margin_left = 64;
let randVal = (Max, Min) => Math.floor(Math.random() * (Max - Min)) + Min;

class Shape {
    constructor(x_coor, y_coor, max_width, max_height) {
        this.x_coor = x_coor;
        this.y_coor = y_coor;
        this.max_width = max_width;
        this.max_height = max_height;
        this.bound_definition();
    }

    bound_definition() {
        this.x_start = this.x_coor + margin_left;
        this.y_start = this.y_coor;
        this.max_bound_x = this.x_start + this.max_width;
        this.max_bound_y = this.max_height + this.y_start;
    }

    spawn_div(width, height) {
        this.object_width = parseInt(width, 10);
        this.object_height = parseInt(height, 10);
        if (this.object_width > this.max_bound_x || this.object_height > this.max_bound_y) {
            alert('Object size too big')
        } else {
            this.xVal = randVal(this.max_bound_x, this.x_start);
            this.yVal = randVal(this.max_bound_y, this.y_start);
            let css_array = {
                'position': 'absolute',
                'top': this.yVal,
                'left': this.xVal,
                'width': this.object_width,
                'height': this.object_height,
            }
            this.div = $('<div></div>')
            $('body').append(this.div);
            $(this.div).css(css_array);
        }
    };

    check_bound() {
        if ((this.xVal + this.object_width) >= this.max_bound_x) {
            console.log('horizontal overlap')
            let difference_x = (this.xVal + this.object_width) - this.max_bound_x;
            $(this.div).css('left', (this.xVal - difference_x));
        }
        if ((this.yVal + this.object_height) >= this.max_bound_y) {
            console.log('vertical overlap');
            let difference_y = (this.yVal + this.object_height) - this.max_bound_y;
            $(this.div).css('top', (this.yVal - difference_y));
        }
    }
}

class Circle extends Shape {
    constructor(x_coor, y_coor, max_width, max_height, radius) {
        super(x_coor, y_coor, max_width, max_height)
        this.radius = radius;
        this.addCircle();
    };

    addCircle(){
        this.spawn_div(this.radius, this.radius);
        $(this.div).addClass('Circle-shape')
        this.check_bound();
    }
}

class Triangle extends Shape {
    constructor(x_coor, y_coor, max_width, max_height, height) {
        super(x_coor, y_coor, max_width, max_height)
        this.height = height;
        this.addTriangle();
    };

    addTriangle(){

    }
    
}

class Rectangle extends Shape {
    constructor(x_coor, y_coor, max_width, max_height, width, height) {
        super(x_coor, y_coor, max_width, max_height)
        this.width = width;
        this.height = height;
        this.addRectangle();
    };

    addRectangle(){
        this.spawn_div(this.width, this.height);
        $(this.div).addClass('Rectangle-shape')
        this.check_bound()
    }    
}

class Square extends Shape {
    constructor(x_coor, y_coor, max_width, max_height, side_length) {
        super(x_coor, y_coor, max_width, max_height)
        this.side_length = side_length;
        this.addSquare();

    }

    addSquare() {
        this.spawn_div(this.side_length, this.side_length);
        $(this.div).addClass('Square-shape');
        this.check_bound();
    }
}

