$(document).ready(() => {
    let pos = $('.canvas').offset();
    let canvas_width = $('.canvas').width();
    let canvas_height = $('.canvas').height();


    $('#add-square').click(() => {
        let square_length = $('#Square_length').val();
        if (square_length !== ""){
            new Square(pos.left, pos.top, canvas_width, canvas_height, square_length)
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
        this.spawn_div();
    }

    bound_definition() {
        this.x_start = this.x_coor + margin_left;
        this.y_start = this.y_coor;
        this.max_bound_x = this.x_start + this.max_width;
        this.max_bound_y = this.max_height + this.y_start;

        return this.bound_array = {
            x_start: this.x_start,
            y_start: this.y_start,
            max_bound_x: this.max_bound_x,
            max_bound_y: this.max_bound_y,
        }
    }

    spawn_div(width, height, bg_color) {
        this.object_width = width;
        this.object_height = height;
        let xVal = randVal(this.max_bound_x, this.x_start);
        let yVal = randVal(this.max_bound_y, this.y_start);
        let css_array = {
            'position': 'absolute',
            'top': yVal,
            'left': xVal,
            'width': this.object_width,
            'height': this.object_height,
            'background-color': bg_color,
        }
        this.div = $('<div></div>')
        $('body').append(this.div);
        $(this.div).css(css_array);
    };

    check_bound(){
        

    }
}

class Circle extends Shape {
    constructor(x_coor, y_coor, max_width, max_height, radius) {
        super(x_coor, y_coor, max_width, max_height)
        this.radius = radius;
    };

}

class Triangle extends Shape {
    constructor(x_coor, y_coor, max_width, max_height, height) {
        super(x_coor, y_coor, max_width, max_height)
        this.height = height;
    };
}

class Rectangle extends Shape {
    constructor(x_coor, y_coor, max_width, max_height, width, height) {
        super(x_coor, y_coor, max_width, max_height)
        this.width = width;
        this.height = height;
    };
}

class Square extends Shape {
    constructor(x_coor, y_coor, max_width, max_height, side_length) {
        super(x_coor, y_coor, max_width, max_height)
        this.side_length = side_length;
        this.addSquare();

    }

    addSquare() {
        let array = this.bound_definition();
        this.spawn_div(this.side_length, this.side_length, 'blue');
        this.check_bound()
    }
}

